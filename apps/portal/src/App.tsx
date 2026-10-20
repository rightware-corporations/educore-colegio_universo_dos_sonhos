import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SplashPage, WelcomePage, DemoLoginPage } from "./pages/EntryPages";
import { RoleShell } from "./components/RoleShell";
import { Workspace } from "./pages/Workspace";
function ScrollRestoration(){
 const {pathname}=useLocation();
 useEffect(()=>{window.scrollTo({top:0,left:0,behavior:"instant"});},[pathname]);
 return null;
}
export default function App(){
 return <><ScrollRestoration/><Routes>
  <Route path="/" element={<SplashPage/>}/>
  <Route path="/welcome" element={<WelcomePage/>}/>
  <Route path="/login" element={<DemoLoginPage/>}/>
  <Route path="/app/:role" element={<RoleShell/>}>
   <Route index element={<Navigate to="dashboard" replace/>}/>
   <Route path=":section" element={<Workspace/>}/>
  </Route>
  <Route path="*" element={<Navigate to="/welcome" replace/>}/>
 </Routes></>;
}
