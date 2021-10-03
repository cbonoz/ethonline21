import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { CSVReader } from "react-papaparse";

function Register({ setEmployees, history }) {
  const [data, setData] = useState();

  const onUpload = (d, fileInfo) => {
    let i = 0;
    const header = d[i].data;
    i += 1;
    const results = [];
    while (i < d.length) {
      const row = d[i].data;
      if (row.length === header.length) {
        const obj = {};
        for (let j in header) {
          const key = header[j];
          const v = row[j];
          obj[key] = v;
        }
        results.push(obj);
      }
      i += 1;
    }
    console.log("upload data", d, results, fileInfo);
    setData(results);
  };
  return (
    <div>
      <p>Hi</p>
      <CSVReader onFileLoad={onUpload}>Select CSV</CSVReader>
      {data && (
        <div>
          Uploading {data.length} employees.
          <br />
          <Button
            onClick={() => {
              console.log("set", data);
              setEmployees(data);
              history.push("/employees");
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
