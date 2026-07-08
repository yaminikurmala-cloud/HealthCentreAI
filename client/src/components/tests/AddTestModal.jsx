import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const emptyForm = {
  phcName: "",

  bloodPressure: false,
  bloodSugar: false,
  cbc: false,
  malaria: false,
  dengue: false,
  urine: false,
  pregnancy: false,
  ecg: false,
  xray: false,
  ultrasound: false,

  lastAudit: new Date().toISOString().split("T")[0],
};

function AddTestModal({
  isOpen,
  onClose,
  onSave,
  editingTest,
}) {
  const { t } = useLanguage();

  const testFields = [
    { key: "bloodPressure", label: t.bloodPressure },
    { key: "bloodSugar", label: t.bloodSugar },
    { key: "cbc", label: t.cbc },
    { key: "malaria", label: t.malaria },
    { key: "dengue", label: t.dengue },
    { key: "urine", label: t.urine },
    { key: "pregnancy", label: t.pregnancy },
    { key: "ecg", label: t.ecg },
    { key: "xray", label: t.xray },
    { key: "ultrasound", label: t.ultrasound },
  ];

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingTest) {
      setFormData({
        ...emptyForm,
        ...editingTest,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingTest, isOpen]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave(formData);

    setFormData(emptyForm);
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            {editingTest
              ? t.editTestAvailability
              : t.addTestAvailability}
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
          className="space-y-6"
        >

          <input
            name="phcName"
            placeholder={t.phc}
            value={formData.phcName}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />

          <div className="grid grid-cols-2 gap-4">

            {testFields.map((test) => (

              <label
                key={test.key}
                className="flex items-center gap-3 border rounded-xl p-3 hover:bg-slate-50 cursor-pointer"
              >

                <input
                  type="checkbox"
                  name={test.key}
                  checked={formData[test.key]}
                  onChange={handleChange}
                  className="w-5 h-5"
                />

                {test.label}

              </label>

            ))}

          </div>

          <div className="flex justify-end gap-4">

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
              {editingTest ? t.update : t.save}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddTestModal;