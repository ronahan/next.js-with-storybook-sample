'use client';

type InputProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
  required?: boolean;
};

export function Input({
  id,
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  autoComplete,
  required,
}: InputProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'block',
            marginBottom: 4,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {label}
          {required && <span style={{ color: '#dc2626', marginLeft: 2 }}>*</span>}
        </label>
      )}

      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        style={{
          width: '100%',
          padding: '10px 12px',
          fontSize: 14,
          borderRadius: 4,
          border: error ? '1px solid #dc2626' : '1px solid #ccc',
          boxSizing: 'border-box',
          outline: 'none',
        }}
      />

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          style={{
            color: '#dc2626',
            fontSize: 12,
            marginTop: 4,
            marginBottom: 0,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
