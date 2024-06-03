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
import MainExam from "./components/examsComponents/mainExam/MainExam";
import Learning from "./pages/learning/Learning";
function App() {
  const UUU = useSelector((state) => state.authReducer.authData);

  return (
    <div className="App">
      <Router>
        <SideScreen>
          <Routes>
            {/* <Route
              path="/"
              element={UUU ? <Dashboard /> : <Navigate to="/registor" />}
            /> */}

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
              element={UUU ? <Exams /> : <Navigate to="/registor" />}
            />
            <Route
              path="/main-exam"
              element={UUU ? <MainExam /> : <Navigate to="/registor" />}
            />
            <Route
              path="/learning"
              element={UUU ? <Learning /> : <Navigate to="/registor" />}
            />
          </Routes>
        </SideScreen>
      </Router>
    </div>
  );
}

export default App;
