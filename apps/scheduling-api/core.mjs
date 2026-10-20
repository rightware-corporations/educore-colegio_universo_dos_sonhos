export const services=[
 {id:"admission",name:"Admissões e matrículas",duration:30,description:"Informações sobre a candidatura e requisitos documentais"},
 {id:"visit",name:"Visita ao colégio",duration:45,description:"Conhecer os espaços e o projeto educativo"},
 {id:"secretary",name:"Atendimento à Secretaria",duration:30,description:"Informações e procedimentos administrativos"}
];
export const windowHours={start:"08:00",end:"16:00",stepMinutes:15};
const mins=time=>{const [h,m]=time.split(":").map(Number);return h*60+m};
const timeOf=m=>String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0");
export const dateOK=d=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&!Number.isNaN(Date.parse(d+"T12:00:00Z"))&&new Date(d+"T12:00:00Z").toISOString().slice(0,10)===d;
export const dayOK=d=>{const day=new Date(d+"T12:00:00Z").getUTCDay();return day>0&&day<6};
export const serviceOf=id=>services.find(s=>s.id===id);
export function slotsFor(date,serviceId,bookings,now=new Date()){
 const svc=serviceOf(serviceId);if(!svc||!dateOK(date)||!dayOK(date))return [];
 // Mozambique's local date and clock, independent of server hosting region.
 const moz=new Intl.DateTimeFormat("sv-SE",{timeZone:"Africa/Maputo",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(now).replace(" ","T");
 const localDate=moz.slice(0,10),localClock=moz.slice(11,16);
 if(date<localDate)return [];
 const result=[];
 for(let at=mins(windowHours.start);at+svc.duration<=mins(windowHours.end);at+=windowHours.stepMinutes){
  const time=timeOf(at);
  if(date===localDate&&time<=localClock)continue;
  if(bookings.some(b=>b.status!=="cancelled"&&at<mins(b.time)+b.durationMinutes&&at+svc.duration>mins(b.time)))continue;
  result.push(time);
 }
 return result;
}
