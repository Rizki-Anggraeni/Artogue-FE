import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import './artogue-shared.css'
import { Dashboard } from './pages/Dashboard'
import { TambahAset } from './pages/TambahAset'
import { KelolaAset } from './pages/KelolaAset'
import { Landing } from './pages/Landing'

function App() {
  return (
    <Router>
    <div className="bg-background dark:bg-dark-bg text-on-surface dark:text-white relative z-0 overflow-x-clip min-h-screen transition-colors duration-300">
      
      {/* Background dekoratif bawaan artogue-shared.css */}
      <div className="artogue-bg" aria-hidden="true">
        <div className="artogue-bg__grid"></div>
        <div className="artogue-bg__blob artogue-bg__blob--1"></div>
        <div className="artogue-bg__blob artogue-bg__blob--2"></div>
        <div className="artogue-bg__blob artogue-bg__blob--3"></div>
        
        {/* Background Icons (Requires Material Symbols Outlined font) */}
        <span className="artogue-bg__icon artogue-bg__icon--1 material-symbols-outlined">savings</span>
        <span className="artogue-bg__icon artogue-bg__icon--2 material-symbols-outlined">trending_up</span>
        <span className="artogue-bg__icon artogue-bg__icon--3 material-symbols-outlined">account_balance_wallet</span>
        <span className="artogue-bg__icon artogue-bg__icon--4 material-symbols-outlined">diamond</span>
        <span className="artogue-bg__icon artogue-bg__icon--5 material-symbols-outlined">payments</span>
        <span className="artogue-bg__icon artogue-bg__icon--6 material-symbols-outlined">monitoring</span>
        
        <span className="artogue-bg__sparkle artogue-bg__sparkle--1"></span>
        <span className="artogue-bg__sparkle artogue-bg__sparkle--2"></span>
        <span className="artogue-bg__sparkle artogue-bg__sparkle--3"></span>
        <span className="artogue-bg__sparkle artogue-bg__sparkle--4"></span>
      </div>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tambah-aset" element={<TambahAset />} />
        <Route path="/kelola-aset" element={<KelolaAset />} />
      </Routes>
  </div>
  </Router>
  )
}

export default App
