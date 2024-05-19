import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

import "dotenv/config";

import {
    getExplorerLink,
    getKeypairFromEnvironment
} from "@solana-developers/helpers";

import {
    Connection,
    PublicKey,
    clusterApiUrl,
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    `🔑 Loaded our keypairs securely, using env file! Our Public key is: ${user.publicKey.toBase58()}`
);

const tokenMintAccount = new PublicKey("GCBoPJ6MhKtfzYDUNmHPNNDAHSDHkxy1s1YM2c1bsUtn");

const recipient = user.publicKey;

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    recipient
);

console.log(
    `Token Account: ${tokenAccount.address.toBase58()}`
);

const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet"
)

console.log(
    `✅ Created token Account: ${link}`
)