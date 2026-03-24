export const FG = ({ label, children }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-dim)", marginBottom: 5 }}>{label}</label>
    {children}
  </div>
);

export const FI = (props) => (
  <input
    {...props}
    style={{
      width: "100%",
      padding: "9px 13px",
      border: "1px solid var(--border)",
      borderRadius: 10,
      fontSize: 13,
      fontFamily: "inherit",
      color: "var(--text)",
      background: "var(--card2)",
      outline: "none",
      ...props.style,
    }}
  />
);

export const FS = (props) => (
  <select
    {...props}
    style={{
      width: "100%",
      padding: "9px 13px",
      border: "1px solid var(--border)",
      borderRadius: 10,
      fontSize: 13,
      fontFamily: "inherit",
      color: "var(--text)",
      background: "var(--card2)",
      outline: "none",
      ...props.style,
    }}
  />
);

export const FB = ({ primary, children, ...props }) => (
  <button
    {...props}
    style={{
      padding: "9px 18px",
      borderRadius: 10,
      fontSize: 13,
      fontWeight: 700,
      fontFamily: "inherit",
      border: "none",
      cursor: props.disabled ? "not-allowed" : "pointer",
      opacity: props.disabled ? 0.5 : 1,
      display: "flex",
      alignItems: "center",
      gap: 6,
      ...(primary
        ? { background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff" }
        : { background: "var(--hover)", color: "var(--text-dim)" }),
      ...props.style,
    }}
  >
    {children}
  </button>
);
