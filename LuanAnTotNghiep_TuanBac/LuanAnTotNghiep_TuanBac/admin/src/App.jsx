// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/Header/Header.jsx";
// import SideBar from "./components/Content/SideBar/SideBar.jsx";
// import Content from "./components/Content/Content.jsx";
// import TripDetail from "./components/Content/Data/TripId.jsx";
// import styles from "./App.module.css";

// const App = () => {
//   const [selectedItem] = useState("notification-management");

//   return (
//     <Router>
//       <div className={styles.appContainer}>
//         <Header />
//         <div className={styles.mainContainer}>
//           <Routes>
//             <Route path="/" element={<Content selectedItem={selectedItem} />} />
//             <Route path="/trip/:tripId" element={<TripDetail />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Content/Data/LoginManagerment/Login";
import Dasboard from "./components/Dasboard";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Dasboard" element={<Dasboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


