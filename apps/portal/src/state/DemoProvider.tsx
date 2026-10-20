import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import type { Role } from "../config/roles";

export type DemoEvent={id:number;kind:"attendance"|"payment"|"message";title:string;detail:string};
export type DemoState={absent:boolean;paymentValidated:boolean;guardianUnread:number;messages:{from:string;text:string}[];events:DemoEvent[]};
const initial:DemoState={
 absent:false,paymentValidated:false,guardianUnread:0,
 messages:[{from:"Professor",text:"Bem-vindo à experiência demonstrativa de comunicação escola–família."}],
 events:[]
};
const KEY="colus.portal.demo.v1";
function read():DemoState {try {const s=sessionStorage.getItem(KEY);return s?JSON.parse(s) as DemoState:initial;}catch{return initial;}}
type Ctx={
 state:DemoState;role:Role|null; enter:(r:Role)=>void;leave:()=>void;
 markAbsent:()=>void;validatePayment:()=>void;sendMessage:(text:string)=>void;reset:()=>void;
};
const Context=createContext<Ctx|null>(null);
const ROLE_KEY="colus.portal.role";
export function DemoProvider({children}:PropsWithChildren){
 const [state,setState]=useState<DemoState>(read);
 const [role,setRole]=useState<Role|null>(()=>{try{return sessionStorage.getItem(ROLE_KEY) as Role|null;}catch{return null;}});
 const apply=(fn:(s:DemoState)=>DemoState)=>setState(previous=>{const next=fn(previous);try{sessionStorage.setItem(KEY,JSON.stringify(next));}catch{}return next;});
 const value=useMemo<Ctx>(()=>({
  state,role,
  enter(r){setRole(r);try{sessionStorage.setItem(ROLE_KEY,r);}catch{}},
  leave(){setRole(null);try{sessionStorage.removeItem(ROLE_KEY);}catch{}},
  markAbsent(){apply(s=>s.absent?s:{...s,absent:true,guardianUnread:s.guardianUnread+1,
   events:[{id:Date.now(),kind:"attendance",title:"Falta registada",detail:"O encarregado recebeu uma notificação de assiduidade (simulação)."},...s.events]});},
  validatePayment(){apply(s=>s.paymentValidated?s:{...s,paymentValidated:true,
   events:[{id:Date.now(),kind:"payment",title:"Pagamento validado",detail:"Pagamento de demonstração de 8 500 MT confirmado nas Finanças."},...s.events]});},
  sendMessage(text){const trimmed=text.trim();if(!trimmed)return;apply(s=>({...s,guardianUnread:s.guardianUnread+1,
   messages:[...s.messages,{from:"Professor",text:trimmed}],
   events:[{id:Date.now(),kind:"message",title:"Mensagem enviada",detail:"Uma nova mensagem do professor ficou visível ao encarregado."},...s.events]}));},
  reset(){setState(initial);try{sessionStorage.removeItem(KEY);}catch{}}
 }),[state,role]);
 return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useDemo(){const ctx=useContext(Context);if(!ctx)throw new Error("DemoProvider obrigatório");return ctx;}
