import React, { useState, createContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
export const ThemeContext = createContext();
import "react-toastify/dist/ReactToastify.css";
import MangeUser from "./components/MangeUser";
function App() {
  const [activeMenu, setActiveMenu] = useState(true);
  const [DarkMode, setDarkMode] = useState(false);
  return (
    <div className="App">
      <ToastContainer />
      <ThemeContext.Provider
        value={{
          activeMenu,
          setActiveMenu,
          DarkMode,
          setDarkMode,
        }}
      >
        <Router>
          <Routes key={document.pathname}>
            <>
              <Route path="/" element={<MangeUser />} />
             
            </>
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
