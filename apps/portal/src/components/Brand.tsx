import { Link } from "react-router-dom";
export function Brand({light=false,compact=false}:{light?:boolean;compact?:boolean}){
 return <Link to="/welcome" className="inline-flex min-w-0 items-center gap-3" aria-label="COLUS — Entrada do portal">
  <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-sm">
   <img src="/assets/colus-logo.jpg" className="h-full w-full object-contain" alt="Logótipo oficial COLUS" />
  </span>
  {!compact&&<span className="min-w-0"><strong className={"block text-[15px] font-extrabold tracking-[.015em] "+(light?"text-white":"text-[#071A2A]")}>COLUS</strong><span className={"block text-[10px] font-semibold tracking-[.02em] "+(light?"text-white/65":"text-[#65727C]")}>Colégio Universo dos Sonhos</span></span>}
 </Link>
}
