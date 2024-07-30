# Rust based Solana program thing

1. Users can bet for an event outcome using SPL Token
2. The winner pool users gets 90% of the tokens shared as the reward distribution
3. Platform gets 7% as the service fee
4. 3% of the tokens will be burnt permanently

## Progress?

- User participation
- sending sol and participating (90% transfer to reward pool, rest 10% is for later)
  - Storing data like, which user bet for what choice with how much amount
- basic winner declaration
  - admin (authority not set yet tho) passes the winning_choice and the public keys are collected for the ones with the winning_choice
  - winner rewards distribution needs to be done from the rewards pool but not done
  - will be done from the CPI and token

## Next? || ongoing?

- Setup basic CPI to read and write to the program
  - need to do cpi like, prediction program -> tokenthing
- Token program
- Call the token program thing funcs from the pred shit
  - transfer
  - burn

## skipped / lagging something??

- Multiple events are not there
- Current event can not be modified yet
- No authority anywhaere whatsoever
