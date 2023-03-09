"use client";

import { ChevronDown } from "@web3uikit/icons";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "../public/Logo.png";

function Header() {
  const [ethPrice, setEthPrice] = useState("");

  useEffect(() => {
    const getEthPrice = async () => {
      const response = await axios.get("http://localhost:5001/getethprice", {});
      setEthPrice(response.data.usdPrice);
    };
    getEthPrice();
  },[]);

  return (
    <header className="flex flex-col space-y-2 pb-8">
      <section className="text-white ">
        ETH Price:{" "}
        <span className="text-blue-500">${Number(ethPrice).toFixed(2)}</span>
      </section>
      <section className="flex flex-row justify-between items-center space-x-2">
        <Image
          src={Logo}
          alt="Etherscan Logo"
          className="h-10 w-24 object-fill"
        />
        <section className="flex flex-row items-center space-x-2 text-white text-base ">
          <p className="active:text-blue-500 cursor-pointer pr-5">Home</p>
          <div className="flex flex-row items-center active:text-blue-500 cursor-pointer">
            <p>Blockchain</p>
            <ChevronDown className="text-white h-8 w-8" />
          </div>
          <div className="flex flex-row items-center active:text-blue-500 cursor-pointer">
            <p>Tokens</p>
            <ChevronDown className="text-white h-8 w-8" />
          </div>
          <div className="flex flex-row items-center active:text-blue-500 cursor-pointer">
            <p>NFTs</p>
            <ChevronDown className="text-white h-8 w-8" />
          </div>
          <div className="flex flex-row items-center active:text-blue-500 cursor-pointer">
            <p>Resources</p>
            <ChevronDown className="text-white h-8 w-8" />
          </div>
          <div className="flex flex-row items-center active:text-blue-500 cursor-pointer">
            <p>Developers</p>
            <ChevronDown className="text-white h-8 w-8" />
          </div>
          <div className="flex flex-row items-center active:text-blue-500 cursor-pointer">
            <p>More</p>
            <ChevronDown className="text-white h-8 w-8" />
          </div>
        </section>
      </section>
    </header>
  );
}

export default Header;
