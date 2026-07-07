import { Search, Plus } from "lucide-react";

function PatientToolbar({
  search,
  setSearch,
  onAdd,
}) {
  return (
    <div className="flex items-center justify-between">

      <div className="relative w-96">

        <Search
          className="absolute left-4 top-3 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl py-3 pl-11 pr-4 bg-white"
        />

      </div>

      <button
        onClick={onAdd}
        className="bg-teal-600 hover:bg-teal-700
        text-white px-5 py-3 rounded-xl
        flex items-center gap-2"
      >

        <Plus size={18} />

        Add Patient

      </button>

    </div>
  );
}

export default PatientToolbar;