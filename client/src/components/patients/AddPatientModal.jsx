import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

function AddPatientModal({
  isOpen,
  onClose,
  onSave,
  editingPatient,
}) {
  const { t } = useLanguage();

  const emptyForm = {
    fullName: "",
    age: "",
    gender: "Male",
    phone: "",
    village: "",
    phcName: "",
    diagnosis: "",
    status: "Stable",
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingPatient) {
      setFormData({
        fullName: editingPatient.fullName || "",
        age: editingPatient.age || "",
        gender: editingPatient.gender || "Male",
        phone: editingPatient.phone || "",
        village: editingPatient.village || "",
        phcName: editingPatient.phcName || editingPatient.phc || "",
        diagnosis: editingPatient.diagnosis || "",
        status: editingPatient.status || "Stable",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingPatient, isOpen]);

  if (!isOpen) return null;

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave(formData);

    setFormData(emptyForm);
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            {editingPatient
              ? t.editPatient
              : t.addNewPatient}
          </h2>

          <button
            onClick={onClose}
            className="hover:bg-slate-100 rounded-lg p-2"
          >
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4"
        >

          <input
            name="fullName"
            placeholder={t.fullName}
            value={formData.fullName}
            onChange={handleChange}
            className="border rounded-xl p-3"
            required
          />

          <input
            type="number"
            name="age"
            placeholder={t.age}
            value={formData.age}
            onChange={handleChange}
            className="border rounded-xl p-3"
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border rounded-xl p-3"
          >
            <option>{t.male}</option>
            <option>{t.female}</option>
          </select>

          <input
            name="phone"
            placeholder={t.phoneNumber}
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="village"
            placeholder={t.village}
            value={formData.village}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="phcName"
            placeholder={t.phcName}
            value={formData.phcName}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="diagnosis"
            placeholder={t.diagnosis}
            value={formData.diagnosis}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-xl p-3"
          >
            <option>{t.stable}</option>
            <option>{t.critical}</option>
          </select>

          <div className="col-span-2 flex justify-end gap-4 mt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border"
            >
              {t.cancel}
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white"
            >
              {editingPatient
                ? t.updatePatient
                : t.savePatient}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddPatientModal;