use anchor_lang::prelude::*;

use tokenthing::accounts::CallShi;
use tokenthing::program::Tokenthing;
use tokenthing::{self, Data};

declare_id!("9PEbvRxVa251jgFsmBf6ioQyWNvRBRqdZbwNPzfC7Zev");

#[program]
pub mod calltokenthing {
    use super::*;

    pub fn initialize(ctx: Context<TokenContext>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct TokenContext<'info> {
    #[account(mut)]
    token: Account<'info, Data>,
    token_program: Program<'info, Tokenthing>,
}
