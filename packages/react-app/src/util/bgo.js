import { BITGO_TOKEN } from "../constants";

// TODO: fix import.
// https://github.com/BitGo/BitGoJS/tree/master/modules/core
// const BitGo = require("bitgo");
// const bitgo = new BitGo.BitGo({ accessToken: BITGO_TOKEN });

export const initBitgo = async () => {
  let result;
  // const result = await bitgo.session();
  // console.log("bitgo init", result);
  return result;
};

export const createWallet = async (coin, passphrase, label) => {
  const params = {
    passphrase: passphrase || "testpass",
    label: label || "firstwallet",
  };
  const { wallet } = await bitgo
    .coin(coin || "tbtc")
    .wallets()
    .generateWallet(params);

  console.log("createWallet", wallet);
  return wallet;
};
