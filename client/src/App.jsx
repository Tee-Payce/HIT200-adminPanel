import {useMode,  ColorModeContext} from './theme.js'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Topbar } from "./screens/global/Topbar";
import {Layout} from "./screens/global/Layout"
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { Dashboard } from './screens/Dashboard';
// import { Team } from './screens/Team';
import { Customers } from './screens/Customers';
import { Meals } from './screens/Meals';
 import { Transactions } from './screens/Transactions';
import { Overview } from './screens/Overview';
import { Monthly } from './screens/Monthly';
import { Breakdown } from './screens/Breakdown';

import Sidebarr from "./screens/global/Sidebarr";
import { Daily } from "./screens/Daily";
import { Admin } from "./screens/Admin";


function App() {
  const [theme, colorMode] = useMode()
  return (
    
    
    <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
    <div className="app">
      <Sidebarr/>
  <main className='content'>
      <Topbar/>
  <Routes>
    
    
    <Route path="/" element={<Navigate to={"/dashboard"} replace/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/meals" element={<Meals/>}/>
          <Route path="/customers" element={<Customers/>}/>
          <Route path="/transactions" element={<Transactions/>}/>
          <Route path="/overview" element={<Overview/>}/>
          <Route path="/daily" element={<Daily/>}/>
          <Route path="/monthly" element={<Monthly/>}/>
          <Route path="/breakdown" element={<Breakdown/>}/>
           <Route path="/admin" element={<Admin/>}/>
         
        

  </Routes>
 
  
  </main>
     </div>
     </ThemeProvider>
    </ColorModeContext.Provider>
    
  )
}

export default App
