import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import { storeNFT } from "../util/nft";
import { Button, Modal, Card } from "antd";
import axios from "axios";
import { getIpfsUrl, splitDomain } from "../util";

function Badges(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [badges, setBadges] = useState();
  const [selectedBadge, setSelectedBadge] = useState();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const upload = async () => {
    if (!acceptedFiles) {
      alert("At least one image file is required for upload");
    }
    // TODO: upload to ipfs.
    let results = [...(badges || [])];
    for (let i in acceptedFiles) {
      const f = acceptedFiles[i];
      const fileName = f.name || f.key;
      try {
        const nftData = await storeNFT(fileName, "Achievement Badge", f);
        const response = await axios.get(getIpfsUrl(splitDomain(nftData.url)));
        nftData["metadata"] = response.data;
        const d = new Date();
        nftData["added"] = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
        results.push(nftData);
      } catch (e) {
        alert(`Error uploading ${fileName}: ${e.toString()}`);
      }
    }
    console.log("results", results);
    setBadges(results);
  };

  return (
    <div>
      <Modal
        className="info-modal"
        title={selectedBadge?.metadata?.name}
        visible={!!selectedBadge}
        onOk={() => setSelectedBadge(undefined)}
        okText="Done"
      >
        Data: {JSON.stringify(selectedBadge || {}, null, "\t")}
      </Modal>
      <p>Achievements</p>
      {/* <img
        className="badge-image"
        src={"https://ipfs.io/ipfs/bafybeibtr3qshzzi2p75z6yu7vu3gpmxvnlneforatvr7o7awtgltw5sjq/helping_badge.png"}
      /> */}
      {(badges || []).map(b => {
        return (
          <span className="cursor-pointer" onClick={() => setSelectedBadge(b)}>
            <img className="badge-image" src={getIpfsUrl(splitDomain(b.metadata.image))} />
          </span>
        );
      })}

      <Card size="large" title="Add badges">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p className="cursor-pointer underline">Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
        <Button onClick={upload}>Upload</Button>
      </Card>
    </div>
  );
}

Badges.propTypes = {};

export default Badges;
