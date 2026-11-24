"use client";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) { const reduced = useReducedMotion(); return <motion.div className={className} initial={{ opacity: 0, y: reduced ? 0 : 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: reduced ? 0 : .8, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>; }
export function ImageReveal({ children, className }: { children: ReactNode; className?: string }) { const reduced = useReducedMotion(); return <motion.div className={className} initial={{ opacity: 0, clipPath: reduced ? "inset(0)" : "inset(9% 0 0 0)" }} whileInView={{ opacity: 1, clipPath: "inset(0)" }} viewport={{ once: true, amount: .15 }} transition={{ duration: reduced ? 0 : .9, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>; }
