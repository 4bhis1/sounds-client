import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./fileUpload.css";

const uploadFile = ({ file }) => {
  let formData = new FormData();
  const name = file.name
    .toString()
    .replace(/[&\/\\#,^@!+()$~%" "'":*?<>{}-]/g, "-");
  file = new File([file], name, { type: file.type });

  formData.append("file", file);
  axios
    .post("http://localhost:8080/upload", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(">>> err", err);
    });
};

// file upload mission successful
const FileUpload = () => {
  const [file, updateFile] = useState();

  const navigate = useNavigate();
  const handleClick = () => navigate("/receive");

  return (
    <>
      <input
        type="file"
        accept=".mp3"
        onChange={(e) => {
          updateFile(e.target.files[0]);
        }}
      />
      <div
        onClick={() => {
          uploadFile({ file });
        }}
      >
        Save
      </div>

      <div className="navigateContainer">
        <div onClick={handleClick} className="navigate">
          Navigate
        </div>
      </div>
    </>
  );
};

export default FileUpload;
