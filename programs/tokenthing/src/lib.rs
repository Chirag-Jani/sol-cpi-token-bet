use anchor_lang::prelude::*;

declare_id!("FY4qYkgfd3VHnfH1g5kDwPTHf8UVG7AUthnGRbEW4HvK");

#[program]
pub mod tokenthing {
    use super::*;

    pub fn init(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn call_token_thing(ctx: Context<CallShi>) -> Result<()> {
        let context = &mut ctx.accounts.data;
        // context.who_called = ctx.accounts.signer.key();
        context.who_called = "me".to_string();
        Ok(())
    }
}

#[account]
pub struct Data {
    who_called: String,
}

#[derive(Accounts)]
pub struct CallShi<'info> {
    #[account(mut)]
    data: Account<'info, Data>,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init_if_needed, payer = signer, seeds = [b"init"], bump, space = 32)]
    data: Account<'info, Data>,
    #[account(mut)]
    signer: Signer<'info>,
    system_program: Program<'info, System>,
}
