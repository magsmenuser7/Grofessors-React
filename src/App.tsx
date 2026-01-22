import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// MAIN PAGES
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Ecosystem from './pages/Ecosystem';
import VentureDetail from './pages/VentureDetail';
import Insights from './pages/Insights';
import Contact from './pages/Contact';
import TDHRetailCanvas from './pages/TDHRetailCanvas';
import BrandAuditPavitraLokesh from './pages/BrandAuditPavitraLokesh';
import TdhRetailStrategyCanvas from './pages/TdhRetailStrategyCanvas';
import India9kGoldJewelleryMarket from './pages/India9kGoldJewelleryMarket';
import StrategicBrandDashboard from './pages/StrategicBrandDashboard';
import NewsletterViewer from './pages/NewsletterViewer';
import TdhGroup from './pages/TdhGroup'
import TenalidoubleHorse from './pages/Tenali-Double-Horse-Brand-Specific-Audit'
import TdhYearlyAnalysis from './pages/TDH-Yearly-Analytics-Meta-LinkedIn'
import TDHPlanOfAction2026 from './pages/TDHPlanOfAction2026'
import TDHConsumerPreferenceAnalysis from './pages/TDHConsumerPreferenceAnalysis'
import TDHBrandsProductsToFocusOn from './pages/TDHBrandsProductsToFocusOn'
import TDHCalendar2026FEB from './pages/TDHCalendar2026FEB'
import TDHPlanOfActionLatest from './pages/TDHPlanOfActionLatest'





// TDH PAGES
import Navigation from './components/tdhecommercepages/Navigation';
import { FooterSection } from './components/tdhecommercepages/FooterSection';
import { HomePage } from './pages/customer/HomePage';
import { ProductsPage } from './pages/customer/ProductsPage';
import { OrderTrackingPage } from './pages/customer/OrderTrackingPage';

// Distributor, Logistics, Admin Pages
import { DistributorDashboard } from './pages/distributor/DistributorDashboard';
import { LogisticsDashboard } from './pages/logistics/LogisticsDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { InventoryManagement } from './pages/admin/InventoryManagement';
import { CustomerSupport } from './pages/admin/CustomerSupport';
import { TaxationManagement } from './pages/admin/TaxationManagement';
import { ChairmanDashboard } from './pages/admin/ChairmanDashboard';
import { ITMonitoring } from './pages/admin/ITMonitoring';

import type { UserRole } from './types';
import { Outlet } from 'react-router-dom';

// ------------------ MAIN LAYOUT ------------------
function MainLayout() {
  return (
    <>
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </>
  );
}

// ------------------ APP MAIN ----------------------
function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [currentPage, setCurrentPage] = useState('home');

  const handleRoleChange = (role: UserRole, page: string) => {
    setCurrentRole(role);
    setCurrentPage(page);
  };

  const renderTdhPage = () => {
    if (currentRole === 'customer') {
      switch (currentPage) {
        case 'home': return <HomePage onNavigate={setCurrentPage} />;
        case 'products': return <ProductsPage />;
        case 'orders':
        case 'profile': return <OrderTrackingPage />;
        default: return <HomePage onNavigate={setCurrentPage} />;
      }
    }

    if (currentRole === 'distributor') return <DistributorDashboard />;
    if (currentRole === 'logistics') return <LogisticsDashboard />;

    if (currentRole === 'admin') {
      switch (currentPage) {
        case 'dashboard': return <AdminDashboard />;
        case 'chairman': return <ChairmanDashboard />;
        case 'inventory': return <InventoryManagement />;
        case 'support': return <CustomerSupport />;
        case 'taxation': return <TaxationManagement />;
        case 'it-monitoring': return <ITMonitoring />;
        default: return <AdminDashboard />;
      }
    }

    return <HomePage onNavigate={setCurrentPage} />;
  };

  return (
    <Router basename={import.meta.env.DEV ? "/Grofessors-React" : "/"}>
      <Routes>

        {/* MAIN PAGE GROUP WITH LAYOUT */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="ecosystem" element={<Ecosystem />} />
          <Route path="ventures/:id" element={<VentureDetail />} />
          <Route path="insights" element={<Insights />} />
          <Route path="contact" element={<Contact />} />
          <Route path="tdh-retail-canvas" element={<TDHRetailCanvas />} />
          <Route path="brand-audit" element={<BrandAuditPavitraLokesh />} />
          <Route path="tdh-retail-strategy-canvas" element={<TdhRetailStrategyCanvas />} />
          <Route path="india-9kt-gold-jewellery-market" element={<India9kGoldJewelleryMarket />} />
          <Route path="strategic-brand-dashboard" element={<StrategicBrandDashboard />} />
          

          

          
        </Route>

        {/* TDH PROTEIN SITE */}
        <Route
          path="/tenali-double-horse/*"
          element={
            <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
              <Navigation
                role={currentRole}
                currentPage={currentPage}
                onNavigate={setCurrentPage}
              />
              <div className="flex-1 pb-8">
                {renderTdhPage()}
              </div>
              <FooterSection
                currentRole={currentRole}
                onRoleChange={handleRoleChange}
              />
            </div>
          }
        />

        <Route path="/:slug" element={<NewsletterViewer />} />
        <Route path="tdh-group-strategy-review" element={<TdhGroup />} />
        <Route path="communication-audit-brand-guidelines-digital-packaging" element={<TenalidoubleHorse />} />
        <Route path="tdh-yearly-analytics-meta-linkedIn" element={<TdhYearlyAnalysis />} />
        <Route path="tdh-plan-Of-Action-2026" element={<TDHPlanOfAction2026 />} />
        <Route path="tdh-consumer-preference-analysis" element={<TDHConsumerPreferenceAnalysis />} />
        <Route path="tdh-brands-products-to-focus-on" element={<TDHBrandsProductsToFocusOn />} />
        <Route path="tdh-calendar-2026-feb" element={<TDHCalendar2026FEB />} />
        <Route path="tdh-plan-Of-action-latest" element={<TDHPlanOfActionLatest />} />


      </Routes>
    </Router>
  );
}

export default App;





// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import Header from './components/layout/Header';
// import Footer from './components/layout/Footer';
// import Home from './pages/Home';
// import About from './pages/About';
// import Ecosystem from './pages/Ecosystem';
// import VentureDetail from './pages/VentureDetail';
// import Insights from './pages/Insights';
// import Contact from './pages/Contact';
// import TdhProteinDashboard from "./pages/TdhProteinDashboard";





// import { useState } from 'react';
// import { Navigation } from './components/tdhecommercepages/Navigation';
// import { FooterSection } from './components/tdhecommercepages/FooterSection';
// import { HomePage } from './pages/customer/HomePage';
// import { ProductsPage } from './pages/customer/ProductsPage';
// import { OrderTrackingPage } from './pages/customer/OrderTrackingPage';
// import { DistributorDashboard } from './pages/distributor/DistributorDashboard';
// import { LogisticsDashboard } from './pages/logistics/LogisticsDashboard';
// import { AdminDashboard } from './pages/admin/AdminDashboard';
// import { InventoryManagement } from './pages/admin/InventoryManagement';
// import { CustomerSupport } from './pages/admin/CustomerSupport';
// import { TaxationManagement } from './pages/admin/TaxationManagement';
// import { ChairmanDashboard } from './pages/admin/ChairmanDashboard';
// import { ITMonitoring } from './pages/admin/ITMonitoring';
// import type { UserRole } from './types';



// function App() {
//   const [currentRole, setCurrentRole] = useState<UserRole>('customer');
//   const [currentPage, setCurrentPage] = useState('home');





//   const renderPage = () => {
//     if (currentRole === 'customer') {
//       switch (currentPage) {
//         case 'home':
//           return <HomePage onNavigate={setCurrentPage} />;
//         case 'products':
//           return <ProductsPage />;
//         case 'orders':
//           return <OrderTrackingPage />;
//         case 'profile':
//           return <OrderTrackingPage />;
//         default:
//           return <HomePage onNavigate={setCurrentPage} />;
//       }
//     }

//     if (currentRole === 'distributor') {
//       switch (currentPage) {
//         case 'dashboard':
//           return <DistributorDashboard />;
//         case 'orders':
//           return <DistributorDashboard />;
//         case 'inventory':
//           return <DistributorDashboard />;
//         case 'performance':
//           return <DistributorDashboard />;
//         default:
//           return <DistributorDashboard />;
//       }
//     }

//     if (currentRole === 'logistics') {
//       switch (currentPage) {
//         case 'dashboard':
//           return <LogisticsDashboard />;
//         case 'pickups':
//           return <LogisticsDashboard />;
//         case 'deliveries':
//           return <LogisticsDashboard />;
//         case 'performance':
//           return <LogisticsDashboard />;
//         default:
//           return <LogisticsDashboard />;
//       }
//     }

//     if (currentRole === 'admin') {
//       switch (currentPage) {
//         case 'dashboard':
//           return <AdminDashboard />;
//         case 'chairman':
//           return <ChairmanDashboard />;
//         case 'inventory':
//           return <InventoryManagement />;
//         case 'support':
//           return <CustomerSupport />;
//         case 'taxation':
//           return <TaxationManagement />;
//         case 'it-monitoring':
//           return <ITMonitoring />;
//         case 'distributors':
//           return <AdminDashboard />;
//         case 'logistics':
//           return <AdminDashboard />;
//         case 'settings':
//           return <AdminDashboard />;
//         default:
//           return <AdminDashboard />;
//       }
//     }

//     return <HomePage onNavigate={setCurrentPage} />;
//   };

//   const handleRoleChange = (role: UserRole, page: string) => {
//     setCurrentRole(role);
//     setCurrentPage(page);
//   };



//   return (

//      <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
//       <Navigation role={currentRole} currentPage={currentPage} onNavigate={setCurrentPage} />

//       <div className="flex-1 pb-8">{renderPage()}</div>

//       <Footer currentRole={currentRole} onRoleChange={handleRoleChange} />
//     </div>
//   );






//     <Router basename={import.meta.env.DEV ? "/Grofessors-React" : "/"}>

//       <div className="App">
//         <Header />
//         <motion.main
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/ecosystem" element={<Ecosystem />} />
//             <Route path="/ventures/:id" element={<VentureDetail />} />
//             <Route path="/insights" element={<Insights />} />
//             <Route path="/contact" element={<Contact />} />
//              <Route path="/tdh-protein-market-opportunity" element={<TdhProteinDashboard />} />
//           </Routes>
//         </motion.main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;





