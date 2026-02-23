# Temperature Trends: Monthly Matrix View of Hong Kong Temperature (Last 10 Years)

## Overview

This project visualizes daily temperature data for Hong Kong using a
matrix-based layout. Each cell represents one month within a dynamic
10-year window. The background color encodes aggregated monthly
temperature values, while embedded mini line charts show daily
temperature variation within each month.

The visualization combines:

-   Heatmap-style encoding (monthly aggregation)
-   Small multiple line charts (daily variation)
-   Interactive toggle (Max / Min temperature)
-   Hover tooltip for detailed values
-   Structured axis layout with rulers

This project was developed for:

**CSCE 679 -- Data Visualization**\
**Assignment 1 -- Temperature Matrix View**

------------------------------------------------------------------------

## Live Deployment

🔗 Live Demo:\
https://akashmoses97.github.io/temp-data-viz/


------------------------------------------------------------------------

## Features of the dashboard

-   Dynamic 10-year window calculation
-   Toggle between Monthly Maximum and Monthly Minimum view
-   Vertical temperature legend (fixed 0--40°C domain)
-   Year labels with tick marks
-   Month labels with vertical ruler
-   Embedded daily mini line charts
-   Hover tooltip displaying month and aggregated values

------------------------------------------------------------------------

## 🗂 Project Structure

    temp-data-viz/
    │
    ├── public/
    │   └── temperature_daily.csv
    │
    ├── src/
    │   ├── components/
    │   │   ├── TemperatureMatrix.jsx
    │   │   ├── MatrixCell.jsx
    │   │   ├── MiniLineChart.jsx
    │   │   ├── Legend.jsx
    │   │   └── Tooltip.jsx
    │   │
    │   ├── config/
    │   │   └── visualizationConfig.js
    │   │
    │   ├── utils/
    │   │   ├── dataProcessor.js
    │   │   └── scaleUtils.js
    │   │
    │   ├── App.jsx
    │   └── main.jsx
    │
    ├── AI/
    │   └── ai_interaction_log.txt
    │
    ├── index.html
    ├── eslint.config.js
    ├── vite.config.js
    ├── package.json
    ├── package-lock.json
    ├── .gitignore
    └── README.md

------------------------------------------------------------------------

## File Responsibilities

### public/

**temperature_daily.csv**\
Raw daily temperature dataset used for visualization (Extracted from assignment GitHub)

------------------------------------------------------------------------

### src/components/

**TemperatureMatrix.jsx**\
Main visualization container. Loads data, manages interaction state,
renders layout, legend, and tooltip.

**MatrixCell.jsx**\
Renders each monthly tile including background color and mini chart.

**MiniLineChart.jsx**\
Draws daily temperature variation using D3 with local scaling per month.

**Legend.jsx**\
Renders vertical temperature gradient with D3 axis ticks (0--40°C fixed
domain).

**Tooltip.jsx**\
Displays hover information for selected tile.

------------------------------------------------------------------------

### src/config/

**visualizationConfig.js**\
Centralized configuration containing: - Temperature scale domain -
Layout dimensions - Month labels - Project metadata

------------------------------------------------------------------------

### src/utils/

**dataProcessor.js**\
Loads CSV data, computes 10-year window, aggregates monthly max/min, and
preserves daily values.

**scaleUtils.js**\
Creates D3 color scale using centralized configuration.

------------------------------------------------------------------------

### AI/

**ai_interaction_log.txt**\
Contains documented interaction history with AI tools as required by the
assignment.

------------------------------------------------------------------------

## Technologies Used

-   React (Vite)
-   D3.js
-   SVG
-   GitHub Pages

------------------------------------------------------------------------

##  Running Locally

### Install dependencies

``` bash
npm install
```

### Start development server

``` bash
npm run dev
```

Open in browser:

    http://localhost:5173

------------------------------------------------------------------------

## Build for Production

``` bash
npm run build
```

Production files are generated inside:

    dist/

------------------------------------------------------------------------

##  Deployment (GitHub Pages)


``` bash
npm install gh-pages --save-dev
npm run deploy
```

------------------------------------------------------------------------

##  Visualization Encoding Summary

| Visual Element     | Encodes                                |
|--------------------|----------------------------------------|
| Tile Color         | Monthly max or min temperature         |
| Mini Line Charts   | Daily temperature variation            |
| Tooltip            | Aggregated monthly values              |
| Legend             | Fixed 0–40°C scale                     |
| Toggle             | Switch between max/min modes           |

------------------------------------------------------------------------

## Author

Akash Moses Guttedar\
CSCE 679 -- Data Visualization\
Assignment 1 -- Temperature Matrix View

------------------------------------------------------------------------

## License

This project is created for academic purposes.
