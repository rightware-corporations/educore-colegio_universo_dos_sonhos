import { useState } from "react";
import { Navigate, NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftRight, Bell, ChevronLeft, ChevronRight, LogOut, Menu, RotateCcw, X } from "lucide-react";
import { Brand } from "./Brand";
import { ROLE_DEFS, isRole } from "../config/roles";
import { useDemo } from "../state/DemoProvider";

export function RoleShell(){
 const {role}=useParams();const navigate=useNavigate();const location=useLocation();
 const {role:activeRole,leave,state,reset}=useDemo();
 const [menu,setMenu]=useState(false);const [collapsed,setCollapsed]=useState(false);
 if(!isRole(role))return <Navigate to="/login" replace/>;
 if(!activeRole||activeRole!==role)return <Navigate to="/login" replace/>;
 const cfg=ROLE_DEFS[role];
 const section=location.pathname.split("/").at(-1)||"dashboard";
 const selected=cfg.items.find(x=>x.path===section);
 const leavePortal=()=>{leave();navigate("/login",{replace:true})};
 return <div className="min-h-screen bg-[#F5F7F8] text-[#102231]">
  {menu&&<button aria-label="Fechar menu lateral" className="fixed inset-0 z-30 bg-[#071A2A]/60 lg:hidden" onClick={()=>setMenu(false)}/>}
  <aside className={"fixed inset-y-0 left-0 z-40 flex flex-col overflow-y-auto bg-[#071A2A] text-white transition-all duration-200 "+(menu?"translate-x-0":"-translate-x-full")+" lg:translate-x-0 "+(collapsed?"w-[88px]":"w-[260px]")}>
   <div className="flex min-h-[92px] items-center justify-between border-b border-white/10 px-5">
    {!collapsed&&<Brand light/>}
    {collapsed&&<Brand compact light/>}
    <button className="p-2 text-white/70 lg:hidden" onClick={()=>setMenu(false)} aria-label="Fechar menu"><X size={20}/></button>
   </div>
   <div className="mx-4 mt-6 rounded-xl bg-white/[.07] p-3">
    <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#F18136]">{collapsed?"Demo":"Demonstração COLUS"}</p>
    {!collapsed&&<p className="mt-1 text-[11px] leading-5 text-white/55">Ambiente de avaliação · dados fictícios</p>}
   </div>
   <nav aria-label={"Navegação "+cfg.short} className="mt-7 flex flex-1 flex-col gap-1 px-3">
    {!collapsed&&<p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/40">Área de trabalho</p>}
    {cfg.items.map((item,i)=><NavLink key={item.path} to={"/app/"+role+"/"+item.path} onClick={()=>setMenu(false)}
      className={({isActive})=>"flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition "+(isActive?"bg-[#F18136] text-[#071A2A]":"text-white/70 hover:bg-white/10 hover:text-white")}
      title={item.label}>
      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-xs font-extrabold">{i===0?"◉":String(i).padStart(2,"0")}</span>
      {!collapsed&&<span>{item.label}</span>}
     </NavLink>)}
   </nav>
   <div className="border-t border-white/10 px-3 py-4">
    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs font-bold text-white/70 hover:bg-white/10" onClick={leavePortal}>
     <LogOut size={18}/>{!collapsed&&"Trocar perfil"}
    </button>
    <button className="mt-1 hidden w-full items-center gap-3 rounded-xl px-3 py-2 text-xs text-white/50 hover:bg-white/10 lg:flex" onClick={()=>setCollapsed(v=>!v)}>
     {collapsed?<ChevronRight size={18}/>:<ChevronLeft size={18}/>}
     {!collapsed&&"Recolher"}
    </button>
   </div>
  </aside>
  <div className={"min-h-screen transition-[padding] duration-200 "+(collapsed?"lg:pl-[88px]":"lg:pl-[260px]")}>
   <header className="sticky top-0 z-20 flex min-h-[78px] items-center justify-between gap-3 border-b border-[#071A2A]/10 bg-white/95 px-5 backdrop-blur-xl sm:px-8">
    <div className="flex min-w-0 items-center gap-3">
     <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F7F8] text-[#071A2A] lg:hidden" onClick={()=>setMenu(true)} aria-label="Abrir menu"><Menu size={20}/></button>
     <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#65727C]">COLUS / {cfg.short}</p>
      <p className="mt-1 truncate text-[15px] font-extrabold text-[#071A2A]">{selected?.label||"Portal"}</p></div>
    </div>
    <div className="flex items-center gap-2">
     {state.events.filter(e=>e.kind==="attendance"||e.kind==="message").length>0&&role==="guardian"&&<span className="flex items-center gap-1 rounded-full bg-[#F18136]/15 px-3 py-2 text-xs font-bold text-[#9E5018]"><Bell size={14}/> {state.events.filter(e=>e.kind==="attendance"||e.kind==="message").length}</span>}
     <span className="hidden rounded-full bg-[#0C5898]/10 px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-[#0C5898] sm:inline">Modo demo</span>
     <button title="Reiniciar dados da demonstração" aria-label="Reiniciar dados da demonstração" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#071A2A]/10 text-[#65727C] hover:bg-[#FFF8EF]" onClick={reset}><RotateCcw size={17}/></button>
     <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#071A2A] text-white" onClick={leavePortal} aria-label="Trocar perfil"><ArrowLeftRight size={18}/></button>
    </div>
   </header>
   <main className="mx-auto min-h-[calc(100vh-130px)] max-w-[1440px] px-5 py-8 pb-28 sm:px-8 lg:pb-10"><Outlet/></main>
   <footer className="hidden border-t border-[#071A2A]/10 px-8 py-5 text-[11px] text-[#65727C] lg:flex lg:justify-between">
    <span>© 2026 Colégio Universo dos Sonhos · Demonstração</span>
    <span>Powered by EduCore · A RIGHTWARE Product</span>
   </footer>
  </div>
  <nav className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-around border-t border-[#071A2A]/10 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden" aria-label="Navegação rápida mobile">
   {cfg.items.slice(0,4).map((item,i)=><NavLink key={item.path} to={"/app/"+role+"/"+item.path} className={({isActive})=>"flex min-h-[62px] min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg px-1 text-[10px] font-bold "+(isActive?"text-[#0C5898]":"text-[#65727C]")}>
    <span className="text-base">{i===0?"◉":String(i).padStart(2,"0")}</span><span className="max-w-full truncate">{item.label}</span>
   </NavLink>)}
  </nav>
 </div>;
}
