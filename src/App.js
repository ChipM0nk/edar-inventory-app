// @ts-ignore

import NavBar from 'Components/NavBar/navBar';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Sidenav from './Components/SideNav/sideNav';
import Category from './Pages/Category/Category';
import InvoiceForm from './Pages/InvoiceForm';
import Invoices from './Pages/Invoices';
import StockInForm from './Pages/StockInForm';
import Stockins from './Pages/StockIns';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="flex-box">
        <Sidenav />
        <main>
          <Routes>
            <Route path="/" element={<InvoiceForm />} />
            <Route path="/stockinform" element={<StockInForm />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/stockins" element={<Stockins />} />
            <Route path="/category" element={<Category />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;

// import React from 'react';
// import './App.css';
// import Sidebar from './Components/SideMenu/Sidebar';
// import { Route, Routes } from 'react-router-dom';
// import Overview from './Pages/Overview';
// import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './Pages/Reports';

// import InvoiceForm from 'Pages/InvoiceForm';

// function App() {
//   return (
//     <div className="App">
//       <Sidebar />
//       <Routes>
//         <Route path="/overview" exact component={Overview} />
//         <Route path="/reports" exact component={Reports} />
//         <Route path="/reports/reports1" exact component={ReportsOne} />
//         <Route path="/reports/reports2" exact component={ReportsTwo} />
//         <Route path="/reports/reports3" exact component={ReportsThree} />
//         <Route path="/team" element={<InvoiceForm />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
