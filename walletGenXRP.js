
import bip39 from "bip39";

import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';

import xrpl from 'xrpl';

async function main() {
  const derivationPath = "m/44'/501'/0'/0'";
  const derivationPath2 = "m/44'/501'/0'/";
  
  const plusIndex = 1;
  const pathIndexed = derivationPath2 + plusIndex.toString() + "'"
  console.log("path indexed", pathIndexed)

  let mnemonic = bip39.generateMnemonic(256)
  const seed = await bip39.mnemonicToSeed(mnemonic)

  const derivedPathSeed = derivePath(derivationPath, seed)
  const derivedPathSeed2 = derivePath(pathIndexed, seed)

  const test_wallet = xrpl.Wallet.generate()
  console.log(test_wallet)
  
}

main();
