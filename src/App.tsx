import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./components/common";
import { PrivateRouteAuth } from "./components/common/PrivateRouteAuth";
import { Admin } from "./components/layouts";
import LoginPage from "./features/auth/pages/LoginPage";
import { Dashboard } from "./features/dashboard";
import { Students } from "./features/students";
import AddEditPage from "./features/students/pages/AddEditPage";
import ListPage from "./features/students/pages/ListPage";
function App() {
  return (
    <div className="">
      <CssBaseline />
      <Routes>
        <Route element={<PrivateRouteAuth />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<Admin />}>
            <Route path="" element={<h1>Main</h1>} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<Students />}>
              <Route path="" element={<ListPage />} />
              <Route path="add" element={<AddEditPage />} />
              <Route path=":studentId" element={<AddEditPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
