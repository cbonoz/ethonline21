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
      <br />
      <h1>Employee upload</h1>
      <p>
        Upload a CSV of employees to get started.{" "}
        <a target="_blank" href="https://github.com/cbonoz/ethonline21/blob/master/data/employees.csv">
          Example here
        </a>
      </p>
      <CSVReader onFileLoad={onUpload}>Select CSV</CSVReader>
      {data && (
        <div>
          <div className="upload-text">Uploading {data.length} employees.</div>
          <br />
          <Button
            onClick={() => {
              console.log("set", data);
              setEmployees(data);
              // history.push("/employees");
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
