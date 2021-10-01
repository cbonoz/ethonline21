import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { CSVReader } from "react-papaparse";

function Register({ setEmployees }) {
  const [data, setData] = useState();

  const onUpload = (d, fileInfo) => {
    console.log("upload data", d, fileInfo);
    setData(d);
  };
  return (
    <div>
      <p>Hi</p>
      <CSVReader onFileLoad={onUpload}>Select CSV</CSVReader>
      {data && (
        <div>
          Uploading {data.length} employees.
          <Button
            onClick={() => {
              console.log("set", data);
              setEmployees(data);
            }}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}

export default Register;
