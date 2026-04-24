import React from 'react';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { CatalogPage } from './pages/CatalogPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-black text-slate-100 selection:bg-indigo-500/30 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <CatalogPage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
