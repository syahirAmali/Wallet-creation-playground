import ethers from "ethers";
import axios from "axios";
import BigNumberjs from "bignumber.js";
import bip39 from "bip39"

async function main() {
  const mnemonic = bip39.generateMnemonic(256)
  console.log(mnemonic)

  const validated = bip39.validateMnemonic(mnemonic)
  console.log(validated)

  const seed = bip39.mnemonicToSeedSync(mnemonic)
  console.log(seed)

  // const wallet = await ethers.Wallet.fromMnemonic(mnemonic)
  // console.log(wallet)

  // const test = await wallet.privateKey
  // console.log(test)

  // const hdNode = await ethers.utils.HDNode.fromSeed(seed)
  // console.log(hdNode)

  // const hdNode1 = await ethers.utils.HDNode.fromMnemonic(mnemonic)
  // console.log(hdNode1)

  const testNode  = await ethers.utils.HDNode.fromMnemonic(mnemonic, 'test123', null);
  console.log(testNode)

  const paths = await testNode.path
  console.log(paths)

  const testNode2  = await testNode.derivePath("1")
  console.log(testNode2)

  const testNode3  = await testNode.derivePath("2")
  console.log(testNode3)

  // for(let i = 0; i < 100000; i++){
  //   const path = i.toString()
  //   const testNode4  = await testNode.derivePath(path)
  //   console.log("i=", i)
  //   console.log(testNode4)
  // }
}

main();
