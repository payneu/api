export const payneuPaymentABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'paymentToken',
        type: 'address',
      },
    ],
    name: 'transferToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
