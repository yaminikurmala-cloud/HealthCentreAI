import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-6 space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;