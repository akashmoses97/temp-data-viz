import MiniLineChart from "./MiniLineChart";
import { CONFIG } from "../config/visualizationConfig";

/**
 * Single matrix cell component.
 * Responsible only for:
 * - Drawing background rectangle
 * - Handling hover interaction
 * - Rendering mini chart
 */
const MatrixCell = ({
  cellData,
  x,
  y,
  colorScale,
  mode,
  onHover,
  onLeave
}) => {
  const temperature =
    mode === "max"
      ? cellData.monthlyMax
      : cellData.monthlyMin;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        width={CONFIG.cell.width}
        height={CONFIG.cell.height}
        fill={colorScale(temperature)}
        onMouseEnter={(event) =>
          onHover(event, cellData)
        }
        onMouseLeave={onLeave}
      />

      <foreignObject
        width={CONFIG.cell.width}
        height={CONFIG.cell.height}
        style={{ pointerEvents: "none" }}
      >
        <MiniLineChart
          data={cellData.dailyValues}
          width={CONFIG.cell.width}
          height={CONFIG.cell.height}
        />
      </foreignObject>
    </g>
  );
};

export default MatrixCell;