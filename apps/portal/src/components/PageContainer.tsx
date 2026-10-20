import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../lib/utils";
interface PageContainerProps { children:ReactNode; className?:string }
export function PageContainer({children,className}:PageContainerProps){
 const reduced=useReducedMotion();
 return <motion.div initial={reduced?false:{opacity:0,y:8}} animate={{opacity:1,y:0}}
 transition={{duration:0.3,ease:[.25,.1,.25,1]}}
 className={cn("mx-auto max-w-7xl",className)}>{children}</motion.div>;
}
