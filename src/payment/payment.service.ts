import 'dotenv/config';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InvoiceService } from 'src/invoice/invoice.service';
import { readErc20Balance } from 'src/utils/erc20/erc20';
import { publicClient } from 'src/utils/rpc-client/public-client';
import { payneuPaymentABI } from 'src/utils/payneu-payment/payneu-payment-abi';
import { walletClient } from 'src/utils/rpc-client/wallet-client';
import { parseEther } from 'viem';

const { PAYMENT_CONTRACT, WALLET_ADMIN, PUBKEY_ADMIN, TOKEN_BAZED, CLOB_API } =
  process.env;

const safeJSONStringify = (value: any): string => {
  const bigIntReplacer = (_key: string, val: any) => {
    if (typeof val === 'bigint') {
      return val.toString();
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return val;
  };

  return JSON.stringify(value, bigIntReplacer);
};

@Injectable()
export class PaymentService {
  constructor(private readonly invoiceService: InvoiceService) {}

  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  async checkPayerStatus(address: string, invoiceId: number) {
    // load invoice data
    const invoiceData = await this.invoiceService.findOne(+invoiceId);

    // check if payer's wallet has enough balance for the token required
    if (invoiceData) {
      const invoiceTokenBalance = await readErc20Balance(
        invoiceData?.token.address as `0x${string}`,
        address as `0x${string}`,
      );

      const bazedTokenBalance = await readErc20Balance(
        TOKEN_BAZED as `0x${string}`,
        address as `0x${string}`,
      );

      // simulate marketprice of BAZED-mUSD
      const toTradeAmount = invoiceData.amount / 0.1;

      const retVal = {
        invoice: {
          status: invoiceData.status,
          details: invoiceData.details,
          amount: invoiceData.amount,
          token: invoiceData.token,
          payableTo: invoiceData.merchant.name,
          payableToAddress: invoiceData.merchant.Wallet?.publicKey,
        },
        ui: {
          status: invoiceData.status,
          message: `${invoiceData.merchant.name} is requesting a payment of ${invoiceData.amount} ${invoiceData.token.name}`,
          options: {
            invoiceToken:
              invoiceTokenBalance >= parseEther(`${invoiceData.amount}`),
            tokenOptions: {
              bazed: bazedTokenBalance >= parseEther(`${toTradeAmount}`),
            },
          },
        },
        payerBalance: {
          invoiceToken: invoiceTokenBalance.toString(),
          tokenOptions: {
            bazed: bazedTokenBalance.toString(),
          },
        },
      };
      return retVal;
    }
  }

  async sendInvoicePayment(payer: `0x${string}`, invoiceId: number) {
    const invoiceData = await this.invoiceService.findOne(+invoiceId);
    if (!invoiceData) throw new BadRequestException('Invoice id not found');

    if (invoiceData.status === 'paid')
      throw new BadRequestException('Invoice already paid');
    const paymentHash = await this.resolveInvoicePayment(payer, invoiceId);
    return { hash: paymentHash };
  }

  async resolveInvoicePayment(payer: `0x${string}`, invoiceId: number) {
    // load invoice data
    const invoiceData = await this.invoiceService.findOne(+invoiceId);
    if (!invoiceData) throw new BadRequestException('Invoice id not found');

    const paymentToken = invoiceData?.token.address;
    const toWallet = invoiceData?.merchant.Wallet?.publicKey;

    const pubClient = publicClient('https://sepolia.base.org');

    const args = [
      payer,
      toWallet,
      parseEther(`${invoiceData?.amount}`),
      paymentToken,
    ];
    const adminSigner = walletClient(
      'https://sepolia.base.org',
      WALLET_ADMIN as `0x${string}`,
    );
    const { result, request } = await pubClient.simulateContract({
      address: PAYMENT_CONTRACT as `0x${string}`,
      abi: payneuPaymentABI,
      functionName: 'transferToken',
      args,
      account: adminSigner.account,
    });

    console.log('result', result);

    const hash = await adminSigner.writeContract(request);
    await pubClient.waitForTransactionReceipt({
      hash: hash,
      confirmations: 2,
    });
    await this.invoiceService.updateStatus(invoiceData.id, 'paid', hash);

    return hash;
  }

  async transferTokens(
    payer: `0x${string}`,
    destination: `0x${string}`,
    amount: bigint,
    tokenAddress: string,
    confirmations: number = 1,
  ) {
    const pubClient = publicClient('https://sepolia.base.org');

    const args = [payer, destination, parseEther(`${amount}`), tokenAddress];
    const adminSigner = walletClient(
      'https://sepolia.base.org',
      WALLET_ADMIN as `0x${string}`,
    );
    const { result, request } = await pubClient.simulateContract({
      address: PAYMENT_CONTRACT as `0x${string}`,
      abi: payneuPaymentABI,
      functionName: 'transferToken',
      args,
      account: adminSigner.account,
    });

    console.log('result', result);

    const hash = await adminSigner.writeContract(request);
    await pubClient.waitForTransactionReceipt({
      hash: hash,
      confirmations,
    });
    return hash;
  }

  async convertThenSendStable(
    payer: `0x${string}`,
    invoiceId: number,
    assetTokenAddress: `0x${string}`,
  ) {
    // submit order to CLOB,
    const invoiceData = await this.invoiceService.findOne(+invoiceId);
    if (!invoiceData) throw new BadRequestException('Invoice id not found');

    if (invoiceData.status === 'paid')
      throw new BadRequestException('Invoice already paid');

    const pubClient = publicClient('https://sepolia.base.org');

    // transfer the tradeable asset to admin wallet
    const toTradeAmount = invoiceData.amount / 0.1;
    await this.transferTokens(
      payer,
      PUBKEY_ADMIN as `0x${string}`,
      BigInt(toTradeAmount),
      assetTokenAddress,
      2,
    );

    // perform the trade via orderbook
    let stringifiedParams;
    const payload = {
      orderId:
        'baze-musd:0x9c164C850922eF95D6D7EA146c1c58e6BF4340c6:sell:1000000000000000000:@100000000000000000:1761206209579',
      userAddress: PUBKEY_ADMIN,
      pairId: 'baze-musd',
      quantity: 'XXX',
      price: 'YYY',
      signature: '0x1234',
      type: 'sell',
    };
    stringifiedParams = safeJSONStringify(payload);
    stringifiedParams = stringifiedParams.replace(
      '"XXX"',
      parseEther(`${toTradeAmount}`),
    );
    stringifiedParams = stringifiedParams.replace('"YYY"', 100000000000000000);

    const response = await fetch(`${CLOB_API}/order/baze-musd`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: stringifiedParams as string,
    });
    const responseData = await response.json();

    // console.log('responseData', responseData);
    // wait for confirmations
    await pubClient.waitForTransactionReceipt({
      hash: responseData.txHash,
      confirmations: 2,
    });
    // console.log('trade tradeTx', tradeTx);

    // finally perform the payment to resolve invoice
    const paymentHash = await this.resolveInvoicePayment(
      PUBKEY_ADMIN as `0x${string}`,
      invoiceId,
    );
    return { hash: paymentHash };
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
