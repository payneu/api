# payneu-api

Central orchestration layer managing payment flows, database operations, and smart contract interactions.

Stores invoice details (token type, amounts, status) and manages merchant custodial wallet information.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- Access to Base Sepolia testnet

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd payneu-api
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Configure your `.env` file with:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `RPC_URL`: Base Sepolia RPC endpoint (default: https://sepolia.base.org)
   - `PAYMENT_CONTRACT`: Deployed payment contract address
   - `SETTLEMENT_CONTRACT`: Deployed settlement contract address
   - `CLOB_API`: Central Limit Order Book API endpoint
   - Wallet credentials for admin and LP operations
   - Token addresses for testing

5. Run database migrations
```bash
npx prisma migrate dev
```

6. Start the development server
```bash
npm run start:dev
```

## Tokens (For Testing)

1. mUSD: `0x35435120c2cf51f7f122f2b37bda3bbc686831de`
2. Bazed Token: `0x8ec7d893f57b6a7c837bc93cfb4c01b80f58ba6b`

## Assets for Demonstration

- **mUSD** - Mock USD (stable coin representation)
- **BAZED** - An ERC-20 token that is tradeable to stable coin
- **NEU** - Platform token that is meant to be distributed as rewards

## Process Flow

1. **Merchant**: Creates an invoice (amount, stableCoin)
2. **AutoPay**: When enabled, checks if payer's wallet contains enough assets to be converted to the stable coin that merchant wants to receive
3. **Settlement**: Processes payment and updates invoice status
4. **Notification**: Confirms transaction completion to all parties

## API Documentation

Once the server is running, access the Swagger API documentation at:
```
http://localhost:3000/doc
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `CLOB_API` | Central Limit Order Book API endpoint |
| `PAYMENT_CONTRACT` | Payment smart contract address |
| `SETTLEMENT_CONTRACT` | Settlement smart contract address |
| `RPC_URL` | Base Sepolia RPC endpoint |
| `PUBKEY_ADMIN` | Admin wallet public key |
| `WALLET_ADMIN` | Admin wallet private key |
| `WALLET_PAYER` | Payer wallet private key |
| `PUBKEY_BAZED_LP` | Bazed LP wallet public key |
| `WALLET_BAZED_LP` | Bazed LP wallet private key |
| `TOKEN_BAZED` | Bazed token contract address |
| `TOKEN_MUSD` | mUSD token contract address |

## Contributing

Built by [@sleepbuildrun](https://x.com/sleepbuildrun)

## License

Copyright 2025 PayNeu. All rights reserved.
