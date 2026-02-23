/**
 * Tooltip component.
 * Displays formatted month and temperature values.
 * Format strictly matches assignment example.
 */
const Tooltip = ({ visible, x, y, content }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x + 10,
        top: y + 10,
        background: "white",
        border: "1px solid #ccc",
        padding: "6px 10px",
        fontSize: "12px",
        pointerEvents: "none",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
      }}
    >
      {content}
    </div>
  );
};

export default Tooltip;