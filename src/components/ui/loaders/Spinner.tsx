import React from "react";
import "../../../styles/components/Spinner.css";

const Spinner = () => {
  return (
    <div className=" w-full min-h-screen flex justify-center items-center flex-col">
      <div className="Loader_spinner" style={{ fontSize: "10px" }}>
        <div className="Loader__spinner"></div>
        <div className="Loader__spinner"></div>
        <div className="Loader__spinner"></div>
        <div className="Loader__spinner"></div>
        <div className="Loader__spinner"></div>
        <div className="Loader__spinner"></div>
        <div className="Loader__spinner"></div>
        <div className="Loader__spinner"></div>
        <div className="Loader__spinner"></div>
        <div className="Loader__spinner"></div>
        <div className="Loader__spinner"></div>
        <div className="Loader__spinner"></div>
      </div>
    </div>
  );
};

export default Spinner;
