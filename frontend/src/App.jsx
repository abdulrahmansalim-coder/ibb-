import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/index';        // Halaman Landing (sebelumnya)
import Register from './pages/register';  // Halaman Register baru
import Login from './pages/Login';
import SubLabAlat from './pages/sub_lab_alat';
import SubLabLab from './pages/sub_lab_lab';
import LogbookAlatResearcher from './pages/logbook_alat_researcher';
import LogbookLabResearcher from './pages/logbook_lab_researcher';
import FinalLogbookAlatResearcher from './pages/final_logbook_alat_researcher';
import FinalLogbookLabResearcher from './pages/final_logbook_lab_researcher';

//admin//
import AdminCatatanLabKepalaLab from './pages/admin_catatan_lab_kepala_lab';
import AdminCatatanLabLaboran from './pages/admin_catatan_lab_laboran';
import AdminCatatanAlatKepalaLab from './pages/admin_catatan_alat_kepala_lab';
import AdminCatatanAlatLaboran from './pages/admin_catatan_alat_laboran';

import AdminParafLabKepalaLab from './pages/admin_paraf_lab_kepala_lab';
import AdminParafLabLaboran from './pages/admin_paraf_lab_laboran'; 
import AdminParafAlatKepalaLab from './pages/admin_paraf_alat_kepala_lab';  
import AdminParafAlatLaboran from './pages/admin_paraf_alat_laboran';

import AdminLabLogbookLaboran from "./pages/admin_lab_logbook_laboran";
import AdminLabLogbookKepalaLab from "./pages/admin_lab_logbook_kepala_lab";

import AdminAlatLogbookLaboran from './pages/admin_alat_logbook_laboran';
import AdminAlatLogbookKepalaLab from './pages/admin_alat_logbook_kepala_lab'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>

        //researcher//
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Navigate to="/login" replace />} />
        <Route path="/sub-lab-alat" element={<SubLabAlat />} />
        <Route path="/sub-lab-lab" element={<SubLabLab />} />
        <Route path="/logbook_alat_researcher" element={<LogbookAlatResearcher />} />
        <Route path="/logbook_lab_researcher" element={<LogbookLabResearcher />} />
        <Route path="/final_logbook_alat_researcher" element={<FinalLogbookAlatResearcher />} />
        <Route path="/final_logbook_lab_researcher" element={<FinalLogbookLabResearcher />} />

        //admin//
        <Route path="/admin/catatan-lab-kepala-lab" element={<AdminCatatanLabKepalaLab />} />
        <Route path="/admin/catatan-alat-kepala-lab" element={<AdminCatatanAlatKepalaLab />} />
        <Route path="/admin/catatan-alat-laboran" element={<AdminCatatanAlatLaboran />} />
        <Route path="/admin/catatan-lab-laboran" element={<AdminCatatanLabLaboran />} />

        <Route path="/admin/paraf-lab-kepala-lab" element={<AdminParafLabKepalaLab />} />
        <Route path="/admin/paraf-lab-laboran" element={<AdminParafLabLaboran />} />
        <Route path="/admin/paraf-alat-kepala-lab" element={<AdminParafAlatKepalaLab />} />  
        <Route path="/admin/paraf-alat-laboran" element={<AdminParafAlatLaboran />} /> 

        <Route path="/admin/lab-logbook-kepala-lab" element={<AdminLabLogbookKepalaLab />} />
        <Route path="/admin/lab-logbook-laboran" element={<AdminLabLogbookLaboran />} />

         <Route path="/admin/alat-logbook-laboran" element={<AdminAlatLogbookLaboran />} />
         <Route path="/admin/alat-logbook-kepala-lab" element={<AdminAlatLogbookKepalaLab />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;





