export function Textarea({ label, id, className = '', rows = 4, ...props }) {
  const areaId = id ?? props.name
  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={areaId}
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={areaId}
        rows={rows}
        className={`w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 ${className}`}
        {...props}
      />
    </div>
  )
}
