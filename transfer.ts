import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,

} from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedToPubKey = process.argv[2] || null;

if (!suppliedToPubKey) {
    console.log(`Please provide a public key to send SOL to`);
    process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPubKey: ${suppliedToPubKey}`);

const toPubkey = new PublicKey(suppliedToPubKey)

// console.log(toPubkey)

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana!!`
)

const transaction = new Transaction();

const LAMPORTS_TO_SEND = 5000;

const sendSOLInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
})

transaction.add(sendSOLInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair
]);

console.log(`💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}.`)

console.log(`Transaction signature is ${signature} !!`)