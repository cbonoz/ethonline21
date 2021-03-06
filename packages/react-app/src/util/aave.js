import { TxBuilderV2, Network, Market } from "@aave/protocol-js";
import { ethers } from "ethers";
import { c, getAssetAddress, getPoolAddress } from ".";
import { TARGET_NETWORK } from "../constants";

const defaultRpcUrl = TARGET_NETWORK.rpcUrl;

// https://github.com/aave/aave-js#deposit
export const depositAmount = async (
  userSigner,
  injectedProvider,
  user, // string,
  reserve, // string,
  amountEth, // string,
  onBehalfOf, // ? string,
  referralCode, // ? string,
) => {
  // const httpProvider = new ethers.providers.getDefaultProvider(process.env.ETHEREUM_URL || defaultRpcUrl);
  const txBuilder = new TxBuilderV2(Network.kovan, injectedProvider);

  const lendingPool = txBuilder.getLendingPool(Market.AMM); // get all lending pool methods
  const amount = ethers.utils.parseEther(amountEth).toString();
  const depositObj = {
    user, // string,
    reserve, // string,
    amount, // string,
    onBehalfOf: onBehalfOf || user, // ? string,
    referralCode, // ? string,
  };
  console.log("depositObj", depositObj, injectedProvider);
  // Returns promise
  const result = await lendingPool.deposit(depositObj);
  let results = [];
  for (let i in result) {
    let res;
    try {
      res = await userSigner.sendTransaction(await result[i].tx());
    } catch (e) {
      console.error("error res", e);
      res = e;
    }
    results.push(res);
  }
  return results;
};
/*
https://thegraph.com/hosted-service/subgraph/aave/protocol-multy-raw?query=Example%20query
{
  reserves(first: 10) {
    name
    id
  }
}
*/
// TODO: convert to live API call.
export const AAVE_DATA = {
  data: {
    reserves: [
      {
        id: "0x76b06a2f6df6f0514e7bec52a9afb3f603b477cd0x24a42fd28c976a61df5d00d0599c34c4f90748c8",
        name: "Reflexer RAI",
      },
      {
        id: "0x0000000000085d4780b73119b644ae5ecd22b3760x24a42fd28c976a61df5d00d0599c34c4f90748c8",
        name: "TrueUSD",
      },
      {
        id: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f9840x24a42fd28c976a61df5d00d0599c34c4f90748c8",
        name: "Uniswap",
      },
      {
        id: "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e0x24a42fd28c976a61df5d00d0599c34c4f90748c8",
        name: "yearn.finance",
      },
      {
        id: "0x0f5d2fb29fb7d3cfee444a200298f468908cc9420x24a42fd28c976a61df5d00d0599c34c4f90748c8",
        name: "Decentraland MANA",
      },
      {
        id: "0x1985365e9f78359a9b6ad760e32412f4a445e8620x24a42fd28c976a61df5d00d0599c34c4f90748c8",
        name: "Reputation",
      },
      {
        id: "0x0d8775f648430679a709e98d2b0cb6250d2887ef0x24a42fd28c976a61df5d00d0599c34c4f90748c8",
        name: "Basic Attention Token",
      },
      {
        id: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c5990x24a42fd28c976a61df5d00d0599c34c4f90748c8",
        name: "Wrapped BTC",
      },
      {
        id: "0x2a1530c4c41db0b0b2bb646cb5eb1a67b71586670x7fd53085b9a29d236235d6fc593b47c9c33429f1",
        name: "Uniswap V1",
      },
      {
        id: "0x2c4bd064b998838076fa341a83d007fc2fa509570x7fd53085b9a29d236235d6fc593b47c9c33429f1",
        name: "Uniswap V1",
      },
      {
        id: "0x408e41876cccdc0f92210600ef50372656052a380x24a42fd28c976a61df5d00d0599c34c4f90748c8",
        name: "Republic Token",
      },
    ],
  },
};

export const COLUMNS = [
  c("Address", "id", {
    render: (t, r, i) => getAssetAddress(r.id),
  }),
  c("Name", "name"),
];
