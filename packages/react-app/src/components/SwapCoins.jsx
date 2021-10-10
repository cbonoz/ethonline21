import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { swapToken } from "../util/paraswap";
import { Button, Input } from "antd";
import { AAVE_DATA } from "../util/aave";
import { getAssetAddress } from "../util";

const TRUE_USD = getAssetAddress(AAVE_DATA.data.reserves[0].id);

function SwapCoins({ reserve, address, userSigner, provider }) {
  const [amount, setAmount] = useState();
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const destTokenId = getAssetAddress(reserve.id);

  const swap = async () => {
    let res;
    try {
      res = await swapToken(userSigner, provider, destTokenId || TRUE_USD, amount, address);
    } catch (e) {
      console.error("err", e);
      res = e.toString();
    }
    console.log("result", res);
    setResult(res);
  };
  return (
    <div>
      <h3>Initiate Swap</h3>
      <p>Swap between Eth and {reserve.name}</p>
      <Input type="number" prefix="Eth" value={amount} onChange={e => setAmount(e.target.value)} />
      <Input prefix={"Dest"} value={reserve.name} disabled />
      <Input prefix={"Dest Address"} value={reserve.id} disabled />
      <br />
      <Button className='action-button' type={"primary"} onClick={swap}>
        Swap
      </Button>
    </div>
  );
}

SwapCoins.propTypes = {};

export default SwapCoins;
