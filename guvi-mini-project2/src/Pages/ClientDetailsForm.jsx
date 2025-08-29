import React, { useEffect, useMemo, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import Sign from "../assets/Sign.png";
import useInvoiceItems from "../Components/InvoiceDetails";
function Clientform() {
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState("");

  const {
    items,
    handleAddRow,
    handleChangeItem,
    handleSaveItem,
    handleEditItem,
    handleRemoveItem,
  } = useInvoiceItems();

  useEffect(() => {
    const uniqueNo = `INV-${Date.now()}`;
    setInvoiceNo(uniqueNo);
  }, []);

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
      <div
        ref={invoiceRef}
        className="flex flex-col justify-center w-full h-full items-start px-4 sm:px-10 md:px-20 pt-6 sm:pt-10 md:pt-12 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 mb-6 tracking-tight">
          Invoice Builder
        </h1>

        <div className="shadow-2xl rounded-2xl w-full bg-white/90 backdrop-blur-lg p-6 sm:p-8 md:p-10 space-y-8 md:space-y-10 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Customer Name
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
                className="mt-2 w-full h-12 border border-gray-300 px-4 rounded-xl shadow-sm bg-gray-100 cursor-not-allowed"
                placeholder="Auto-generated"
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
                placeholder="Enter customer address"
                rows={3}
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^[0-9+]*$/.test(value)) {
                    setPhone(value);
                  }
                }}
                className="mt-2 w-full h-12 border border-gray-300 px-4 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
                placeholder="+91 98XXXXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^[a-zA-Z0-9@._-]*$/.test(value)) {
                    setEmail(value);
                  }
                }}
                className="mt-2 w-full h-12 border border-gray-300 px-4 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
                placeholder="jascar@gmail.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold text-gray-700">Items</p>

            <div className="flex flex-col border border-gray-200 rounded-xl overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-sky-50 to-indigo-50 px-4 sm:px-6 py-3 text-gray-700 font-semibold text-sm sm:text-base">
                <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
                  <p className="col-span-5">Product</p>
                  <p className="col-span-2">Quantity</p>
                  <p className="col-span-2">Unit Rate</p>
                  <p className="col-span-3">Amount / Actions</p>
                </div>

                <div className="sm:hidden">Add / Edit Items</div>
              </div>

              {items.map((it) =>
                it.isEditing ? (
                  <div
                    key={it.id}
                    className="px-4 sm:px-6 py-4 border-t bg-white"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
                      <input
                        value={it.description}
                        onChange={(e) =>
                          handleChangeItem(it.id, "description", e.target.value)
                        }
                        className="col-span-1 sm:col-span-5 h-[50px] border border-gray-300 p-3 rounded-md w-full"
                        placeholder="Product"
                      />

                      <input
                        value={it.qty}
                        onChange={(e) =>
                          handleChangeItem(it.id, "qty", e.target.value)
                        }
                        type="number"
                        min="0"
                        className="col-span-1 sm:col-span-2 h-[50px] border border-gray-300 p-3 rounded-md w-full"
                        placeholder="Qty"
                      />

                      {/* Rate */}
                      <input
                        value={it.rate}
                        onChange={(e) =>
                          handleChangeItem(it.id, "rate", e.target.value)
                        }
                        type="number"
                        min="0"
                        className="col-span-1 sm:col-span-2 h-[50px] border border-gray-300 p-3 rounded-md w-full"
                        placeholder="Unit Rate"
                      />

                      <input
                        value={
                          Number.isFinite(Number(it.qty) * Number(it.rate))
                            ? Number(it.qty) * Number(it.rate)
                            : ""
                        }
                        readOnly
                        className="col-span-1 sm:col-span-3 h-[50px] border border-gray-300 p-3 rounded-md bg-gray-100 w-full"
                        placeholder="Amount"
                      />

                      <div className="col-span-1 sm:col-span-12 flex gap-2 sm:justify-end mt-1">
                        <button
                          type="button"
                          onClick={() => {
                            if (!it.description || !it.qty || !it.rate) {
                              alert(
                                "Please fill in all fields before adding the item."
                              );
                              return;
                            }
                            handleSaveItem(it.id);
                          }}
                          className="bg-sky-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-600 transition"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(it.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={it.id}
                    className="px-4 sm:px-6 py-4 border-t hover:bg-gray-50 transition"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
                      <p className="col-span-1 sm:col-span-5 break-words">
                        {it.description}
                      </p>
                      <p className="col-span-1 sm:col-span-2">{it.qty}</p>
                      <p className="col-span-1 sm:col-span-2">{it.rate}</p>
                      <div className="col-span-1 sm:col-span-3 flex flex-col sm:flex-row sm:items-center gap-2">
                        <p className="sm:flex-1">
                          {Number(it.qty) * Number(it.rate)}
                        </p>
                        <div className="flex gap-2 sm:w-auto w-full">
                          <button
                            onClick={() => handleEditItem(it.id)}
                            className="flex-1 sm:flex-none bg-sky-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-sky-600 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleRemoveItem(it.id)}
                            className="flex-1 sm:flex-none bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}

              <button
                onClick={handleAddRow}
                className="self-start mt-4 ml-4 sm:ml-6 bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-4 sm:px-6 py-2 rounded-xl shadow hover:scale-105 transform transition mb-5"
              >
                + Add Item
              </button>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 mt-6 text-sm sm:text-base">
            <p className="text-gray-700">
              Subtotal:{" "}
              <span className="font-bold">₹{subtotal.toFixed(2)}</span>
            </p>
            <p className="text-gray-700">
              Tax (18%): <span className="font-bold">₹{tax.toFixed(2)}</span>
            </p>
            <p className="text-lg sm:text-xl font-semibold">
              Grand Total:{" "}
              <span className="text-green-600">₹{grandTotal.toFixed(2)}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full sm:w-auto">
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
            <p>Signature</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Clientform;
