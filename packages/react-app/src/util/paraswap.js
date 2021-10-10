import { ethers } from "ethers";
import { ParaSwap, SwapSide } from "paraswap";
import { APP_NAME } from "./constants";
import Moralis from "moralis";
const ETH_TOKEN = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
export const swapToken = async (userSigner, provider, destToken, amountEth, senderAddress) => {
  const srcToken = ETH_TOKEN;
  const srcAmount = ethers.utils.parseEther(amountEth).toString();

  console.log("swap", userSigner, provider, srcToken, destToken, srcAmount, senderAddress);

  const paraSwap = new ParaSwap().setWeb3Provider(provider);

  //   const destToken = "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359";
  //   const srcAmount = "1000000000000000000"; //The source amount multiplied by its decimals

  const receiver = "0x8B4e846c90a2521F0D2733EaCb56760209EAd51A"; // Useful in case of swap and transfer
  const referrer = APP_NAME;

  const ratesOrError = await paraSwap.getRate(srcToken, destToken, srcAmount, senderAddress, SwapSide.SELL, {
    includeDEXS: "Uniswap,UniswapV2,Balancer,Oasis",
  });

  const priceRoute = ratesOrError;
  console.log("priceRoute", priceRoute);
  const destAmount = ethers.BigNumber.from(priceRoute.destAmount).toString();

  const txParams = await paraSwap.buildTx(
    srcToken,
    destToken,
    srcAmount,
    destAmount,
    priceRoute,
    senderAddress,
    referrer,
    receiver,
  );

  const web3 = await Moralis.enable();

  return web3.eth.sendTransaction(txParams);
};
