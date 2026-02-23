import * as d3 from "d3";
import { useRef, useEffect } from "react";
import { CONFIG } from "../config/visualizationConfig";

/**
 * Legend component.
 * Renders a vertical temperature color scale with axis ticks.
 */
const Legend = ({ colorScale }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const paddingTop = 20;
    const paddingBottom = 20;
    const height = 300;
    const gradientWidth = 25;

    const totalHeight = height + paddingTop + paddingBottom;
    const totalWidth = 90;

    // Scale
    const legendScale = d3.scaleLinear()
      .domain([CONFIG.temperature.min, CONFIG.temperature.max])
      .range([height, 0]);

    const legendAxis = d3.axisRight(legendScale)
      .ticks(5)
      .tickSize(6);

    const defs = svg.append("defs");

    const gradient = defs.append("linearGradient")
      .attr("id", "legend-gradient")
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "0%")
      .attr("y2", "0%");

    const steps = 100;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      gradient.append("stop")
        .attr("offset", `${t * 100}%`)
        .attr(
          "stop-color",
          colorScale(
            CONFIG.temperature.min +
            t * (CONFIG.temperature.max - CONFIG.temperature.min)
          )
        );
    }

    // Gradient rectangle (shifted down)
    svg.append("rect")
      .attr("x", 0)
      .attr("y", paddingTop)
      .attr("width", gradientWidth)
      .attr("height", height)
      .style("fill", "url(#legend-gradient)");

    // Axis group (shifted down)
    svg.append("g")
      .attr("transform", `translate(${gradientWidth + 5}, ${paddingTop})`)
      .call(legendAxis);

  }, [colorScale]);

  return <svg ref={ref} width={90} height={340} />;
};

export default Legend;