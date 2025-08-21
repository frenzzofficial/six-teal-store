import React from "react";
import Spinner from "../ui/loaders/Spinner";

const Loader = () => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <Spinner />
      </div>
    </>
  );
};

export default Loader;
