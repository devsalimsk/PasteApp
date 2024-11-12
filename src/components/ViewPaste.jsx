import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoCopyOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import "./ForAll.css";

const ViewPaste = () => {
  const [value, setValue] = useState("");
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  useEffect(() => {
    if (paste) {
      setValue(paste.content);
    }
  }, [paste]);

  return (
    <div className="mx-auto flex flex-col items-center bg-dark-navy text-white min-h-screen">
      <div className="flex flex-col sm:flex-row gap-5 mb-2 w-full max-w-4xl">
        <input
          className="p-3 w-full sm:w-[50%] rounded-2xl bg-dark-blue shadow-neomorph-dark focus:outline-none focus:ring focus:ring-yellow-600 transition-all"
          type="text"
          placeholder="Enter title here"
          value={paste?.title || ""}
          disabled
        />
      </div>

      <div className="w-full max-w-4xl">
          <div className="line-with-balls ml-2 mt-1">
            <span className="ball red"></span>
            <span className="ball yellow"></span>
            <span className="ball green"></span>
            <button className="flex">
              <IoCopyOutline
                className="copy-icon bottom-[-12px]"
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to clipboard");
                }}
              />
            </button>
          </div>
        
        <textarea
          className="w-full sm:w-[600px] mt-4 p-8 h-[400px] rounded-xl bg-dark-blue shadow-neomorph-dark focus:outline-none focus:ring focus:ring-yellow-600 transition-all"
          placeholder="Enter content here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled
        ></textarea>
      </div>
    </div>
  );
};

export default ViewPaste;
