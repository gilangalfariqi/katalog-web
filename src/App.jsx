import React from 'react';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { CatalogPage } from './pages/CatalogPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/30 to-background text-text selection:bg-accent/30 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <CatalogPage />
      </div>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
