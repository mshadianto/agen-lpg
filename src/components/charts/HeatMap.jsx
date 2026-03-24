export default function HeatMap({ data, color }) {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
      {data.map((v, i) => {
        const op = 0.08 + (v / max) * 0.9;
        return (
          <div
            key={i}
            title={`${v}`}
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: color,
              opacity: op,
              transition: "opacity 0.3s",
            }}
          />
        );
      })}
    </div>
  );
}
