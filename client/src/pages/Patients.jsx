import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import PatientTable from "../components/patients/PatientTable";
import PatientStats from "../components/patients/PatientStats";
import AddPatientModal from "../components/patients/AddPatientModal";

import { useLanguage } from "../context/LanguageContext";

import {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from "../services/patientService";

function Patients() {
  const { t } = useLanguage();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    loadPatients();
  }, []);

  async function loadPatients() {
    try {
      setLoading(true);

      const data = await getPatients();

      setPatients(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSavePatient(patientData) {
    try {
      if (editingPatient) {
        await updatePatient(editingPatient.id, patientData);
      } else {
        await addPatient(patientData);
      }

      await loadPatients();

      setEditingPatient(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeletePatient(id) {
    const confirmDelete = window.confirm(
      t.deletePatientConfirm
    );

    if (!confirmDelete) return;

    try {
      await deletePatient(id);

      await loadPatients();
    } catch (error) {
      console.error(error);
    }
  }

  function handleEditPatient(patient) {
    setEditingPatient(patient);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setEditingPatient(null);
    setIsModalOpen(false);
  }

  return (
    <Layout>
      <div className="space-y-6">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              {t.patientsManagement}
            </h1>

            <p className="text-slate-500 mt-2">
              {t.patientsManagementDesc}
            </p>

          </div>

          <button
            onClick={() => {
              setEditingPatient(null);
              setIsModalOpen(true);
            }}
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl font-medium"
          >
            + {t.addPatient}
          </button>

        </div>

        {/* Stats */}

        <PatientStats patients={patients} />

        {/* Table */}

        <PatientTable
          patients={patients}
          loading={loading}
          onEdit={handleEditPatient}
          onDelete={handleDeletePatient}
        />

        {/* Modal */}

        <AddPatientModal
          isOpen={isModalOpen}
          editingPatient={editingPatient}
          onClose={handleCloseModal}
          onSave={handleSavePatient}
        />

      </div>
    </Layout>
  );
}

export default Patients;