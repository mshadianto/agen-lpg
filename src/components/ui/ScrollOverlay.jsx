import { Ic } from "../icons/IconMap";

export default function ScrollOverlay({ onClose, title, maxWidth = 960, children }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(6px)",
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 20,
        overflowY: "auto",
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
          maxWidth,
          border: "1px solid var(--border)",
          animation: "slideUp .3s",
          margin: "20px 0",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800 }}>{title}</h3>
          <button
            onClick={onClose}
            style={{ background: "var(--hover)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--text-dim)", display: "flex" }}
          >
            <Ic name="x" size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
