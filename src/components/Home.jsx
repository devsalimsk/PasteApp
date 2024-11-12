import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import "./ForAll.css";
import { IoCopyOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <>
      <div className="container mx-auto p-4 flex flex-col items-center bg-dark-navy text-white min-h-screen">
        <div className="flex mt-[-10rem] flex-col sm:flex-row gap-5 mb-4 w-full max-w-4xl">
          <input
            className="p-3 w-full sm:w-[50%] rounded-2xl bg-dark-blue shadow-neomorph-dark focus:outline-none focus:ring focus:ring-yellow-600 transition-all"
            type="text"
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createPaste}
            className="px-4 py-2 bg-dark-yellow rounded-2xl shadow-neomorph-dark hover:shadow-neomorph-inset-dark text-dark-navy transition-all w-full sm:w-auto mt-4 sm:mt-0"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>
        <div className="w-full max-w-4xl">
          <div className="line-with-balls bg-gray-400 rounded-tl-xl rounded-tr-xl w-full ">
            <span className="ball red ml-2"></span>
            <span className="ball yellow"></span>
            <span className="ball green"></span>
            <button className="flex mb-7">
              <IoCopyOutline
                className="copy-icon text-indigo-800 w-7 h-7 hover:text-white"
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to clipboard");
                }}
              />
            </button>
          </div>
          <textarea
            className="flex w-full sm:w-[600px] p-3 h-[400px] rounded-bl-xl rounded-br-xl bg-dark-blue shadow-neomorph-dark"
            placeholder="Enter content here"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
        </div>
      </div>  
    </>
  );
};

export default Home;
