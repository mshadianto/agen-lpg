import { ROLES } from "../../constants/roles";
import { Ic } from "../icons/IconMap";

export default function Sidebar({ role, nav, page, sideCollapsed, onToggle, onNavigate, onChangeRole }) {
  return (
    <aside
      style={{
        width: sideCollapsed ? 72 : 240,
        background: "var(--sidebar)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 40,
        transition: "width 0.3s cubic-bezier(.4,0,.2,1)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: sideCollapsed ? "20px 16px" : "20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          cursor: "pointer",
          minHeight: 72,
        }}
        onClick={onToggle}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: ROLES[role]?.gradient || "linear-gradient(135deg,#f97316,#ef4444)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexShrink: 0,
            boxShadow: `0 4px 20px ${ROLES[role]?.color || "#f97316"}40`,
          }}
        >
          <Ic name={ROLES[role]?.icon || "flame"} size={22} />
        </div>
        {!sideCollapsed && (
          <div style={{ overflow: "hidden" }}>
            <div style={{ color: "#fff", fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>Agen LPG</div>
            <div style={{ color: ROLES[role]?.color || "#64748b", fontSize: 10, fontWeight: 600, textTransform: "uppercase" }}>{ROLES[role]?.label}</div>
          </div>
        )}
      </div>
      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
        {nav.map((n) => (
          <div
            key={n.id}
            onClick={() => onNavigate(n.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: sideCollapsed ? "11px 0" : "11px 14px",
              justifyContent: sideCollapsed ? "center" : "flex-start",
              borderRadius: 10,
              color: page === n.id ? ROLES[role]?.color || "#fb923c" : "#94a3b8",
              background: page === n.id ? `${ROLES[role]?.color || "#f97316"}18` : "transparent",
              cursor: "pointer",
              transition: "all 0.2s",
              marginBottom: 2,
              position: "relative",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <Ic name={n.ic} size={20} />
            {!sideCollapsed && <span style={{ whiteSpace: "nowrap" }}>{n.l}</span>}
            {n.b && (
              <span
                style={{
                  position: sideCollapsed ? "absolute" : "relative",
                  top: sideCollapsed ? 4 : "auto",
                  right: sideCollapsed ? 8 : "auto",
                  marginLeft: sideCollapsed ? 0 : "auto",
                  background: "#ef4444",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                  minWidth: 18,
                  height: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 9,
                  padding: "0 5px",
                }}
              >
                {n.b}
              </span>
            )}
          </div>
        ))}
      </nav>
      {!sideCollapsed && (
        <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={onChangeRole}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              padding: "8px 12px",
              cursor: "pointer",
              color: "#94a3b8",
              fontSize: 11,
              fontWeight: 600,
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 6,
              justifyContent: "center",
            }}
          >
            <Ic name="refresh" size={12} /> Ganti Peran
          </button>
        </div>
      )}
    </aside>
  );
}
