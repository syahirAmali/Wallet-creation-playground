import ethers from "ethers";
import axios from "axios";
import BigNumberjs from "bignumber.js";
import bip39 from "bip39";
import { BIP32Factory } from "bip32";
import * as ecc from 'tiny-secp256k1';

import bitcoin from "bitcoinjs-lib";

async function main() {
  const derivationPath = "m/44'/0'/0'/0"; // "m/44'/1'/0'/0" for testnet
  const network = bitcoin.networks.bitcoin
  const bip32 = BIP32Factory(ecc);

  let mnemonic = bip39.generateMnemonic(256)
  const seed = bip39.mnemonicToSeedSync(mnemonic)
  let root = bip32.fromSeed(seed, network)

  let account = root.derivePath(derivationPath)
  let node = account.derive(0).derive(0)
  let node2 = account.derive(0).derive(1)

  let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
  }).address

  console.log('Wallet Generated:')
  console.log('-Address: ', btcAddress)
  console.log('-Key: ', node.toWIF())
  console.log('-Mnemonic: ', mnemonic)

  let btcAddress2 = bitcoin.payments.p2pkh({
    pubkey: node2.publicKey,
    network: network
  }).address

  console.log('Wallet Generated:')
  console.log('-Address: ', btcAddress2)
  console.log('-Key: ', node2.toWIF())
  console.log('-Mnemonic: ', mnemonic)

  console.log(node)
  console.log(node2)
}

main();
