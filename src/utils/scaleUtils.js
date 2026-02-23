import * as d3 from "d3";
import { CONFIG } from "../config/visualizationConfig";

/**
 * Creates a sequential color scale based on the config temperature range.
 */
export const createColorScale = () => {
  return d3.scaleSequential()
    .domain([CONFIG.temperature.min, CONFIG.temperature.max])
    .interpolator(d3.interpolateYlOrRd);
};