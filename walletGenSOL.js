
import bip39 from "bip39";

import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';

async function main() {
  const derivationPath = "m/44'/501'/0'/0'";
  const derivationPath2 = "m/44'/501'/0'/";
  
  const plusIndex = 1;
  const pathIndexed = derivationPath2 + plusIndex.toString() + "'"
  console.log("path indexed", pathIndexed)

  let mnemonic = bip39.generateMnemonic(256)
  const seed = await bip39.mnemonicToSeed(mnemonic)
  // const seedHex = Buffer.from(seed).toString('hex')
  // console.log("seed hex", seedHex)

  const derivedPathSeed = derivePath(derivationPath, seed)
  const derivedPathSeed2 = derivePath(pathIndexed, seed)

  // console.log(derivedPathSeed)
  // console.log(derivedPathSeed.key)

  const account = Keypair.fromSeed(derivedPathSeed.key)
  const account2 = Keypair.fromSeed(derivedPathSeed2.key)

  // console.log(account)
  console.log(account.secretKey)
  console.log(account.publicKey.toString())

  console.log(account2.secretKey)
  console.log(account2.publicKey.toString())
}

main();
