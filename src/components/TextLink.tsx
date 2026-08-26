import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface TextLinkProps {
  to: string;
  children: ReactNode;
}

export default function TextLink({ to, children }: TextLinkProps) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-touch items-center text-body font-semibold text-indigo underline underline-offset-2 hover:text-indigo-dark"
    >
      {children}
    </Link>
  );
}
