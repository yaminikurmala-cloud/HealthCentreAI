import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import DoctorStats from "../components/doctors/DoctorStats";
import DoctorTable from "../components/doctors/DoctorTable";
import AddDoctorModal from "../components/doctors/AddDoctorModal";

import { useLanguage } from "../context/LanguageContext";

import {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} from "../services/doctorService";

function Doctors() {
  const { t } = useLanguage();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    try {
      setLoading(true);

      const data = await getDoctors();

      setDoctors(data);
    } catch (error) {
      console.error("Error loading doctors:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveDoctor(doctorData) {
    try {
      if (editingDoctor) {
        await updateDoctor(editingDoctor.id, doctorData);
      } else {
        await addDoctor(doctorData);
      }

      await loadDoctors();

      setEditingDoctor(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  }

  async function handleDeleteDoctor(id) {
    const confirmDelete = window.confirm(
      t.deleteDoctorConfirm
    );

    if (!confirmDelete) return;

    try {
      await deleteDoctor(id);

      await loadDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  }

  function handleEditDoctor(doctor) {
    setEditingDoctor(doctor);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setEditingDoctor(null);
    setIsModalOpen(false);
  }

  return (
    <Layout>
      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              {t.doctorsManagement}
            </h1>

            <p className="text-slate-500 mt-2">
              {t.doctorsManagementDesc}
            </p>

          </div>

          <button
            onClick={() => {
              setEditingDoctor(null);
              setIsModalOpen(true);
            }}
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl font-medium"
          >
            + {t.addDoctor}
          </button>

        </div>

        <DoctorStats doctors={doctors} />

        <DoctorTable
          doctors={doctors}
          loading={loading}
          onEdit={handleEditDoctor}
          onDelete={handleDeleteDoctor}
        />

        <AddDoctorModal
          isOpen={isModalOpen}
          editingDoctor={editingDoctor}
          onClose={handleCloseModal}
          onSave={handleSaveDoctor}
        />

      </div>
    </Layout>
  );
}

export default Doctors;