import React from "react";
import PropTypes from "prop-types";

function Upload(props) {
  return (
    <div>
      <CSVReader onFileLoaded={(data, fileInfo) => console.dir(data, fileInfo)} />
    </div>
  );
}

Upload.propTypes = {};

export default Upload;
