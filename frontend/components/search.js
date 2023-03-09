"use client";

import { useState } from "react";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SearchResults from './SearchResults'

export default function Search() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = async () => {
    const response = await axios.get("http://localhost:5001/address", {
      params: { address: searchInput },
    });
    setResult(response.data.result);
    setShowResult(true)
    setSearchInput("");
  };
  
  return (
    <div className="flex flex-col justify-center space-y-8">
      <div className="flex flex-row items-center space-x-2 ">
        <input
          maxLength={120}
          required
          placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
          onChange={(e) => setSearchInput(e.target.value)}
          className="bg-transparent placeholder:text-white flex-1 outline-none text-white "
        />
        <button onClick={handleSearch} className="">
          <MagnifyingGlassIcon className="text-white h-8 bg-blue-500 p-2 rounded-lg" />
        </button>
      </div>
      {showResult && <SearchResults result={result} searchInput={searchInput} key={result.length} />}
    </div>
  );
}

// 0x449b02452B6d6AF4d630bd69fA1f53be7Bdff774