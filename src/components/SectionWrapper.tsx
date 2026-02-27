import type { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export function SectionWrapper({ id, className = '', children }: SectionWrapperProps) {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section id={id} ref={ref} data-inview={isInView ? 'true' : 'false'} className={`reveal scroll-mt-24 ${className}`}>
      {children}
    </section>
  );
}

