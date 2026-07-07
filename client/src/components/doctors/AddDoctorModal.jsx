import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

function AddDoctorModal({
  isOpen,
  onClose,
  onSave,
  editingDoctor,
}) {
  const { t } = useLanguage();

  const emptyForm = {
    name: "",
    specialization: "",
    phcName: "",
    experience: "",
    phone: "",
    status: "Available",
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingDoctor) {
      setFormData({
        name: editingDoctor.name || "",
        specialization: editingDoctor.specialization || "",
        phcName: editingDoctor.phcName || "",
        experience: editingDoctor.experience || "",
        phone: editingDoctor.phone || "",
        status: editingDoctor.status || "Available",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingDoctor, isOpen]);

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
      experience: Number(formData.experience),
    });

    setFormData(emptyForm);
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            {editingDoctor ? t.editDoctor : t.addDoctor}
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
            placeholder={t.doctorName}
            value={formData.name}
            onChange={handleChange}
            className="border rounded-xl p-3"
            required
          />

          <input
            name="specialization"
            placeholder={t.specialization}
            value={formData.specialization}
            onChange={handleChange}
            className="border rounded-xl p-3"
            required
          />

          <input
            name="phcName"
            placeholder={t.phcName}
            value={formData.phcName}
            onChange={handleChange}
            className="border rounded-xl p-3"
            required
          />

          <input
            type="number"
            name="experience"
            placeholder={`${t.experience} (${t.years})`}
            value={formData.experience}
            onChange={handleChange}
            className="border rounded-xl p-3"
            required
          />

          <input
            name="phone"
            placeholder={t.phoneNumber}
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-xl p-3"
          >
            <option>{t.available}</option>
            <option>{t.onLeave}</option>
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
              {editingDoctor
                ? t.updateDoctor
                : t.saveDoctor}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddDoctorModal;