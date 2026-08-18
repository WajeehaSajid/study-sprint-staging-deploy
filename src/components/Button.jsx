function Button({ children, variant = 'primary', disabled, onClick }) {
  const styles = {
    primary: {
      background: 'var(--amber)',
      color: 'var(--board)',
      border: 'none',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--ink)',
      border: '1px solid var(--ink-soft)',
    },
  }

  return (
    <button
      className="btn"
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles[variant],
        borderRadius: '999px',
        padding: '10px 20px',
        fontWeight: variant === 'primary' ? 600 : 400,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  )
}

export default Button