import React from "react";

function Newitemform({ item, onChange, onRemove, onSave }) {
  const amount = Number(item.qty || 0) * Number(item.rate || 0);

  return (
    <div>
      <div className="flex flex-row justify-between gap-10 pl-10 pt-5 pb-5">
        <input
          value={item.description}
          onChange={(e) => onChange(item.id, "description", e.target.value)}
          className="w-[270px] h-[50px] border border-gray-400 p-3 rounded-md"
          placeholder="Description"
        />

        <div className="flex flex-row justify-between w-[460px] h-[50px] items-center">
          <input
            value={item.qty}
            onChange={(e) => onChange(item.id, "qty", e.target.value)}
            type="number"
            min="0"
            className="w-[80px] h-[50px] border border-gray-400 p-3 rounded-md"
            placeholder="Qty"
          />
          <input
            value={item.rate}
            onChange={(e) => onChange(item.id, "rate", e.target.value)}
            type="number"
            min="0"
            className="w-[120px] h-[50px] border border-gray-400 p-3 rounded-md"
            placeholder="Unit Rate"
          />
          <input
            value={Number.isFinite(amount) ? amount : ""}
            readOnly
            className="w-[120px] h-[50px] border border-gray-400 p-3 rounded-md bg-gray-100"
            placeholder="Amount"
          />
        </div>

        <div className="flex flex-row justify-around items-center w-[180px]">
          <button
            type="button"
            onClick={() => onSave(item.id)}
            className="w-[80px] h-[30px] border p-3 rounded-md bg-blue-800 text-white flex flex-row justify-center items-center"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="w-[80px] h-[30px] border p-3 rounded-md bg-red-500 text-white flex flex-row justify-center items-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Newitemform;
