
import React from "react";
import moment from "moment";

function SearchResults({ result, searchInput }) {
  return (
    <section className="p-4 flex flex-col pb-28">
      <table className="flex flex-col content-between">
        <thead>
          <tr className="text-white flex justify-between">
            <th>Transaction Hash</th>
            <th>Method</th>
            <th>Block</th>
            <th className="text-blue-500">Age</th>
            <th>From</th>
            <th></th>
            <th>To</th>
            <th>Value</th>
            <th className="text-blue-500">Txn Fee</th>
          </tr>
        </thead>
        <div className="space-y-2 pt-10">
          {result.map((txn) => (
            <tr className="flex justify-between border border-b-[1px] py-2 border-white border-opacity-20 rounded-lg ">
              <td className="text-blue-500">{txn.hash.slice(0, 16)}...</td>
              <td className="text-white bg-[#151515] p-0.5 rounded-md text-sm">
                {" "}
                {txn.decoded_call ? txn.decoded_call.label : "Unknown"}{" "}
              </td>
              <td className="text-blue-500">{txn.block_number}</td>
              <td>{moment(txn.block_timestamp, "YYYYMMDD").fromNow()}</td>
              <td>
                {txn.from_address.slice(0, 8)}...{txn.from_address.slice(34)}
              </td>
              <td
                className={` flex justify-center items-center w-8 h-6 font-semibold ${
                  txn.from_address.toLowerCase() !== searchInput.toLowerCase()
                    ? "bg-[#161f1d] text-[#479f87] "
                    : "bg-[#2d2615] text-[#96792a]"
                }`}
              >
                {txn.from_address.toLowerCase() !== searchInput.toLowerCase()
                  ? "IN"
                  : "OUT"}
              </td>
              <td className="text-blue-500">
                {" "}
                {txn.to_address.slice(0, 8)}...{txn.to_address.slice(34)}
              </td>
              <td>{(txn.value / 10 ** 18).toFixed(5)} ETH</td>
              <td>{(txn.gas_price / 10 ** 18).toFixed(12)}</td>
            </tr>
          ))}
        </div>
      </table>
    </section>
  );
}

export default SearchResults;
