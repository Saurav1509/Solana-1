import {
    Connection,
    clusterApiUrl,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";

import "dotenv/config";
import {
    getKeypairFromEnvironment,
    getExplorerLink,
} from "@solana-developers/helpers";

import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

import * as anchor from '@project-serum/anchor';

const user = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection(clusterApiUrl("devnet"));

console.log(
    `🔑 Loaded our keypairs securely, using env file! Our Public key is: ${user.publicKey.toBase58()}`
)

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
)

const tokenMintAccount = new PublicKey("GCBoPJ6MhKtfzYDUNmHPNNDAHSDHkxy1s1YM2c1bsUtn");

const metadataData = {
    name: "Saurav Solana Prac Token",
    symbol: "TRAINING",
    uri: "https://arweave.net/oXphU-PymoSB2CO4n33wm8lxLBYC5scgFIhXTRFl1Lg",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
};

const metadataPDAAndBump = PublicKey.findProgramAddressSync(
    [
        Buffer.from(anchor.utils.bytes.utf8.encode("metadata")),
        Buffer.from(TOKEN_METADATA_PROGRAM_ID.toBytes()),
        Buffer.from(tokenMintAccount.toBytes()),
    ],
    TOKEN_METADATA_PROGRAM_ID
);

const metadataPDA = metadataPDAAndBump[0];
console.log('Calculated Metadata PDA:', metadataPDA.toBase58());

const transaction = new Transaction();

const createMetadataAccountInstruction =
    createCreateMetadataAccountV3Instruction(
        {
            metadata: metadataPDA,
            mint: tokenMintAccount,
            mintAuthority: user.publicKey,
            payer: user.publicKey,
            updateAuthority: user.publicKey,
        },
        {
            createMetadataAccountArgsV3: {
                collectionDetails: null,
                data: metadataData,
                isMutable: true,
            },
        }
    );

transaction.add(createMetadataAccountInstruction);

const transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [user]
);

const transactionLink = getExplorerLink(
    "transaction",
    transactionSignature,
    "devnet"
);

console.log(
    `✅ Transaction confirmed, explorer link is: ${transactionLink}!`
);

const tokenMintLink = getExplorerLink(
    "address",
    tokenMintAccount.toString(),
    "devnet"
);

console.log(
    `✅ Look at the Token Mint again here: ${tokenMintLink}!`
);