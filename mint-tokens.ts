import { mintTo } from "@solana/spl-token";
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

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const user = getKeypairFromEnvironment("SECRET_KEY");

const tokenMintAccount = new PublicKey(
    "GCBoPJ6MhKtfzYDUNmHPNNDAHSDHkxy1s1YM2c1bsUtn"
);

const recipientAssociatedTokenAccount = new PublicKey(
    "53Sfp2R38BVs3bkaFfoT6S6Kssgo46cjPpirkCLdZXhE"
);

const transactionSignature = await mintTo(
    connection,
    user,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    user,
    1000 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink(
    "transaction",
    transactionSignature,
    "devnet"
);

console.log(
    `✅ We have Successfully Minted New Saurav Tokens !!! Mint Token Transaction: ${link}`
);