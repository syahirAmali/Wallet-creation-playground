import ethers from "ethers";
import axios from "axios";
import BigNumberjs from "bignumber.js";
import bip39 from "bip39";
import { BIP32Factory } from "bip32";
import * as ecc from 'tiny-secp256k1';

import bitcoin from "bitcoinjs-lib";

async function main() {
  const DOGECOIN = {
    messagePrefix: '\x19Dogecoin Signed Message:\n',
    bip32: {
      public: 0x02facafd,
      private: 0x02fac398
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x16,
    wif: 0x9e
  }

  const derivationPath = "m/44'/3'/0'/0";
  const bip32 = BIP32Factory(ecc);

  let mnemonic = bip39.generateMnemonic(256)
  const seed = bip39.mnemonicToSeedSync(mnemonic)
  let root = bip32.fromSeed(seed, DOGECOIN)

  let account = root.derivePath(derivationPath)
  let node = account.derive(0).derive(0)
  let node2 = account.derive(0).derive(1)

  let dogeAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: DOGECOIN
  }).address

  console.log('Wallet Generated:')
  console.log('-Address: ', dogeAddress)
  console.log('-Key: ', node.toWIF())
  console.log('-Mnemonic: ', mnemonic)

  let dogeAddress2 = bitcoin.payments.p2pkh({
    pubkey: node2.publicKey,
    network: DOGECOIN
  }).address

  console.log('Wallet Generated:')
  console.log('-Address: ', dogeAddress2)
  console.log('-Key: ', node2.toWIF())
  console.log('-Mnemonic: ', mnemonic)

  console.log(node)
  console.log(node2)
}

main();
