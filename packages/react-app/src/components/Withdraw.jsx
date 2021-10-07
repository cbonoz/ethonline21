import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

function Withdraw({employee}) {
  const deposit = async () => {};
  return (
    <div>
        <p>Manage a cryptocurrency account for this employee from this page.</p>
        
      <Button onClick={deposit}>Withdraw</Button>
    </div>
  );
}

Withdraw.propTypes = {};

export default Withdraw;
