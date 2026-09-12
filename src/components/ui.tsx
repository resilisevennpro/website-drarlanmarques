import React from 'react';

type ButtonProps = {
  variant?: 'primary' | 'outline' | 'ghost';
  icon?: any;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
};

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  icon: Icon,
  href,
  ...props
}: ButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 active:scale-95 text-sm md:text-base overflow-hidden";

  const variants = {
    primary: "bg-sky-500 hover:bg-sky-600 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]",
    outline: "border border-sky-500 text-sky-500 hover:bg-sky-500/10",
    ghost: "text-slate-400 hover:text-sky-500 hover:bg-slate-800/50"
  };

  const content = (
    <span className="relative z-10 flex items-center gap-2">
      {children}
      {Icon && <Icon className="w-4 h-4 md:w-5 md:h-5" />}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        target={props.target || (href.startsWith('http') ? '_blank' : undefined)}
        rel={props.rel || (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {content}
    </button>
  );
};

export const Section = React.forwardRef<HTMLElement, { children?: React.ReactNode, className?: string, id?: string }>(({
  children,
  className = '',
  id = ''
}, ref) => (
  <section ref={ref} id={id} className={`py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
));

export const Badge = ({ children, className = '' }: { children?: React.ReactNode, className?: string }) => (
  <span className={`inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sky-500 text-xs md:text-sm font-semibold tracking-wide uppercase mb-4 ${className}`}>
    {children}
  </span>
);
