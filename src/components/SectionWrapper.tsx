import type { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface SectionWrapperProps {
  id: string;
  className?: string;
  disableReveal?: boolean;
  children: ReactNode;
}

export function SectionWrapper({ id, className = '', disableReveal = false, children }: SectionWrapperProps) {
  const { ref, isInView } = useInView<HTMLElement>();
  const visible = disableReveal || isInView;
  const revealClass = disableReveal ? '' : 'reveal';

  return (
    <section id={id} ref={ref} data-inview={visible ? 'true' : 'false'} className={`${revealClass} scroll-mt-24 ${className}`}>
      {children}
    </section>
  );
}

