export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        padding: "14px 24px",
        borderRadius: 12,
        fontSize: 13,
        fontWeight: 700,
        color: "#fff",
        zIndex: 100,
        animation: "slideUp .3s",
        boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        background:
          toast.type === "error"
            ? "linear-gradient(135deg,#dc2626,#b91c1c)"
            : "linear-gradient(135deg,#059669,#047857)",
      }}
    >
      {toast.msg}
    </div>
  );
}
