import * as d3 from "d3";
import { useRef, useEffect } from "react";
import { CONFIG } from "../config/visualizationConfig";

/**
 * Renders embedded mini line chart inside each matrix cell.
 * Displays daily max and min trends.
 */
const MiniLineChart = ({ data, width, height }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const x = d3.scaleLinear()
      .domain([1, data.length])
      .range([0, width]);

    // Compute local min and max for better mini-chart scaling
    const localMin = d3.min(data, d => d.min);
    const localMax = d3.max(data, d => d.max);

    const y = d3.scaleLinear()
        .domain([localMin, localMax])
        .range([height, 0]);

    const lineMax = d3.line()
      .x((d, i) => x(i + 1))
      .y(d => y(d.max));

    const lineMin = d3.line()
      .x((d, i) => x(i + 1))
      .y(d => y(d.min));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#006d77")
      .attr("stroke-width", 1)
      .attr("d", lineMax);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#8338ec")
      .attr("stroke-width", 1)
      .attr("d", lineMin);

  }, [data, width, height]);

  return <svg ref={ref} width={width} height={height} />;
};

export default MiniLineChart;