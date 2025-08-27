import React from "react";

function Clientform() {
  return (
    <div className="flex flex-col justify-center w-full h-full items-start border-black border pl-[220px] pr-[220px] pt-11 bg-gray-100 ">
      <p
        className="text-[40px] font-bold righteous-regular text-sky-600
             hover:text-green-700 
             hover:scale-110
             transition-transform transition-colors
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
              placeholder="INV-001"
            />
          </div>
        </div>

        {/* Second */}

        <div className=" rounded-xl w-full h-full flex flex-row   justify-between">
          <div>
            <p className="text-[20px] poppins-medium">Items </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clientform;
