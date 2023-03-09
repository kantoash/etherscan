"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import moment from "moment";
import { CubeIcon } from "@heroicons/react/24/outline";
import { ClipboardIcon } from "@heroicons/react/24/solid";

const HeroSection = () => {
  const [blockResult, setBlockResult] = useState([]);
  const [transactionsResult, setTransactionsResult] = useState([]);
  const [ethPrice, setEthPrice] = useState("");
  const [totalTransactions, setTotalTransactions] = useState("");
  const [latestBlock, setLatestBlock] = useState("");

  useEffect(() => {
    const ethPrice = async () => {
      const response = await axios.get("http://localhost:5001/getethprice", {});
      setEthPrice(response.data.usdPrice);
    };
    const getblockinfo = async () => {
      const response = await axios.get(
        "http://localhost:5001/getblockinfo",
        {}
      );

      const blockArray = [
        response.data.previousBlockInfo[1],
        response.data.previousBlockInfo[2],
        response.data.previousBlockInfo[3],
        response.data.previousBlockInfo[4],
        response.data.previousBlockInfo[5],
      ];

      setTotalTransactions(
        response.data.previousBlockInfo[1].totalTransactions
      );
      setLatestBlock(response.data.latestBlock);
      setBlockResult(blockArray);
      setTransactionsResult(response.data.previousBlockInfo[0].transactions);
    };
    ethPrice();
    getblockinfo();
  }, []);

 
  return (
    <section className="w-full pb-28 flex flex-row items-center justify-between p-2 space-x-5">
      <section className="flex flex-col flex-1 justify-center space-y-2 bg-gray-700 p-1.5 rounded-lg">
        <div className="text-white font-bold ">Latest Blocks</div>
        <div className="">
          {blockResult.map((block) => (
            <div className="flex flex-row items-center justify-between  space-x-3 text-sm bg-gray-900 p-1 rounded-xl cursor-pointer ">
              <CubeIcon className="text-white h-8 w-8" />
              <div>
                <div className="text-blue-400">{block.blockNumber}</div>
                <div className="text-white">
                  {moment(block.time, "YYYYMMDD").fromNow()}
                </div>
              </div>
              <div>
                <span className="text-white"> Fee Recipient</span>{" "}
                <span className="text-blue-400">{block.miner.slice(0, 8)}</span>
              </div>
              <div className="text-white">{block.gasUsed}ETH</div>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col flex-1 justify-center space-y-2  bg-gray-700 p-5 rounded-lg">
        <div className="text-white font-bold ">Latest Transactions</div>
        <div className="">
          {transactionsResult.map((txn) => (
            <div className="flex flex-row items-center justify-between space-x-3 text-sm bg-gray-900 rounded-xl p-1 cursor-pointer text-white">
              <ClipboardIcon className="h-8 w-8 text-white" />

              <div>
                {" "}
                <div className="text-blue-400">
                  {txn.transactionHash.slice(0, 16)}
                </div>
                <div> {moment(txn.time, "YYYYMMDD").fromNow()}</div>
              </div>

              <div className="max-w-[100px] flex-wrap">
                From{" "}
                <span className="text-blue-400">
                  {txn.fromAddress.slice(0, 8)}
                </span>{" "}
                To{" "}
                <span className="text-white">{txn.toAddress.slice(0, 8)}</span>
              </div>
              <div className="bg-black p-1 rounded-md">
                {(Number(txn.value) / 10 ** 18).toFixed(4)} Eth
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default HeroSection;
