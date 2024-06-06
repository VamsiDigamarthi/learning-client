import "./App.css";
import LoginScreen from "./pages/login/LoginScreen";
import SideScreen from "./pages/home/SideScreen";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Profile from "./pages/profile/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import Quize from "./pages/quize/Quize";
import { useSelector } from "react-redux";
import Exams from "./pages/exams/Exams";
import Learning from "./pages/learning/Learning";
import { useState } from "react";
import PDF from "./components/pdfComponents/pdf/PDF";
import Certificate from "./pages/certificate/Certificate";
function App() {
  const UUU = useSelector((state) => state.authReducer.authData);

  const [startMainExamNotDisplaySideBar, setStartMainExamNotDisplaySideBar] =
    useState(false);

  return (
    <div className="App">
      <Router>
        <SideScreen
          startMainExamNotDisplaySideBar={startMainExamNotDisplaySideBar}
        >
          <Routes>
            <Route
              path="/"
              element={
                UUU ? (
                  UUU.role === 1 ? (
                    <Dashboard />
                  ) : UUU.role === 2 ? (
                    <Dashboard />
                  ) : (
                    <Navigate to="/exam" />
                  )
                ) : (
                  <Navigate to="/registor" />
                )
              }
            />
            <Route
              path="/registor"
              element={UUU ? <Navigate to="/" /> : <LoginScreen />}
            />
            <Route
              path="/profile"
              element={UUU ? <Profile /> : <Navigate to="/registor" />}
            />
            <Route
              path="/quize"
              element={UUU ? <Quize /> : <Navigate to="/registor" />}
            />
            <Route
              path="/exam"
              element={
                UUU ? (
                  <Exams
                    setStartMainExamNotDisplaySideBar={
                      setStartMainExamNotDisplaySideBar
                    }
                  />
                ) : (
                  <Navigate to="/registor" />
                )
              }
            />
            <Route
              path="/learning"
              element={UUU ? <Learning /> : <Navigate to="/registor" />}
            />
            <Route
              path="/pdf"
              element={UUU ? <PDF /> : <Navigate to="/registor" />}
            />

            <Route
              path="/certificate"
              element={UUU ? <Certificate /> : <Navigate to="/registor" />}
            />
          </Routes>
        </SideScreen>
      </Router>
    </div>
  );
}

export default App;
