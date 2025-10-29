import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 mt-16 p-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 min-h-[calc(100vh-10rem)]">
            {children}
          </div>
        </main>
      </div>
      <div className="ml-64">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
