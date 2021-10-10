import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import { storeNFT } from "../util/nft";
import { Button, Modal, Card } from "antd";
import axios from "axios";
import { getIpfsUrl, listify, splitDomain } from "../util";

function Badges(props) {
  const { acceptedFiles, getRootProps, getInputProps, inputRef } = useDropzone();
  const [badges, setBadges] = useState();
  const [selectedBadge, setSelectedBadge] = useState();
  const [matches, setMatches] = useState();
  const [loading, setLoading] = useState(false);

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const removeAll = () => {
    console.log("removeAll...");
    acceptedFiles.length = 0;
    acceptedFiles.splice(0, acceptedFiles.length);
    inputRef.current.value = "";
    console.log(acceptedFiles);
  };

  const upload = async () => {
    if (!acceptedFiles) {
      alert("At least one image file is required for upload");
    }

    setLoading(true);
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
    removeAll();
    setLoading(false);
    console.log("results", results);
    setBadges(results);
  };

  const searchNFT = async () => {
    setLoading(true);
    const imageUrl = getIpfsUrl(splitDomain(selectedBadge.metadata.image));
    var options = {
      method: "POST",
      url: "https://api.nftport.xyz/v0/recommendations/similar_nfts/urls",
      headers: { "Content-Type": "application/json", Authorization: "" },
      data: {
        url: imageUrl,
        page_number: 1,
        page_size: 50,
      },
    };

    try {
      const results = await axios.request(options);
      setMatches(results.data);
    } catch (e) {
      console.error("matches", e);
      alert("Error finding matches", e.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        className="info-modal"
        title={selectedBadge?.metadata?.name.split(".")[0] || "Badge Detail"}
        visible={!!selectedBadge}
        onOk={() => setSelectedBadge(undefined)}
        onCancel={() => setSelectedBadge(undefined)}
        okText="Done"
      >
        {listify(selectedBadge)}

        <br />
        <p>Find other employees with this NFT!</p>

        {/* TODO: add api key */}
        {false && <Button type={"primary"} loading={loading} disabled={loading} onClick={searchNFT}>
          Search NFTs
        </Button>}
        {matches && (
          <div>
            <hr />
            {listify(matches)}
          </div>
        )}
      </Modal>
      <h2>Achievements</h2>
      {/* <img
        className="badge-image"
        src={"https://ipfs.io/ipfs/bafybeibtr3qshzzi2p75z6yu7vu3gpmxvnlneforatvr7o7awtgltw5sjq/helping_badge.png"}
      /> */}
      {(badges || []).map((b, i) => {
        return (
          <span
            key={i}
            className="cursor-pointer"
            onClick={() => {
              setMatches(undefined);
              setSelectedBadge(b);
            }}
          >
            <img className="badge-image" src={getIpfsUrl(splitDomain(b.metadata.image))} />
          </span>
        );
      })}

      <Card size="large" title="Add badges">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p className="cursor-pointer underline">Drag 'n' drop some files here, or click to select files</p>
        </div>
        {files.length > 0 && (
          <span>
            <aside>
              <h4>Files</h4>
              <ul>{files}</ul>
            </aside>
            <Button type="primary" disabled={loading} loading={loading} onClick={upload}>
              Upload
            </Button>
          </span>
        )}
      </Card>
    </div>
  );
}

Badges.propTypes = {};

export default Badges;
