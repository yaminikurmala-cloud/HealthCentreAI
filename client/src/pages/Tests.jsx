import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import TestStats from "../components/tests/TestStats";
import TestTable from "../components/tests/TestTable";
import AddTestModal from "../components/tests/AddTestModal";

import { useLanguage } from "../context/LanguageContext";

import {
  getTests,
  addTest,
  updateTest,
  deleteTest,
} from "../services/testService";

function Tests() {
  const { t } = useLanguage();

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null);

  useEffect(() => {
    loadTests();
  }, []);

  async function loadTests() {
    try {
      setLoading(true);

      const data = await getTests();

      setTests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(testData) {
    try {
      if (editingTest) {
        await updateTest(editingTest.id, testData);
      } else {
        await addTest(testData);
      }

      await loadTests();

      setEditingTest(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      t.deleteTestConfirm
    );

    if (!confirmDelete) return;

    await deleteTest(id);

    await loadTests();
  }

  function handleEdit(test) {
    setEditingTest(test);
    setIsModalOpen(true);
  }

  return (
    <Layout>
      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              {t.testsManagement}
            </h1>

            <p className="text-slate-500 mt-2">
              {t.testsManagementDesc}
            </p>

          </div>

          <button
            onClick={() => {
              setEditingTest(null);
              setIsModalOpen(true);
            }}
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl"
          >
            + {t.addTests}
          </button>

        </div>

        <TestStats tests={tests} />

        <TestTable
          tests={tests}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <AddTestModal
          isOpen={isModalOpen}
          editingTest={editingTest}
          onClose={() => {
            setEditingTest(null);
            setIsModalOpen(false);
          }}
          onSave={handleSave}
        />

      </div>
    </Layout>
  );
}

export default Tests;