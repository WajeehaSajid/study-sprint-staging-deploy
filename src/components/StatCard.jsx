function StatCard({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)' }}>{label}</div>
      <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)' }}>{value}</div>
    </div>
  )
}

export default StatCard