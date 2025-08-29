import React, { useMemo, useRef, useState } from "react";
import Newitemform from "../Components/newitemform";
import html2pdf from "html2pdf.js";

function Clientform() {
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState("");

  // Items list
  const [items, setItems] = useState([]);

  // Add new editable row
  const handleAddRow = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        description: "",
        qty: "",
        rate: "",
        isEditing: true,
      },
    ]);
  };

  // Update row fields
  const handleChangeItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  };

  // Save row
  const handleSaveItem = (id) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, isEditing: false } : it))
    );
  };

  // Edit row again
  const handleEditItem = (id) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, isEditing: true } : it))
    );
  };

  // Remove row
  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  // Totals
  const subtotal = useMemo(
    () =>
      items.reduce((sum, it) => {
        const qty = Number(it.qty || 0);
        const rate = Number(it.rate || 0);
        return sum + qty * rate;
      }, 0),
    [items]
  );
  const taxRate = 0.18;
  const tax = subtotal * taxRate;
  const grandTotal = subtotal + tax;

  // PDF Export with validation
  const invoiceRef = useRef(null);
  const handleExportPDF = () => {
    if (
      !clientName.trim() ||
      !address.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !invoiceNo.trim() ||
      !date.trim()
    ) {
      alert("⚠️ Please fill all client details before exporting.");
      return;
    }

    if (items.length === 0) {
      alert("⚠️ Please add at least one item before exporting.");
      return;
    }

    const opt = {
      margin: 8,
      filename: `${invoiceNo || "invoice"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(invoiceRef.current).save();
  };

  return (
    <div
      ref={invoiceRef}
      className="flex flex-col justify-center w-full h-full items-start  pl-[170px] pr-[170px] pt-11 bg-gray-100 "
    >
      <p className="text-[40px] font-bold righteous-regular text-sky-600 hover:text-green-700 hover:scale-110 transition-transform duration-300 ease-in-out">
        Invoice Builder
      </p>

      <div className="border border-gray-300 rounded-xl w-full h-full flex flex-col bg-white mr-[150px] mb-[150px] p-11 justify-between gap-10">
        {/* Client Details */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[20px] poppins-medium">Client Name</p>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full h-[50px] border border-gray-400 p-3 rounded-md"
              placeholder="John Doe"
            />
          </div>
          <div>
            <p className="text-[20px] poppins-medium">Invoice #</p>
            <input
              type="text"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
              className="w-full h-[50px] border border-gray-400 p-3 rounded-md"
              placeholder="INV-001"
            />
          </div>
          <div>
            <p className="text-[20px] poppins-medium">Date</p>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-[50px] border border-gray-400 p-3 rounded-md"
            />
          </div>
          <div>
            <p className="text-[20px] poppins-medium">Address</p>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-[50px] border border-gray-400 p-3 rounded-md"
              placeholder="123 Street, City"
            />
          </div>
          <div>
            <p className="text-[20px] poppins-medium">Phone</p>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-[50px] border border-gray-400 p-3 rounded-md"
              placeholder="+91 9876543210"
            />
          </div>
          <div>
            <p className="text-[20px] poppins-medium">Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] border border-gray-400 p-3 rounded-md"
              placeholder="example@mail.com"
            />
          </div>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[20px] poppins-medium">Items</p>
          </div>

          <div className="flex flex-col border border-gray-300 rounded-md">
            {/* Header */}
            <div className="border border-gray-300 rounded-t-md w-full h-full flex flex-row justify-around gap-10 items-center">
              <p className="text-xl">Description</p>
              <div className="flex flex-row justify-around w-[510px] h-[70px] items-center">
                <p className="text-xl">Quantity</p>
                <p className="text-xl">Unit Rate</p>
                <p className="text-xl">Amount</p>
              </div>
              <div className="w-[30px]"></div>
            </div>

            {/* Rows */}
            {items.map((it) =>
              it.isEditing ? (
                <Newitemform
                  key={it.id}
                  item={it}
                  onChange={handleChangeItem}
                  onRemove={handleRemoveItem}
                  onSave={handleSaveItem}
                />
              ) : (
                <div
                  key={it.id}
                  className="flex flex-row justify-between gap-10 pl-10 pt-5 pb-5 border border-gray-400"
                >
                  <p className="w-[270px] h-[50px] p-3">{it.description}</p>
                  <div className="flex flex-row justify-between w-[460px] h-[50px] items-center">
                    <p className="w-[80px] p-3">{it.qty}</p>
                    <p className="w-[120px] p-3">{it.rate}</p>
                    <p className="w-[120px] p-3">
                      {Number(it.qty) * Number(it.rate)}
                    </p>
                  </div>
                  <div className="flex flex-row justify-around items-center w-[180px]">
                    <button
                      onClick={() => handleEditItem(it.id)}
                      className="w-[80px] h-[30px] border p-3 rounded-md bg-blue-800 text-white flex flex-row justify-center items-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveItem(it.id)}
                      className="w-[80px] h-[30px] border p-3 rounded-md bg-red-500 text-white flex flex-row justify-center items-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}

            {/* Add Item Button */}
            <button
              onClick={handleAddRow}
              className="bg-blue-800 w-[150px] text-white ml-10 h-[45px] rounded-md mb-7 mt-5"
            >
              Add Item
            </button>
          </div>
        </div>

        {/* Totals */}
        <div className="flex flex-col items-end gap-2 mt-5">
          <p className="text-lg">
            Subtotal: <span className="font-bold">₹{subtotal.toFixed(2)}</span>
          </p>
          <p className="text-lg">
            Tax (18%): <span className="font-bold">₹{tax.toFixed(2)}</span>
          </p>
          <p className="text-xl">
            Grand Total:{" "}
            <span className="font-bold text-green-600">
              ₹{grandTotal.toFixed(2)}
            </span>
          </p>

          {/* Export Button */}
          <button
            onClick={handleExportPDF}
            className="mt-3 bg-gray-800 text-white px-5 py-2 rounded-md"
          >
            Export as PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default Clientform;
