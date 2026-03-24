import { Ic } from "../icons/IconMap";

export default function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: 20,
        animation: "fadeIn .2s",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--card)",
          borderRadius: 20,
          padding: 28,
          width: "100%",
          maxWidth: wide ? 680 : 480,
          maxHeight: "85vh",
          overflowY: "auto",
          boxShadow: "0 32px 100px rgba(0,0,0,0.25)",
          border: "1px solid var(--border)",
          animation: "slideUp .3s cubic-bezier(.4,0,.2,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--text)" }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              background: "var(--hover)",
              border: "none",
              borderRadius: 8,
              padding: 6,
              cursor: "pointer",
              color: "var(--text-dim)",
              display: "flex",
            }}
          >
            <Ic name="x" size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
