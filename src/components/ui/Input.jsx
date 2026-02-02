/**
 * Reusable form input with label and inline error message.
 */
export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder = '',
  required = false,
  className = '',
  ...props
}) {
  const inputClasses = `w-full px-4 py-3 rounded-lg border ${
    error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
  } focus:outline-none focus:ring-2 focus:border-transparent transition-colors min-h-[44px]`;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-semibold text-dark mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={`${inputClasses} resize-vertical`}
          {...props}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`${inputClasses} cursor-pointer`}
          {...props}
        >
          {props.children}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={inputClasses}
          {...props}
        />
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
