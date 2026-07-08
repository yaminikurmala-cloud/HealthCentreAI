import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

function AddPHCModal({
  isOpen,
  onClose,
  onSave,
  editingPHC,
}) {
  const { t } = useLanguage();

  const emptyForm = {
    name: "",
    district: "",
    status: "Active",
    availableBeds: "",
    testsAvailable: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingPHC) {
      setFormData({
        name: editingPHC.name || "",
        district: editingPHC.district || "",
        status: editingPHC.status || "Active",
        availableBeds:
          editingPHC.availableBeds || "",
        testsAvailable:
          editingPHC.testsAvailable || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingPHC, isOpen]);

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
      availableBeds: Number(
        formData.availableBeds
      ),
      testsAvailable: Number(
        formData.testsAvailable
      ),
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            {editingPHC ? t.editPHC : t.addPHC}
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
          className="grid grid-cols-2 gap-4"
        >

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t.phcName}
            className="border rounded-xl p-3"
            required
          />

          <input
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder={t.district}
            className="border rounded-xl p-3"
            required
          />

          <input
            type="number"
            name="availableBeds"
            value={formData.availableBeds}
            onChange={handleChange}
            placeholder={t.availableBeds}
            className="border rounded-xl p-3"
          />

          <input
            type="number"
            name="testsAvailable"
            value={formData.testsAvailable}
            onChange={handleChange}
            placeholder={t.testsAvailable}
            className="border rounded-xl p-3"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-xl p-3 col-span-2"
          >
            <option value="Active">
              {t.active}
            </option>

            <option value="Inactive">
              {t.inactive}
            </option>

          </select>

          <div className="col-span-2 flex justify-end gap-4 mt-4">

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
              {editingPHC
                ? t.updatePHC
                : t.savePHC}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddPHCModal;