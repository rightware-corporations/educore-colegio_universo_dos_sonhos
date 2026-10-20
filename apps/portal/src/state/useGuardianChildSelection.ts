import { useState } from "react";

/** Demonstration-only per-guardian child selection, shared across role modules. */
const KEY="colus.portal.guardian.selected-child";
export function useGuardianChildSelection(){
 const [selected,setSelected]=useState(()=>{
  const urlChild=new URLSearchParams(window.location.search).get("child");
  return urlChild??sessionStorage.getItem(KEY)??"ALU-001";
 });
 const choose=(id:string)=>{
  setSelected(id);
  sessionStorage.setItem(KEY,id);
 };
 return [selected,choose] as const;
}
