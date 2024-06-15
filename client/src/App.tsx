import './App.css';
import {Route, Routes, BrowserRouter, Link} from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Auth } from './pages/auth';
import { FinancialRecordsProvider } from './contexts/FinancialRecordContext';
import { SignedIn, UserButton } from '@clerk/clerk-react';

function App() {

  return (
  <BrowserRouter>
    <div className='app-container'>
      <div className='navbar'>
        <Link to="/">Dashboard</Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <Routes>
        <Route path="/" element={ 
          <FinancialRecordsProvider>
            <Dashboard/> 
          </FinancialRecordsProvider>} />
        <Route path="/auth" element={<Auth/>} />
      </Routes>
    </div>
  </BrowserRouter>
  )
}

export default App
