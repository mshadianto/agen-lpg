import { STATUS } from "../../constants/status";

export default function Badge({ status, map = STATUS }) {
  const s = map[status];
  if (!s) return null;
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 10px",
        borderRadius: 6,
        background: s.bg,
        color: s.c,
        whiteSpace: "nowrap",
      }}
    >
      {s.l}
    </span>
  );
}
