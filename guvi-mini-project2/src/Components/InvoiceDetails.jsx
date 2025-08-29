import { useState } from "react";

export default function useInvoiceItems() {
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

  return {
    items,
    handleAddRow,
    handleChangeItem,
    handleSaveItem,
    handleEditItem,
    handleRemoveItem,
  };
}
