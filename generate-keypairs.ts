import { Keypair } from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// const keypair = Keypair.generate();
const keypair = getKeypairFromEnvironment("SECRET_KEY");

// console.log(`The Public Key is: `, keypair.publicKey.toBase58());
// console.log(`The Secret Key is: `, keypair.secretKey);
// console.log(`✅ Finished!`)

console.log(`✅ Finished! We have now loaded our Secret key securely from our env file`)