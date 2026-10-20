import { Navigate, Route, Routes } from "react-router-dom";
import { SplashPage, WelcomePage, DemoLoginPage } from "./pages/EntryPages";
import { RoleShell } from "./components/RoleShell";
import { Workspace } from "./pages/Workspace";
export default function App(){
 return <Routes>
  <Route path="/" element={<SplashPage/>}/>
  <Route path="/welcome" element={<WelcomePage/>}/>
  <Route path="/login" element={<DemoLoginPage/>}/>
  <Route path="/app/:role" element={<RoleShell/>}>
   <Route index element={<Navigate to="dashboard" replace/>}/>
   <Route path=":section" element={<Workspace/>}/>
  </Route>
  <Route path="*" element={<Navigate to="/welcome" replace/>}/>
 </Routes>;
}
