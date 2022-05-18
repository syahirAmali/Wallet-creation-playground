import ethers from "ethers";
import axios from "axios";
import BigNumberjs from "bignumber.js";
import bip39 from "bip39";
import { BIP32Factory } from "bip32";
import * as ecc from 'tiny-secp256k1';

import bitcoin from "bitcoinjs-lib";

async function main() {
  const LITECOIN = {
    messagePrefix: '\x19Litecoin Signed Message:\n',
    bech32: 'ltc',
    bip32: {
      public: 0x019da462,
      private: 0x019d9cfe,
    },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0,
  };

  const derivationPath = "m/49'/2'/0'/0";
  // const network = bitcoin.networks.litecoin
  const bip32 = BIP32Factory(ecc);

  let mnemonic = bip39.generateMnemonic(256)
  const seed = bip39.mnemonicToSeedSync(mnemonic)
  let root = bip32.fromSeed(seed, LITECOIN)

  let account = root.derivePath(derivationPath)
  let node = account.derive(0).derive(0)
  let node2 = account.derive(0).derive(1)

  let ltcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: LITECOIN
  }).address

  console.log('Wallet Generated:')
  console.log('-Address: ', ltcAddress)
  console.log('-Key: ', node.toWIF())
  console.log('-Mnemonic: ', mnemonic)

  let ltcAddress2 = bitcoin.payments.p2pkh({
    pubkey: node2.publicKey,
    network: LITECOIN
  }).address

  console.log('Wallet Generated:')
  console.log('-Address: ', ltcAddress2)
  console.log('-Key: ', node2.toWIF())
  console.log('-Mnemonic: ', mnemonic)

  console.log(node)
  console.log(node2)
}

main();
