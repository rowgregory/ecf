export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-text-light/65 dark:text-text-dark/65 mb-3">
      {children}
    </p>
  )
}
