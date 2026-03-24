import { ROLES, ROLE_FEATURES } from "../../constants/roles";
import { Ic } from "../icons/IconMap";

export default function RolePicker({ dark, setDark, onSelect }) {
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn .4s" }}>
      <div style={{ maxWidth: 680, width: "100%", textAlign: "center" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 20,
            background: "linear-gradient(135deg,#f97316,#ef4444)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            marginBottom: 20,
            boxShadow: "0 8px 40px rgba(249,115,22,0.35)",
          }}
        >
          <Ic name="flame" size={32} />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 6 }}>Agen LPG Enterprise</h1>
        <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 32 }}>Pilih peran Anda untuk mengakses fitur yang sesuai</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16, textAlign: "left" }}>
          {Object.entries(ROLES).map(([k, r]) => (
            <div
              key={k}
              onClick={() => onSelect(k)}
              style={{
                background: "var(--card)",
                borderRadius: 18,
                border: "1px solid var(--border)",
                padding: 22,
                cursor: "pointer",
                transition: "all 0.3s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 12px 40px ${r.color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: r.gradient }} />
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: r.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    boxShadow: `0 4px 16px ${r.color}40`,
                  }}
                >
                  <Ic name={r.icon} size={22} />
                </div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800 }}>{r.label}</div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)", fontWeight: 500, marginTop: 1 }}>{r.desc}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {ROLE_FEATURES[k]?.map((t) => (
                  <span key={t} style={{ fontSize: 9, padding: "3px 8px", borderRadius: 5, background: `${r.color}10`, color: r.color, fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => setDark(!dark)}
            style={{
              background: "var(--hover)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "6px 14px",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              color: "var(--text-dim)",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Ic name={dark ? "sun" : "moon"} size={14} /> {dark ? "Light" : "Dark"} Mode
          </button>
        </div>
      </div>
    </div>
  );
}
