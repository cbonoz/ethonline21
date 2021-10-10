import React from "react";

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getName = employee => {
  return `${employee.first_name} ${employee.last_name}`;
};

// column creation
export const c = (title, key, props, dataIndex) => ({ title, key, dataIndex: dataIndex || key, ...props });

export const getPoolAddress = id => `0x${id.split("0x")[2]}`;
export const getAssetAddress = id => `0x${id.split("0x")[1]}`;

export const splitDomain = url => url.split("//")[1];

export const getIpfsUrl = cid => `https://ipfs.io/ipfs/${cid}`;

export const listify = obj => {
  return (
    <span>
      {Object.keys(obj || {}).map((k, i) => {
        return (
          <li key={i}>
            <b>{k}</b>: {JSON.stringify(obj[k])}
          </li>
        );
      })}
    </span>
  );
};
