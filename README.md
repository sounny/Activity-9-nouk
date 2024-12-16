# Texas County Choropleth Map

This project creates a **choropleth map** of Texas counties using D3.js and TopoJSON, visualizing data (e.g., median home prices) with color-coded counties.

## Features
- **Choropleth Visualization**: Displays data values by county using a color scale.
- **TopoJSON Integration**: Simplifies and visualizes geographical data for efficient rendering.
- **Graticule Overlay**: Adds a graticule to enhance the map's visual context.
- **Responsive Design**: Optimized for various screen sizes using SVG elements.

## Project Files
### 1. `index.html`
Contains the structure of the webpage, including:
- Script imports for D3.js and TopoJSON.
- Basic styling.
- A container for rendering the map.

### 2. `main.js`
Handles all JavaScript functionality, including:
- Data loading using `Promise.all()` to fetch a CSV and TopoJSON file.
- D3.js-powered projection and path generation.
- Choropleth map creation using a color scale.
- Graticule generation for better geographical context.

### 3. `styles.css`
Defines the styling for the project:
- Basic page styles.
- Classes for SVG elements (e.g., `graticule`, `county`).

## Dependencies
- [D3.js v6](https://d3js.org/)
- [TopoJSON v3](https://github.com/topojson/topojson-client)
- CSS for additional styling.
