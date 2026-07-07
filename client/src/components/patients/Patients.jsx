import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import PatientStats from "../components/patients/PatientStats";
import PatientToolbar from "../components/patients/PatientToolbar";
import PatientTable from "../components/patients/PatientTable";
import AddPatientModal from "../components/patients/AddPatientModal";

import {
  getPatients,
  addPatient,
} from "../services/patientService";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadPatients();
  }, []);

  async function loadPatients() {
    try {
      setLoading(true);

      const data = await getPatients();

      setPatients(data);
    } catch (error) {
      console.error("Error loading patients:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddPatient(patientData) {
    try {
      await addPatient(patientData);

      await loadPatients();

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  }

  const filteredPatients = patients.filter((patient) => {
    const searchText = search.toLowerCase();

    return (
      patient.fullName?.toLowerCase().includes(searchText) ||
      patient.phone?.toLowerCase().includes(searchText) ||
      patient.village?.toLowerCase().includes(searchText) ||
      patient.diagnosis?.toLowerCase().includes(searchText)
    );
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-red-500 text-white p-4 rounded-xl text-xl">
  TEST - If you can see this, Patients.jsx is updating correctly.
</div>

        {/* Page Heading */}

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Patients Management
          </h1>

          <p className="text-slate-500 mt-2">
            View, search and manage all registered patients.
          </p>
        </div>

        {/* Statistics */}

        <PatientStats patients={patients} />

        {/* Toolbar */}

        <PatientToolbar
          search={search}
          setSearch={setSearch}
          onAdd={() => setIsModalOpen(true)}
        />

        {/* Table */}

        <PatientTable
          patients={filteredPatients}
          loading={loading}
        />

        {/* Modal */}

        <AddPatientModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddPatient}
        />

      </div>
    </Layout>
  );
}

export default Patients;