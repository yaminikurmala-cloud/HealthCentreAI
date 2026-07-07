import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import PHCStats from "../components/phcs/PHCStats";
import PHCTable from "../components/phcs/PHCTable";
import AddPHCModal from "../components/phcs/AddPHCModal";

import { useLanguage } from "../context/LanguageContext";

import {
  getPHCs,
  addPHC,
  updatePHC,
  deletePHC,
} from "../services/phcService";

function PHCs() {
  const { t } = useLanguage();

  const [phcs, setPHCs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPHC, setEditingPHC] = useState(null);

  useEffect(() => {
    loadPHCs();
  }, []);

  async function loadPHCs() {
    try {
      setLoading(true);

      const data = await getPHCs();

      setPHCs(data);
    } catch (error) {
      console.error("Error loading PHCs:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSavePHC(phcData) {
    try {
      if (editingPHC) {
        await updatePHC(editingPHC.id, phcData);
      } else {
        await addPHC(phcData);
      }

      await loadPHCs();

      setEditingPHC(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving PHC:", error);
    }
  }

  async function handleDeletePHC(id) {
    const confirmDelete = window.confirm(
      t.deletePHCConfirm
    );

    if (!confirmDelete) return;

    try {
      await deletePHC(id);

      await loadPHCs();
    } catch (error) {
      console.error("Error deleting PHC:", error);
    }
  }

  function handleEditPHC(phc) {
    setEditingPHC(phc);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setEditingPHC(null);
    setIsModalOpen(false);
  }

  return (
    <Layout>
      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              {t.phcManagement}
            </h1>

            <p className="text-slate-500 mt-2">
              {t.phcManagementDesc}
            </p>

          </div>

          <button
            onClick={() => {
              setEditingPHC(null);
              setIsModalOpen(true);
            }}
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl font-medium"
          >
            + {t.addPHC}
          </button>

        </div>

        <PHCStats phcs={phcs} />

        <PHCTable
          phcs={phcs}
          loading={loading}
          onEdit={handleEditPHC}
          onDelete={handleDeletePHC}
        />

        <AddPHCModal
          isOpen={isModalOpen}
          editingPHC={editingPHC}
          onClose={handleCloseModal}
          onSave={handleSavePHC}
        />

      </div>
    </Layout>
  );
}

export default PHCs;