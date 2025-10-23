# payneu-api

## Tokens (For testing)
1: mUSD: 0x35435120c2cf51f7f122f2b37bda3bbc686831de
2: Bazed Token: 0x8ec7d893f57b6a7c837bc93cfb4c01b80f58ba6b

## Assets for demonstration
mUSD  - Mock USD (stable coin representation)
BAZED - An ERC-20 token that is tradeable to stable coin
NEU   - platform token that is meant to be distributed as rewards

## process flow
* Merchant: creates an invoice (amount, stableCoin)
* AutoPay: enabled - check if payers wallet contains enough asset to be converted to stable coin that merchant wants to receive
