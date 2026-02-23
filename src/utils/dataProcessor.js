import * as d3 from "d3";

/**
 * Loads CSV and:
 * - Dynamically computes last 10 years
 * - Aggregates monthly max/min
 * - Preserves daily values
 */
export const processTemperatureData = async () => {
  const rawData = await d3.csv("/temperature_daily.csv", d => ({
    date: d3.timeParse("%Y-%m-%d")(d.date),
    max: +d.max_temperature,
    min: +d.min_temperature
  }));

  // Dynamically compute last 10 years
  const maxYear = d3.max(rawData, d => d.date.getFullYear());
  const minYear = maxYear - 9;

  const filtered = rawData.filter(d => {
    const year = d.date.getFullYear();
    return year >= minYear && year <= maxYear;
  });

  const grouped = d3.group(
    filtered,
    d => d.date.getFullYear(),
    d => d.date.getMonth()
  );

  const result = [];

  grouped.forEach((months, year) => {
    months.forEach((values, month) => {
      result.push({
        year,
        month,
        monthlyMax: d3.max(values, d => d.max),
        monthlyMin: d3.min(values, d => d.min),
        dailyValues: values
      });
    });
  });

  return {
    data: result,
    minYear,
    maxYear
  };
};