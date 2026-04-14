const variants = {
  primary:
    'bg-amber-600 text-white hover:bg-amber-700 focus-visible:ring-amber-500',
  secondary:
    'bg-slate-800 text-white hover:bg-slate-900 focus-visible:ring-slate-500',
  outline:
    'border-2 border-amber-600 bg-transparent text-amber-800 hover:bg-amber-50 focus-visible:ring-amber-500',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({
  as: Comp = 'button',
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = Comp === 'button' ? 'button' : undefined,
  ...props
}) {
  return (
    <Comp
      type={type}
      className={`inline-flex items-center justify-center rounded-lg font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  )
}
