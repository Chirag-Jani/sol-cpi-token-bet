import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Simplepred } from "../target/types/simplepred";
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BN } from "bn.js";

describe("rustshi", () => {
  let mainKeypair = Keypair.fromSecretKey(
    Uint8Array.from([
      89, 1, 22, 16, 149, 59, 188, 100, 11, 12, 45, 242, 103, 142, 82, 106, 222,
      118, 127, 82, 255, 78, 146, 0, 77, 219, 37, 143, 211, 202, 56, 70, 172,
      33, 216, 39, 98, 141, 91, 234, 140, 31, 184, 193, 50, 148, 0, 198, 180,
      27, 45, 36, 18, 67, 114, 169, 76, 116, 113, 123, 176, 126, 111, 232,
    ])
  );
  const mainWallet = new anchor.Wallet(mainKeypair);

  const connection = new Connection("http://localhost:8899", {
    commitment: "confirmed",
  });

  const provider = new anchor.AnchorProvider(connection, mainWallet, {
    commitment: "confirmed",
  });

  anchor.setProvider(provider);

  const program = anchor.workspace.Simplepred as Program<Simplepred>;

  const [globalSeed] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("jua")],
    program.programId
  );
  const [finalSeed] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("juari")],
    program.programId
  );
  const [rewardPool] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("khatu")],
    program.programId
  );

  it("is doing sol thing", async () => {
    // ignore -- new wallet generation shit
    let newKeypair2 = anchor.web3.Keypair.generate();
    // let newW = new anchor.Wallet(newKeypair2);
    await connection.confirmTransaction(
      await connection.requestAirdrop(
        newKeypair2.publicKey,
        100 * LAMPORTS_PER_SOL
      ),
      "confirmed"
    );

    // start from here -- new wallet generation shit
    let tx = await program.methods
      .partBet(new BN(4), { kamala: [true] })
      .accounts({
        globalState: globalSeed,
        rewardPool: rewardPool,
        signer: newKeypair2.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([newKeypair2])
      .rpc();

    console.log("User Registration Successful: ", tx);

    let globalState = await program.account.globalState.fetch(globalSeed);
    console.log("Global State is: ", globalState);
  });

  it("is getting winner shit", async () => {
    // ignore -- new wallet generation shit
    let newKp = anchor.web3.Keypair.generate();
    // let newW = new anchor.Wallet(newKeypair2);
    await connection.confirmTransaction(
      await connection.requestAirdrop(newKp.publicKey, 100 * LAMPORTS_PER_SOL),
      "confirmed"
    );
    await program.methods
      .declareResult({ modiji: [true] })
      .accounts({
        finalState: finalSeed,
        globalState: globalSeed,
        signer: newKp.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([newKp])
      .rpc();

    let finalState = await program.account.finalState.fetch(finalSeed);
    console.log("Final State is: ", finalState);
  });
});
