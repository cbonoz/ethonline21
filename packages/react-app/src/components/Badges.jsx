import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import { Button } from "antd";

function Badges(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [badges, setBadges] = useState();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const upload = async () => {
      // TODO: upload to ipfs.
  }

  return (
    <div>
      <p>Achievements</p>
      <p>Grant this employee badges</p>

      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
      <Button onClick={upload}>Upload</Button>
    </div>
  );
}

Badges.propTypes = {};

export default Badges;
