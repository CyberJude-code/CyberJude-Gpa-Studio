import { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';

function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="md:pl-72">
        <Topbar setOpen={setOpen} />
        <main className="px-4 pb-10 pt-6 md:px-8 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
