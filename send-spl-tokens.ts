import "dotenv/config";

import {
    Connection,
    PublicKey,
    clusterApiUrl,
} from "@solana/web3.js";

import {
    getExplorerLink,
    getKeypairFromEnvironment
} from "@solana-developers/helpers";

import {
    getOrCreateAssociatedTokenAccount,
    transfer,
} from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"));

const sender = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    `🔑 Loaded our keypairs securely, using env file! Our Public key is: ${sender.publicKey.toBase58()}`
);

const recipient = new PublicKey("EcBd1Ryq6oVYvAnaSB9FnXjsVhmf6R3bCT2ZpNmmgEWn");

const tokenMintAccount = new PublicKey("GCBoPJ6MhKtfzYDUNmHPNNDAHSDHkxy1s1YM2c1bsUtn");

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

console.log(
    `💸 Attempting to send 1 token to ${recipient.toBase58()}...`
);

const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    sender.publicKey
)

const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    recipient
)

const signature = await transfer(
    connection,
    sender,
    sourceTokenAccount.address,
    destinationTokenAccount.address,
    sender,
    1 * MINOR_UNITS_PER_MAJOR_UNITS
);

const explorerLink = getExplorerLink(
    "transaction",
    signature,
    "devnet"
);

console.log(
    `✅ Success!! 1 Token sent, Explorer link: ${explorerLink}!`
);