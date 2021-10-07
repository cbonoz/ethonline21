import { TxBuilderV2, Network, Market } from "@aave/protocol-js";
import { TARGET_NETWORK } from "./constants";

const defaultRpcUrl = TARGET_NETWORK.rpcUrl;

const httpProvider = new Web3.providers.HttpProvider(process.env.ETHEREUM_URL || defaultRpcUrl);
const txBuilder = new TxBuilderV2(Network.kovan, httpProvider);

const lendingPool = txBuilder.getLendingPool(Market.Proto); // get all lending pool methods

// https://github.com/aave/aave-js#deposit
export const depositAmount = ({
  user, // string,
  reserve, // string,
  amount, // string,
  onBehalfOf, // ? string,
  referralCode, // ? string,
}) => {
  return lendingPool.deposit({
    user, // string,
    reserve, // string,
    amount, // string,
    onBehalfOf, // ? string,
    referralCode, // ? string,
  });
};
