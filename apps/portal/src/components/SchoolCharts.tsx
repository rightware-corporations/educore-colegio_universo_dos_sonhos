import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { activeStudents, attendanceRate, average, type SchoolData } from "../data/school";
const PALETTE=["#0C5898","#F18136","#40A68A","#8CA6C1","#DFC46C"];
const toolStyle={background:"#fff",border:"1px solid #E4EAF0",borderRadius:12,fontSize:12};
export function GradeDistribution({data}:{data:SchoolData}){
 const groups=[["1.ª–3.ª",1,3],["4.ª–6.ª",4,6],["7.ª–9.ª",7,9],["10.ª–12.ª",10,12]] as const;
 const series=groups.map(([name,a,b])=>({name,Alunos:activeStudents(data).filter(x=>x.grade>=a&&x.grade<=b).length}));
 return <div className="h-60 w-full" aria-label="Gráfico: distribuição dos alunos ativos por ciclo">
  <ResponsiveContainer width="100%" height="100%"><BarChart data={series} margin={{top:8,right:8,left:-24,bottom:4}}>
   <CartesianGrid strokeDasharray="3 3" stroke="#E9EEF3" vertical={false}/>
   <XAxis dataKey="name" tick={{fontSize:10,fill:"#687782"}} tickLine={false} axisLine={false}/>
   <YAxis allowDecimals={false} tick={{fontSize:11,fill:"#687782"}} tickLine={false} axisLine={false}/>
   <Tooltip contentStyle={toolStyle}/><Bar dataKey="Alunos" radius={[8,8,0,0]} fill="#0C5898" maxBarSize={48}/>
  </BarChart></ResponsiveContainer>
 </div>;
}
export function AttendanceChart({data}:{data:SchoolData}){
 const series=data.classes.filter(c=>c.active).map(c=>({name:c.name,taxa:attendanceRate(data,activeStudents(data).filter(s=>s.classId===c.id).map(s=>s.id))})).filter(x=>x.taxa>0);
 return <div className="h-60 w-full" aria-label="Gráfico: assiduidade registada por turma">
 <ResponsiveContainer width="100%" height="100%"><BarChart data={series} margin={{top:8,right:8,left:-25,bottom:4}}>
 <CartesianGrid strokeDasharray="3 3" stroke="#E9EEF3" vertical={false}/><XAxis dataKey="name" tick={{fontSize:11}} tickLine={false} axisLine={false}/><YAxis domain={[0,100]} tick={{fontSize:11}} tickLine={false} axisLine={false}/>
 <Tooltip contentStyle={toolStyle}/><Bar dataKey="taxa" name="Assiduidade" fill="#40A68A" radius={[7,7,0,0]}/></BarChart></ResponsiveContainer></div>;
}
export function FinanceChart({data}:{data:SchoolData}){
 const statuses=[{name:"Validados",key:"validated"},{name:"Submetidos",key:"submitted"},{name:"Pendentes",key:"pending"}];
 const series=statuses.map(s=>({name:s.name,value:data.fees.filter(f=>f.status===s.key).reduce((n,f)=>n+f.amount,0)}));
 if(series.every(x=>x.value===0))return <p className="py-12 text-center text-sm text-muted-foreground">Sem obrigações financeiras registadas.</p>;
 return <div className="h-60 w-full" aria-label="Gráfico: valores financeiros por estado"><ResponsiveContainer width="100%" height="100%">
 <PieChart><Pie data={series} dataKey="value" nameKey="name" innerRadius={50} outerRadius={82} paddingAngle={4} strokeWidth={0}>
 {series.map((s,i)=><Cell key={s.name} fill={PALETTE[i]}/>)}</Pie><Tooltip contentStyle={toolStyle}/><Legend iconType="circle" wrapperStyle={{fontSize:11}}/></PieChart>
 </ResponsiveContainer></div>;
}
export function PerformanceChart({data}:{data:SchoolData}){
 const names=["Matemática","Língua Portuguesa","Biologia","Ciências Naturais","Inglês"];
 const series=names.map(name=>({name:name==="Língua Portuguesa"?"Português":name==="Ciências Naturais"?"C. Naturais":name,
  média:average(data.assessments.filter(a=>a.subject===name&&a.published).map(a=>a.score))
 })).filter(x=>x.média>0);
 return <div className="h-60 w-full" aria-label="Gráfico: média das avaliações publicadas"><ResponsiveContainer width="100%" height="100%">
 <BarChart data={series} layout="vertical" margin={{top:4,right:12,left:1,bottom:4}}>
  <CartesianGrid strokeDasharray="3 3" stroke="#E9EEF3" horizontal={false}/><XAxis type="number" domain={[0,20]} tick={{fontSize:11}} tickLine={false} axisLine={false}/>
  <YAxis type="category" dataKey="name" width={90} tick={{fontSize:10}} tickLine={false} axisLine={false}/><Tooltip contentStyle={toolStyle}/><Bar dataKey="média" fill="#0C5898" radius={[0,8,8,0]} maxBarSize={20}/></BarChart></ResponsiveContainer></div>;
}
