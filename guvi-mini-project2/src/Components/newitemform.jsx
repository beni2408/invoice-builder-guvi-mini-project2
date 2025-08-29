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
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 p-4">
        {/* Product */}
        <input
          value={item.description}
          onChange={(e) => onChange(item.id, "description", e.target.value)}
          className="w-full sm:w-[220px] h-[50px] border border-gray-400 p-3 rounded-md"
          placeholder="Product"
        />

        {/* Qty / Rate / Amount */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 w-full">
          <input
            value={item.qty}
            onChange={(e) => onChange(item.id, "qty", e.target.value)}
            type="number"
            min="0"
            className="w-full sm:w-[80px] h-[50px] border border-gray-400 p-3 rounded-md"
            placeholder="Qty"
          />
          <input
            value={item.rate}
            onChange={(e) => onChange(item.id, "rate", e.target.value)}
            type="number"
            min="0"
            className="w-full sm:w-[120px] h-[50px] border border-gray-400 p-3 rounded-md"
            placeholder="Unit Rate"
          />
          <input
            value={Number.isFinite(amount) ? amount : ""}
            readOnly
            className="w-full sm:w-[120px] h-[50px] border border-gray-400 p-3 rounded-md bg-gray-100"
            placeholder="Amount"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-row justify-around sm:justify-start items-center w-full sm:w-[180px] gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 bg-sky-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-sky-600 transition"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Newitemform;
