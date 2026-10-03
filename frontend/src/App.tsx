import { Navigate, Route, Routes } from "react-router-dom";
import { LandingFoundationPage } from "@/pages/LandingFoundationPage";
import { LoginFoundationPage } from "@/pages/LoginFoundationPage";
import { RoleWorkspacePage } from "@/pages/RoleWorkspacePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingFoundationPage />} />
      <Route path="/login" element={<LoginFoundationPage />} />
      <Route path="/app/:role/*" element={<RoleWorkspacePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
