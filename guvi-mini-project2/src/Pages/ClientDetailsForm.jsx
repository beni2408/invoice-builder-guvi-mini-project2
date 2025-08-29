import React from "react";
import Newitemform from "../Components/newitemform";

function Clientform() {
  return (
    <div className="flex flex-col justify-center w-full h-full items-start border-black border pl-[170px] pr-[170px] pt-11 bg-gray-100 ">
      <p
        className="text-[40px] font-bold righteous-regular text-sky-600
             hover:text-green-700 
             hover:scale-110
             transition-transform 
             duration-300 ease-in-out"
      >
        Invoice Builder
      </p>
      <div className="border border-gray-300 rounded-xl w-full h-full flex flex-col bg-white mr-[150px] p-11 justify-between gap-10">
        <div className=" rounded-xl w-full h-full flex flex-row   justify-between">
          <div>
            <p className="text-[20px] poppins-medium">Client name</p>
            <input
              type="text"
              className="w-[400px] , h-[50px] border border-gray-400 p-3 rounded-md
            "
              placeholder="Jascar Benish"
            />
          </div>
          <div>
            <p className="text-[20px] poppins-medium">Invoice #</p>
            <input
              type="text"
              className="w-[200px] , h-[50px] border border-gray-400 p-3 rounded-md
            "
              placeholder="INV-001"
            />
          </div>
          <div>
            <p className="text-[20px] poppins-medium">Date</p>
            <input
              type="text"
              className="w-[200px] , h-[50px] border border-gray-400 p-3 rounded-md
            "
              placeholder="Date"
            />
          </div>
        </div>
        {/* Second */}
        <div className="flex flex-col gap-4">
          <div className=" rounded-xl w-full h-full flex flex-row   justify-between">
            <div>
              <p className="text-[20px] poppins-medium">Items </p>
            </div>
          </div>
          <div className="flex flex-col border border-gray-300 rounded-md ">
            <div className="border border-gray-300 rounded-t-md w-full h-full flex flex-row justify-around gap-10 items-center">
              <p className="text-xl">Description</p>
              <div className="flex flex-row justify-around w-[510px] h-[70px] items-center">
                <p className="text-xl">Quantity</p>
                <p className="text-xl">Unit Rate</p>
                <p className="text-xl">Amount</p>
              </div>

              <div className="w-[30px]"></div>
            </div>
            <Newitemform />

            <button className="bg-blue-800 w-[150px] text-white ml-10 h-[45px] rounded-md mb-7 ">
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clientform;
