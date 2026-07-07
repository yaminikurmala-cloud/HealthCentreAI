import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

function AddMedicineModal({
  isOpen,
  onClose,
  onSave,
  editingMedicine,
}) {
  const { t } = useLanguage();

  const emptyForm = {
    name: "",
    stock: "",
    required: "",
    status: "Available",
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingMedicine) {
      setFormData({
        name: editingMedicine.name || "",
        stock: editingMedicine.stock || "",
        required: editingMedicine.required || "",
        status: editingMedicine.status || "Available",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingMedicine, isOpen]);

  if (!isOpen) return null;

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      ...formData,
      stock: Number(formData.stock),
      required: Number(formData.required),
    });

    setFormData(emptyForm);
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-xl p-8 shadow-xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            {editingMedicine
              ? t.editMedicine
              : t.addMedicine}
          </h2>

          <button
            onClick={onClose}
            className="hover:bg-slate-100 p-2 rounded-lg"
          >
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            name="name"
            placeholder={t.medicineName}
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              name="stock"
              placeholder={t.currentStock}
              value={formData.stock}
              onChange={handleChange}
              className="border rounded-xl p-3"
              required
            />

            <input
              type="number"
              name="required"
              placeholder={t.requiredStock}
              value={formData.required}
              onChange={handleChange}
              className="border rounded-xl p-3"
              required
            />

          </div>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option>{t.available}</option>
            <option>{t.low}</option>
            <option>{t.critical}</option>
          </select>

          <div className="flex justify-end gap-4 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 border rounded-xl"
            >
              {t.cancel}
            </button>

            <button
              type="submit"
              className="px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
            >
              {editingMedicine
                ? t.updateMedicine
                : t.saveMedicine}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddMedicineModal;