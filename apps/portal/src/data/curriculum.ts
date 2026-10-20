/** Referência CONFIGURÁVEL. Não comprova a oferta actual de cada classe no COLUS.
 * https://www.mec.gov.mz/documentos.php (planos curriculares EP e ES)
 * O ES sofreu alterações em 2025–2026; opções e cargas sujeitas à confirmação da escola.
 */
export type Level="EP1"|"EP2"|"ES1"|"ES2";
export const CURRICULUM=Array.from({length:12},(_,i)=>{
 const grade=i+1;const level:Level=grade<=3?"EP1":grade<=6?"EP2":grade<=9?"ES1":"ES2";
 const subjects=level==="EP1"?["Língua Portuguesa","Matemática","Educação Física"]:
 level==="EP2"?["Língua Portuguesa","Matemática","Ciências Naturais","Ciências Sociais","Educação Física","Educação Visual e Ofícios"]:
 level==="ES1"?["Língua Portuguesa","Inglês","Matemática","História","Geografia","Biologia","Física","Química","TIC","Educação Física"]:
 ["Língua Portuguesa","Inglês","Matemática","História","Geografia","Biologia","Física","Química","TIC","Educação Física"];
 return {grade,level,subjects,label:grade+"ª Classe",year:2026,validatedBySchool:false};
});
export const GRADE_NOTE="Disciplinas indicativas; opções curriculares, áreas e cargas horárias carecem de validação do COLUS.";
export const subjectsFor=(grade:number)=>CURRICULUM.find(c=>c.grade===grade)?.subjects??[];
export const LEVELS:Record<Level,string>={EP1:"Primário · 1.º ciclo",EP2:"Primário · 2.º ciclo",ES1:"Secundário · 1.º ciclo",ES2:"Secundário · 2.º ciclo"};
