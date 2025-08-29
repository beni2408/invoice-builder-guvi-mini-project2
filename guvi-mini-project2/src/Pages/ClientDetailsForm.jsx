import React, { useEffect, useMemo, useRef, useState } from "react";
import Newitemform from "../Components/newitemform";
import html2pdf from "html2pdf.js";
import Sign from "../assets/Sign.png";

function Clientform() {
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const uniqueNo = `INV-${Date.now()}`;
    setInvoiceNo(uniqueNo);
  }, []);

  const [items, setItems] = useState([]);

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

  const handleChangeItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  };

  const handleSaveItem = (id) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, isEditing: false } : it))
    );
  };

  const handleEditItem = (id) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, isEditing: true } : it))
    );
  };

  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

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

  const validateInvoice = () => {
    if (
      !clientName.trim() ||
      !address.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !invoiceNo.trim() ||
      !date.trim()
    ) {
      alert("⚠️ Please fill all client details before proceeding.");
      return false;
    }
    if (items.length === 0) {
      alert("⚠️ Please add at least one item before proceeding.");
      return false;
    }
    return true;
  };

  const invoiceRef = useRef(null);
  const printRef = useRef(null);

  const handleExportPDF = () => {
    if (!validateInvoice()) return;

    const element = printRef.current.cloneNode(true);
    element.style.position = "static";
    element.style.width = "210mm";
    element.style.minHeight = "297mm";
    element.style.padding = "20mm";
    element.style.background = "#fff";

    document.body.appendChild(element);

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${invoiceNo || "invoice"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        document.body.removeChild(element);
      });
  };

  const handleSave = () => {
    if (!validateInvoice()) return;

    const invoiceData = {
      clientName,
      address,
      phone,
      email,
      invoiceNo,
      date,
      items,
      subtotal,
      tax,
      grandTotal,
    };
    localStorage.setItem("savedInvoice", JSON.stringify(invoiceData));
    alert("✅ Invoice saved successfully!");
  };

  const handlePrint = () => {
    if (!validateInvoice()) return;

    const printContents = invoiceRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <>
      {/* Main Builder UI */}
      <div
        ref={invoiceRef}
        className="flex flex-col justify-center w-full h-full items-start px-20 pt-12 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 mb-6 tracking-tight">
          Invoice Builder
        </h1>

        <div className="shadow-2xl rounded-2xl w-full bg-white/90 backdrop-blur-lg p-10 space-y-10 border border-gray-200">
          {/* Client Details */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Client Name
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="mt-2 w-full h-12 border border-gray-300 px-4 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
                placeholder="Jascar"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Invoice #
              </label>
              <input
                type="text"
                value={invoiceNo}
                readOnly
                className="mt-2 w-full h-12 border border-gray-200 px-4 rounded-xl bg-gray-100 text-gray-500 shadow-inner"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 w-full h-12 border border-gray-300 px-4 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-2 w-full p-3 border rounded-xl resize-y shadow-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
                placeholder="Enter client address"
                rows={3}
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full h-12 border border-gray-300 px-4 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
                placeholder="+91 9876543210"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full h-12 border border-gray-300 px-4 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
                placeholder="example@mail.com"
              />
            </div>
          </div>

          {/* Items */}
          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold text-gray-700">Items</p>

            <div className="flex flex-col border border-gray-200 rounded-xl overflow-hidden shadow-md">
              {/* Header */}
              <div className="bg-gradient-to-r from-sky-50 to-indigo-50 px-6 py-3 flex justify-between items-center text-gray-700 font-semibold">
                <p className="flex-1">Description</p>
                <div className="flex flex-row justify-around flex-[2]">
                  <p>Quantity</p>
                  <p>Unit Rate</p>
                  <p>Amount</p>
                </div>
                <div className="w-24"></div>
              </div>

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
                    className="flex flex-row justify-between px-6 py-4 border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <p className="flex-1">{it.description}</p>
                    <div className="flex flex-row justify-around flex-[2]">
                      <p>{it.qty}</p>
                      <p>{it.rate}</p>
                      <p>{Number(it.qty) * Number(it.rate)}</p>
                    </div>
                    <div className="flex gap-2 w-24 ">
                      <button
                        onClick={() => handleEditItem(it.id)}
                        className="flex-1 bg-sky-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-sky-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveItem(it.id)}
                        className="flex-1 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              )}

              <button
                onClick={handleAddRow}
                className="self-start mt-4 ml-6 bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-6 py-2 rounded-xl shadow hover:scale-105 transform transition mb-5"
              >
                + Add Item
              </button>
            </div>
          </div>

          {/* Totals + Buttons */}
          <div className="flex flex-col items-end gap-2 mt-6">
            <p className="text-gray-700">
              Subtotal:{" "}
              <span className="font-bold">₹{subtotal.toFixed(2)}</span>
            </p>
            <p className="text-gray-700">
              Tax (18%): <span className="font-bold">₹{tax.toFixed(2)}</span>
            </p>
            <p className="text-xl font-semibold">
              Grand Total:{" "}
              <span className="text-green-600">₹{grandTotal.toFixed(2)}</span>
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSave}
                className="bg-sky-500 text-white px-6 py-2 rounded-xl shadow hover:bg-sky-600 transition"
              >
                Save
              </button>
              <button
                onClick={handlePrint}
                className="bg-green-500 text-white px-6 py-2 rounded-xl shadow hover:bg-green-600 transition"
              >
                Print
              </button>
              <button
                onClick={handleExportPDF}
                className="bg-gray-800 text-white px-6 py-2 rounded-xl shadow hover:bg-gray-900 transition"
              >
                Export as PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Printable Invoice */}
      <div
        ref={printRef}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          background: "#fff",
          width: "210mm",
          minHeight: "297mm",
          padding: "25mm",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontSize: "14px",
          color: "#333",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "3px solid #2563eb",
            paddingBottom: "10px",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#2563eb" }}>
            INVOICE
          </h1>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontWeight: "600" }}>Invoice #: {invoiceNo}</p>
            <p>Date: {date}</p>
          </div>
        </div>

        {/* Client Info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <div>
            <p style={{ fontWeight: "600", marginBottom: "6px" }}>BILL TO:</p>
            <p>{clientName}</p>
            <p>{address}</p>
            <p>{email}</p>
            <p>{phone}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontWeight: "600", marginBottom: "6px" }}>From:</p>
            <p>JB Musicals Pvt ltd</p>
            <p>Madadthuvilai , Mission Koil Street</p>
            <p>Arumuganeri, Thoothukudi , 628202</p>
          </div>
        </div>

        {/* Items Table */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "30px",
          }}
        >
          <thead>
            <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                Description
              </th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                Unit Price
              </th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                Qty
              </th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                  {it.description}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                  ₹{it.rate}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                  {it.qty}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                  ₹{(Number(it.qty) * Number(it.rate)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Section */}
        <div
          style={{
            textAlign: "right",
            borderTop: "2px solid #ddd",
            paddingTop: "15px",
          }}
        >
          <p>
            <strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}
          </p>
          <p>
            <strong>Tax (18%):</strong> ₹{tax.toFixed(2)}
          </p>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "700",
              marginTop: "10px",
              color: "#16a34a",
            }}
          >
            TOTAL: ₹{grandTotal.toFixed(2)}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #eee",
            paddingTop: "20px",
            fontSize: "13px",
            color: "#666",
          }}
        >
          <div className="mt-[80px]">
            <p>
              <strong>Payment Terms:</strong> Net 30 days
            </p>
          </div>
          <div className="flex flex-col">
            <img
              className="w-44 h-20 object-cover rounded-lg"
              src={Sign}
              alt=""
            />

            <p>Signature:Jascar Benish</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Clientform;
