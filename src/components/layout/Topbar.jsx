import { ROLES } from "../../constants/roles";
import { Ic } from "../icons/IconMap";

export default function Topbar({ role, dark, setDark, search, setSearch, liveTime, notifs, showNotif, setShowNotif, markAllRead, exportCSV }) {
  const unread = notifs.filter((n) => !n.read).length;
  return (
    <div
      style={{
        background: "var(--topbar)",
        borderBottom: "1px solid var(--border)",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        position: "sticky",
        top: 0,
        zIndex: 30,
        backdropFilter: "blur(16px)",
      }}
    >
      <div style={{ flex: 1, maxWidth: 380, display: "flex", alignItems: "center", gap: 8, background: "var(--hover)", border: "1px solid var(--border)", borderRadius: 10, padding: "7px 14px" }}>
        <Ic name="search" size={16} />
        <input
          placeholder="Cari data..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, border: "none", background: "none", outline: "none", fontSize: 13, color: "var(--text)", fontFamily: "inherit" }}
        />
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
        <div className="mono" style={{ fontSize: 12, fontWeight: 500, color: "var(--text-dim)", padding: "6px 12px", background: "var(--hover)", borderRadius: 8 }}>
          {liveTime.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
        </div>
        <button onClick={() => setDark(!dark)} style={{ background: "var(--hover)", border: "1px solid var(--border)", borderRadius: 10, padding: 7, cursor: "pointer", display: "flex", color: "var(--text-dim)" }}>
          <Ic name={dark ? "sun" : "moon"} size={16} />
        </button>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowNotif(!showNotif)}
            style={{ background: "var(--hover)", border: "1px solid var(--border)", borderRadius: 10, padding: 7, cursor: "pointer", display: "flex", color: "var(--text-dim)", position: "relative" }}
          >
            <Ic name="bell" size={16} />
            {unread > 0 && <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: 4, background: "#ef4444", border: "2px solid var(--card)", animation: "pulse 2s infinite" }} />}
          </button>
          {showNotif && (
            <div style={{ position: "absolute", top: 44, right: 0, width: 340, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, boxShadow: "var(--shadow)", zIndex: 50, animation: "slideUp .2s", overflow: "hidden" }}>
              <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>Notifikasi</span>
                <button onClick={markAllRead} style={{ fontSize: 11, color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Tandai semua dibaca</button>
              </div>
              <div style={{ maxHeight: 320, overflowY: "auto" }}>
                {notifs.map((n) => (
                  <div key={n.id} style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", background: n.read ? "transparent" : dark ? "rgba(249,115,22,0.05)" : "rgba(249,115,22,0.03)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 8, height: 8, borderRadius: 4, marginTop: 5, flexShrink: 0, background: n.type === "warning" ? "#f59e0b" : n.type === "success" ? "#10b981" : "#3b82f6" }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: n.read ? 400 : 600, color: "var(--text)", lineHeight: 1.4 }}>{n.msg}</div>
                      <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <button onClick={exportCSV} style={{ background: "var(--hover)", border: "1px solid var(--border)", borderRadius: 10, padding: 7, cursor: "pointer", display: "flex", color: "var(--text-dim)" }} title="Export CSV">
          <Ic name="download" size={16} />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 6, background: `${ROLES[role]?.color || "#f97316"}15`, color: ROLES[role]?.color || "#f97316", textTransform: "uppercase", letterSpacing: ".04em" }}>
            {ROLES[role]?.label}
          </span>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: ROLES[role]?.gradient || "linear-gradient(135deg,#f97316,#ef4444)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>
            {(ROLES[role]?.label || "A").charAt(0)}
          </div>
        </div>
      </div>
    </div>
  );
}
