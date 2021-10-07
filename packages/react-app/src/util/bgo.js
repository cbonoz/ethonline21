// TODO: fix import.
// https://github.com/BitGo/BitGoJS/tree/master/modules/core
// const BitGo = require("bitgo");
import { BitGo } from "bitgo";
import { BITGO_TOKEN } from "../constants";
import axios from "axios";

const accessToken = "v2x3a2d0853d6223c8b87399c0893ac60b728ccc9c8657894645a06200a2bd6874d" || BITGO_TOKEN;

const bitgo = new BitGo({
  accessToken,
  env: "test",
});

const response = {
  id: "615e6f1566248e0007cf98900b3fca42",
  pub: "xpub661MyMwAqRbcEkaQ6HWCJkVMj4xpNXNkjn5CVBdEtoXi8NH4ri96HNrZqNNQnv681jESpBqaz7Ltu5Uq2b3UPZEb4KaNjJBv7cxnYH4mxUP",
  ethAddress: "0xbbad5f5d1f983caf0e698b67fe4397243553d553",
  source: "user",
  coinSpecific: {},
};

export const initBitgo = async () => {
  let result;
  // result = await bitgo.session();
  console.log("bitgo init", result);
  // const data = await bitgo.coin("tbtc").keychains().create();
  return result;
};

const axiosInstance = axios.create({
  transformRequest: (data, headers) => {
    // Remove all shared headers
    // delete headers.common;
    delete headers.origin;
    delete headers.common.origin;
    // or just the auth header
    delete headers.common.Authorization;
  },
});

export const createWallet = async (coin, passphrase, label) => {
  coin = coin || "tbtc";
  label = label || "test";
  const walletOptions = {
    passphrase: passphrase || "testpass",
    label,
  };

  const data = await bitgo.coin(coin).keychains().create();
  data["label"] = label;
  console.log("data", data, BITGO_TOKEN);

  var config = {
    method: "post",
    url: `https://app.bitgo-test.com/api/v2/${coin}/key`,
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  // const wallet = await axiosInstance(config);
  // TODO: resolve cors
  const wallet = response;

  console.log("createWallet", wallet);
  return wallet;
};
