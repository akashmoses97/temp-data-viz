/**
 * Global configuration for the Temperature Matrix Visualization.
 * 
 * Contains:
 * - Layout constants
 * - Temperature scale domain
 * - Month labels
 * - Author and assignment metadata
 * 
 * Centralizing these values improves maintainability
 * and avoids hard-coded constants across components.
 */

export const CONFIG = {
  metadata: {
    title: "Hong Kong Daily Temperature Visualization (10 Year Range)",
    subtitle: "Monthly Aggregation with Daily Mini Trends",
    author: "Akash Moses Guttedar",
    course: "CSCE 679 – Data Visualization",
    assignment: "Assignment 1 – Temperature Matrix View"
  },

  temperature: {
    min: 0,
    max: 40
  },

  months: [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ],

  svg: {
    width: 1200
  },

  margin: {
    top: 80,
    right: 100,
    bottom: 40,
    left: 140
  },

  cell: {
    width: 90,
    height: 70,
    padding: 10
  }
};