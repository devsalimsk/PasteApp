import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ForAll.css";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineViewInAr } from "react-icons/md";
import { BsCopy } from "react-icons/bs";
import { FaPenToSquare } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-dark-navy text-white">
      <input
        type="search"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-3 mb-6 w-full max-w-lg rounded-lg bg-dark-blue text-white shadow-neomorph-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
      />
      <div className="w-full max-w-2xl">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="p-4 mb-6 bg-dark-blue rounded-lg shadow-neomorph-dark hover:shadow-neomorph-inset-dark transition-shadow"
            >
              {/* Title and Buttons Row */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-yellow-400 truncate">
                  {paste.title}
                </h3>
                {/* Buttons */}
                <div className="flex gap-3 all-button flex-row md:flex-row"> {/* Responsive flex layout */}
                  <NavLink to={`/?pasteId=${paste?._id}`}>
                    <button
                      className="p-2 rounded-full hover:bg-gray-700 transition-colors border"
                      aria-label="Edit Paste"
                    >
                      <FaPenToSquare className="fill-white w-5 h-5" />
                    </button>
                  </NavLink>
                  <NavLink to={`/pastes/${paste?._id}`}>
                    <button
                      className="p-2 rounded-full hover:bg-gray-700 transition-colors border"
                      aria-label="View Paste"
                    >
                      <MdOutlineViewInAr className="fill-white w-5 h-5" />
                    </button>
                  </NavLink>
                  <NavLink>
                    <button
                      onClick={() => handleDelete(paste?._id)}
                      className="p-2 rounded-full hover:bg-gray-700 transition-colors border"
                      aria-label="Delete Paste"
                    >
                      <RiDeleteBin6Line className="fill-white w-5 h-5" />
                    </button>
                  </NavLink>
                  <NavLink>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied to clipboard");
                      }}
                      className="p-2 rounded-full hover:bg-gray-700 transition-colors border"
                      aria-label="Copy Paste Content"
                    >
                      <BsCopy className="fill-white w-5 h-5" />
                    </button>
                  </NavLink>
                  <NavLink>
                    <button
                      className="p-2 rounded-full hover:bg-gray-700 transition-colors border"
                      aria-label="Share Paste"
                    >
                      <FaShareAlt className="fill-white w-5 h-5" />
                    </button>
                  </NavLink>
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-300 mt-2 line-clamp-2">{paste.content}</p>
              <div className="text-sm text-gray-400 mt-1">{paste.createdAt}</div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No results found</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
