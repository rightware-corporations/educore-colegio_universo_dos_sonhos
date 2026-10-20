import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LandingFoundationPage } from "@/pages/LandingFoundationPage";
const PublicBookingPage=lazy(()=>import("@/pages/PublicBookingPage").then(module=>({default:module.PublicBookingPage})));
import { LoginFoundationPage } from "@/pages/LoginFoundationPage";
import { RoleWorkspacePage } from "@/pages/RoleWorkspacePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingFoundationPage />} />
      <Route path="/agendar" element={<Suspense fallback={<main className="min-h-screen bg-colus-paper px-6 py-12 text-colus-ink">A preparar o agendamento...</main>}><PublicBookingPage /></Suspense>} />
      <Route path="/login" element={<LoginFoundationPage />} />
      <Route path="/app/:role/*" element={<RoleWorkspacePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
