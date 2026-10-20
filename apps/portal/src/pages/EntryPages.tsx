import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, ShieldCheck, GraduationCap, Users, BookOpen, Wallet, Sparkles } from "lucide-react";
import { Brand } from "../components/Brand";
import { ROLES, ROLE_DEFS, type Role } from "../config/roles";
import { useDemo } from "../state/DemoProvider";

export function SplashPage(){
 const navigate=useNavigate();
 useEffect(()=>{
  const delay=window.matchMedia("(prefers-reduced-motion: reduce)").matches?200:1450;
  const timer=window.setTimeout(()=>navigate("/welcome",{replace:true}),delay);
  return ()=>window.clearTimeout(timer);
 },[navigate]);
 return <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#071A2A] px-5 text-white">
  <div className="pointer-events-none absolute -left-32 top-0 h-[36rem] w-[36rem] rounded-full bg-[#0C5898]/20 blur-[120px]"/>
  <div className="pointer-events-none absolute -right-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#F18136]/10 blur-[100px]"/>
  <div className="splash-logo relative flex flex-col items-center gap-7">
   <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white p-3 shadow-[0_25px_90px_rgba(0,0,0,.3)] sm:h-36 sm:w-36">
    <img src="/assets/colus-logo.jpg" alt="COLUS" className="h-full w-full object-contain"/>
   </div>
   <div className="text-center"><p className="text-xs font-extrabold uppercase tracking-[.35em] text-[#F18136]">Portal Escolar</p>
   <h1 className="mt-3 font-display text-5xl font-medium tracking-tight sm:text-7xl">Universo dos Sonhos</h1>
   <p className="mt-3 text-sm text-white/60">Powered by EduCore · A RIGHTWARE Product</p></div>
  </div>
  <Link to="/welcome" className="absolute bottom-9 text-xs font-semibold text-white/65 underline underline-offset-4">Continuar para a demonstração</Link>
 </main>;
}

export function WelcomePage(){
 return <main className="min-h-screen bg-[#FFF8EF] text-[#071A2A]">
  <header className="mx-auto flex max-w-[1420px] items-center justify-between gap-4 px-5 py-6 sm:px-10">
   <Brand/><span className="rounded-full border border-[#0C5898]/15 bg-white px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#0C5898]">Demonstração EduCore</span>
  </header>
  <section className="mx-auto grid min-h-[min(760px,80svh)] max-w-[1420px] gap-0 overflow-hidden px-5 pb-5 lg:grid-cols-[.92fr_1.08fr] lg:px-10">
   <div className="fade-up relative z-10 flex flex-col justify-center rounded-t-[2rem] bg-[#071A2A] p-8 text-white sm:p-12 lg:rounded-l-[2.5rem] lg:rounded-tr-none lg:p-16">
    <p className="eyebrow">COLUS · Portal Escolar</p>
    <h1 className="mt-7 max-w-[13ch] font-display text-[clamp(48px,5.7vw,86px)] font-medium leading-[.99] tracking-[-.04em]">A escola, mais próxima de todos.</h1>
    <p className="mt-7 max-w-[48ch] text-[15px] leading-8 text-white/70">Uma experiência integrada para acompanhar a aprendizagem, fortalecer a comunicação e simplificar a gestão do Colégio Universo dos Sonhos.</p>
    <div className="mt-10 flex flex-wrap gap-3">
     <Link to="/login" className="inline-flex min-h-13 items-center gap-3 rounded-full bg-[#F18136] px-7 py-4 text-sm font-extrabold text-[#071A2A] transition hover:bg-[#F5A268]">Explorar o portal <ArrowRight size={18}/></Link>
     <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs text-white/65"><ShieldCheck size={15}/> Ambiente de demonstração</span>
    </div>
    <p className="mt-12 text-xs leading-6 text-white/45">Dados fictícios. A aplicação de demonstração não permite operar processos escolares reais.</p>
   </div>
   <div className="relative min-h-[380px] overflow-hidden rounded-b-[2rem] bg-[#0C5898] lg:min-h-[680px] lg:rounded-r-[2.5rem] lg:rounded-bl-none">
    <img src="/assets/colus-community.webp" alt="Comunidade escolar COLUS" className="absolute inset-0 h-full w-full object-cover object-center"/>
    <div className="absolute inset-0 bg-gradient-to-t from-[#071A2A]/90 via-[#071A2A]/5 to-[#071A2A]/5"/>
    <div className="absolute bottom-10 left-8 right-8 flex items-end justify-between gap-5 sm:bottom-12 sm:left-12">
     <div><p className="text-xs font-bold uppercase tracking-[.21em] text-[#F18136]">O nosso colégio</p>
      <p className="mt-3 max-w-sm font-display text-3xl leading-tight text-white sm:text-4xl">Aprender. Crescer. Pertencer.</p></div>
     <span aria-hidden="true" className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/55 text-white sm:flex"><Sparkles size={25}/></span>
    </div>
   </div>
  </section>
  <div className="mx-auto grid max-w-[1420px] grid-cols-2 gap-3 px-5 pb-8 text-[#65727C] sm:grid-cols-4 sm:px-10">
   {[{icon:GraduationCap,label:"Aprendizagem"},{icon:Users,label:"Famílias"},{icon:BookOpen,label:"Professores"},{icon:Wallet,label:"Gestão escolar"}].map(({icon:Icon,label})=>
    <div key={label} className="flex items-center justify-center gap-2 rounded-xl bg-white/70 px-3 py-4 text-xs font-bold"><Icon size={16} className="text-[#0C5898]"/>{label}</div>)}
  </div>
 </main>;
}

export function DemoLoginPage(){
 const {enter}=useDemo();const navigate=useNavigate();
 const [selected,setSelected]=useState<Role>("guardian");
 function start(){enter(selected);navigate("/app/"+selected+"/dashboard");}
 return <main className="grid min-h-screen bg-[#FFF8EF] text-[#071A2A] lg:grid-cols-[.7fr_1.3fr]">
  <aside className="relative hidden min-h-screen flex-col overflow-hidden bg-[#071A2A] p-12 text-white lg:flex">
   <img src="/assets/colus-interaction.webp" alt="Experiência escolar COLUS" className="absolute inset-0 h-full w-full object-cover opacity-35"/>
   <div className="absolute inset-0 bg-gradient-to-b from-[#071A2A]/90 via-[#071A2A]/60 to-[#071A2A]"/>
   <div className="relative z-10"><Brand light/></div>
   <div className="relative z-10 mt-auto max-w-xl">
    <p className="eyebrow">Acesso ao portal</p>
    <h1 className="mt-5 font-display text-6xl leading-[1.02]">Uma experiência para cada papel na escola.</h1>
    <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">Descubra como a informação circula entre alunos, famílias, professores e gestão.</p>
   </div>
   <p className="relative z-10 mt-9 text-xs text-white/45">© 2026 Colégio Universo dos Sonhos · EduCore</p>
  </aside>
  <section className="flex min-h-screen items-center justify-center px-5 py-7 sm:px-10 lg:px-14">
   <div className="w-full max-w-[800px]">
    <div className="flex items-center justify-between gap-4 lg:hidden"><Brand compact/><Link to="/welcome" className="text-sm font-semibold text-[#0C5898]"><ArrowLeft size={16} className="inline"/> Voltar</Link></div>
    <div className="hidden lg:block"><Link to="/welcome" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0C5898]"><ArrowLeft size={16}/> Voltar à capa</Link></div>
    <p className="eyebrow mt-10">Acesso de demonstração</p>
    <h2 className="mt-4 font-display text-[clamp(44px,5vw,64px)] leading-none">Escolha a sua experiência.</h2>
    <p className="mt-4 max-w-xl text-sm leading-7 text-[#65727C]">Selecione um perfil para explorar o ambiente EduCore COLUS. Não é necessário introduzir uma palavra-passe nesta demonstração.</p>
    <div role="group" aria-label="Perfis disponíveis na demonstração" className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
     {ROLES.map(role=>{const info=ROLE_DEFS[role];const Icon=info.icon;const active=selected===role;return <button key={role} type="button" aria-pressed={active} onClick={()=>setSelected(role)}
      className={"flex min-h-[116px] flex-col items-start rounded-2xl border p-4 text-left transition focus-visible:ring-2 "+(active?"border-[#0C5898] bg-[#0C5898] text-white shadow-lg shadow-[#0C5898]/10":"border-[#0C5898]/10 bg-white text-[#071A2A] hover:border-[#0C5898]/40")}>
      <Icon size={23} className={active?"text-[#F6AC79]":"text-[#0C5898]"}/>
      <span className="mt-auto pt-4 text-[12px] font-extrabold leading-5">{info.short}</span>
     </button>})}
    </div>
    <div className="mt-7 flex flex-col gap-4 border-t border-[#0C5898]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
     <p className="max-w-sm text-xs leading-6 text-[#65727C]"><ShieldCheck size={15} className="mr-1 inline text-[#0C5898]"/> Dados demonstrativos e permissões simuladas. Não introduzir informação real.</p>
     <button onClick={start} className="action shrink-0">Entrar como {ROLE_DEFS[selected].short} <ArrowRight size={17}/></button>
    </div>
   </div>
  </section>
 </main>;
}
