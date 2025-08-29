import React from "react";

function Newitemform({ item, onChange, onRemove, onSave }) {
  const amount = Number(item.qty || 0) * Number(item.rate || 0);

  const handleSave = () => {
    if (!item.description || !item.qty || !item.rate) {
      alert("Please fill in all fields before adding the item.");
      return;
    }
    onSave(item.id);
  };

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

        <div className="flex flex-row justify-around items-center w-[180px] gap-2 mr-3">
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 bg-sky-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-sky-600 transition"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="flex-1 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Newitemform;
