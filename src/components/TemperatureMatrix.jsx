import { useEffect, useState } from "react";
import { CONFIG } from "../config/visualizationConfig";
import { processTemperatureData } from "../utils/dataProcessor";
import { createColorScale } from "../utils/scaleUtils";
import MatrixCell from "./MatrixCell";
import Tooltip from "./Tooltip";
import Legend from "./Legend";

/**
 * TemperatureMatrix Component
 * -------------------------------------------------------
 * Main container for Temperature Matrix visualization.
 *
 * - Load and manage temperature dataset
 * - Compute dynamic 10-year window
 * - Control interaction state (max/min toggle)
 * - Render structured SVG layout (axes, rulers, grid)
 * - Coordinate tooltip behavior
 * - Display legend and metadata
 */

const TemperatureMatrix = () => {
  const [data, setData] = useState([]);
  const [yearRange, setYearRange] = useState({ min: null, max: null });
  const [mode, setMode] = useState("max");

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: ""
  });

  useEffect(() => {
    processTemperatureData().then(result => {
      setData(result.data);
      setYearRange({
        min: result.minYear,
        max: result.maxYear
      });
    });
  }, []);

  if (!yearRange.min) return null;

  const colorScale = createColorScale();
  const monthNames = CONFIG.months;

  const handleHover = (event, cellData) => {
    const month = String(cellData.month + 1).padStart(2, "0");

    setTooltip({
      visible: true,
      x: event.pageX,
      y: event.pageY,
      content: `Date: ${cellData.year}-${month}, max: ${cellData.monthlyMax} min: ${cellData.monthlyMin}`
    });
  };

  const handleLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  const years = [];
  for (let y = yearRange.min; y <= yearRange.max; y++) {
    years.push(y);
  }

  // Dynamically calculate required SVG height
  const calculatedHeight =
    CONFIG.margin.top +
    monthNames.length *
      (CONFIG.cell.height + CONFIG.cell.padding) -
    CONFIG.cell.padding +
    CONFIG.margin.bottom;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "10px"
      }}
    >
      {/* Heading */}
      <h2 style={{ marginBottom: "5px" }}>
        {CONFIG.metadata.title}
      </h2>

      <p style={{ marginTop: 0, color: "#666" }}>
        {CONFIG.metadata.subtitle}
      </p>

      {/* Toggle Button */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setMode(mode === "max" ? "min" : "max")}>
          {mode === "max" ? "Switch to Min View" : "Switch to Max View"}
        </button>
      </div>

      {/* MATRIX + LEGEND */}
      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "flex-start"
        }}
      >
        <svg width={CONFIG.svg.width} height={calculatedHeight}>
          {/* Year Labels */}
          {years.map((year, index) => {
            const x =
              CONFIG.margin.left +
              index * (CONFIG.cell.width + CONFIG.cell.padding) +
              CONFIG.cell.width / 2;

            return (
              <text
                key={year}
                x={x}
                y={CONFIG.margin.top - 20}
                textAnchor="middle"
                fontSize="14"
              >
                {year}
              </text>
            );
          })}

          {/* Top Ruler */}
          <line
            x1={CONFIG.margin.left}
            x2={
              CONFIG.margin.left +
              (yearRange.max - yearRange.min + 1) *
                (CONFIG.cell.width + CONFIG.cell.padding) -
              CONFIG.cell.padding
            }
            y1={CONFIG.margin.top - 5}
            y2={CONFIG.margin.top - 5}
            stroke="black"
          />

          {/* Year Ticks */}
          {years.map((year, index) => {
            const x =
              CONFIG.margin.left +
              index * (CONFIG.cell.width + CONFIG.cell.padding) +
              CONFIG.cell.width / 2;

            return (
              <line
                key={`tick-${year}`}
                x1={x}
                x2={x}
                y1={CONFIG.margin.top - 5}
                y2={CONFIG.margin.top - 12}
                stroke="black"
              />
            );
          })}

          {/* Month Labels */}
          {monthNames.map((month, index) => {
            const y =
              CONFIG.margin.top +
              index * (CONFIG.cell.height + CONFIG.cell.padding) +
              CONFIG.cell.height / 2;

            return (
              <text
                key={month}
                x={CONFIG.margin.left - 20}
                y={y}
                textAnchor="end"
                alignmentBaseline="middle"
                fontSize="14"
              >
                {month}
              </text>
            );
          })}

          {/* Left Ruler */}
          <line
            x1={CONFIG.margin.left - 5}
            x2={CONFIG.margin.left - 5}
            y1={CONFIG.margin.top}
            y2={
              CONFIG.margin.top +
              monthNames.length *
                (CONFIG.cell.height + CONFIG.cell.padding) -
              CONFIG.cell.padding
            }
            stroke="black"
          />

          {/* Month Ticks */}
          {monthNames.map((_, index) => {
            const y =
              CONFIG.margin.top +
              index * (CONFIG.cell.height + CONFIG.cell.padding) +
              CONFIG.cell.height / 2;

            return (
              <line
                key={`month-tick-${index}`}
                x1={CONFIG.margin.left - 5}
                x2={CONFIG.margin.left - 12}
                y1={y}
                y2={y}
                stroke="black"
              />
            );
          })}

          {/* Matrix Cells */}
          {data.map((cell, index) => {
            const x =
              CONFIG.margin.left +
              (cell.year - yearRange.min) *
                (CONFIG.cell.width + CONFIG.cell.padding);

            const y =
              CONFIG.margin.top +
              cell.month *
                (CONFIG.cell.height + CONFIG.cell.padding);

            return (
              <MatrixCell
                key={index}
                cellData={cell}
                x={x}
                y={y}
                colorScale={colorScale}
                mode={mode}
                onHover={handleHover}
                onLeave={handleLeave}
              />
            );
          })}
        </svg>

        <Legend colorScale={colorScale} />
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: "30px",
          fontSize: "14px",
          color: "#666",
          textAlign: "center"
        }}
      >
        <div>Author: {CONFIG.metadata.author}</div>
        <div>{CONFIG.metadata.course}</div>
        <div>{CONFIG.metadata.assignment}</div>
      </footer>

      <Tooltip {...tooltip} />
    </div>
  );
};

export default TemperatureMatrix;