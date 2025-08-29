import React from "react";

function Newitemform() {
  return (
    <div>
      <div className="flex flex-row justify-between gap-10 pl-10 pt-5 pb-5">
        <input
          className="w-[270px] , h-[50px] border border-gray-400 p-3 rounded-md"
          placeholder="Description"
        />
        <div className="flex flex-row justify-between w-[460px] h-[50px] items-center">
          <input
            className="w-[80px] , h-[50px] border border-gray-400 p-3 rounded-md"
            placeholder="Qty"
          />
          <input
            className="w-[120px] , h-[50px] border border-gray-400 p-3 rounded-md"
            placeholder="Unit Rate"
          />
          <input
            className="w-[120px] , h-[50px] border border-gray-400 p-3 rounded-md"
            placeholder="Amount"
          />
        </div>
        <div className="flex flex-row justify-around items-center w-[180px]">
          <button className="w-[80px] , h-[30px] border  p-3 rounded-md bg-gray-200 text-black flex flex-row justify-center items-center">
            Edit
          </button>
          <button className="w-[80px] , h-[30px] border p-3 rounded-md bg-red-500 text-white flex flex-row justify-center items-center">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Newitemform;
