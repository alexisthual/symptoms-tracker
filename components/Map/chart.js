import { geoPath, geoConicConformal } from "d3-geo";
import { scaleLinear, scaleQuantile } from "d3-scale";
import { axisLeft } from "d3-axis";
import { select, selectAll, mouse } from "d3-selection";
import { max, min, range } from "d3-array";

const colors = [
  "#FFEBE1", // Not enough answers
  "#FFD0BA",
  "#FEBC9C",
  "#FFA87F",
  "#FF8D58",
  "#FF8044",
  "#FE6C27",
  "#FF5200" // Enough answers
];
const LEGEND_HEIGHT = 300;
const LEGEND_SIZE = Math.ceil(LEGEND_HEIGHT / colors.length);

const REGION_HOVER_COLOR = "#333";

function addTooltip(svg) {
  var tooltip = svg
    .append("g") // Group for the whole tooltip
    .attr("id", "tooltip")
    .style("display", "none");

  tooltip
    .append("polyline") // The rectangle containing the text, it is 210px width and 60 height
    .attr("points", "0,0 210,0 210,150 0,150 0,0")
    .style("fill", "#222b1d")
    .style("stroke", "black")
    .style("opacity", "0.9")
    .style("stroke-width", "1")
    .style("padding", "1em");

  tooltip
    .append("line") // A line inserted between region name and score
    .attr("x1", 40)
    .attr("y1", 25)
    .attr("x2", 160)
    .attr("y2", 25)
    .style("stroke", "#929292")
    .style("stroke-width", "0.5")
    .attr("transform", "translate(0, 5)");

  var text = tooltip
    .append("text") // Text that will contain all tspan (used for multilines)
    .style("font-size", "13px")
    .style("fill", "#c1d3b8")
    .attr("transform", "translate(0, 20)");

  text
    .append("tspan") // Region name udpated by its id
    .attr("x", 105) // ie, tooltip width / 2
    .attr("y", 0)
    .attr("id", "tooltip-region")
    .attr("text-anchor", "middle")
    .style("font-weight", "600")
    .style("font-size", "16px");

  text
    .append("tspan") // Fixed text
    .attr("x", 105) // ie, tooltip width / 2
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .style("fill", "929292")
    .text("Réponses : ");

  text
    .append("tspan") // Score udpated by its id
    .attr("id", "tooltip-score")
    .style("fill", "#c1d3b8")
    .style("font-weight", "bold");

  text
    .append("tspan") // Fixed text
    .attr("x", 105) // ie, tooltip width / 2
    .attr("y", 60)
    .attr("text-anchor", "middle")
    .style("fill", "929292")
    .text("Malades :");

  text
    .append("tspan") // Score udpated by its id
    .attr("id", "tooltip-ill")
    .style("fill", "#c1d3b8")
    .style("font-weight", "bold");

  text
    .append("tspan") // Fixed text
    .attr("x", 105) // ie, tooltip width / 2
    .attr("y", 90)
    .attr("text-anchor", "middle")
    .style("fill", "929292")
    .text("Soignés :");

  text
    .append("tspan") // Score udpated by its id
    .attr("id", "tooltip-recovered")
    .style("fill", "#c1d3b8")
    .style("font-weight", "bold");

  text
    .append("tspan") // Fixed text
    .attr("x", 105) // ie, tooltip width / 2
    .attr("y", 120)
    .attr("text-anchor", "middle")
    .style("fill", "929292")
    .text("Bien portant :");

  text
    .append("tspan") // Score udpated by its id
    .attr("id", "tooltip-well")
    .style("fill", "#c1d3b8")
    .style("font-weight", "bold");

  return tooltip;
}

export const createChart = async ({ id, geojson, csv }) => {
  const width = document.getElementById(id).offsetWidth * 0.95;
  const height = 400;

  const path = geoPath();

  const projection = geoConicConformal() // Lambert-93
    .center([2.454071, 46.279229]) // Center on France
    .scale(2000)
    .translate([width / 2, height / 2]);

  path.projection(projection);

  const svg = select(`#${id}`)
    .append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "Blues");

  const deps = svg.append("g");

  // Draw regions
  deps
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("id", d => `code-${d.properties.code}`)
    .attr("d", path);

  var quantile = scaleQuantile()
    .domain([0, 100])
    .range(range(colors.length));

  // Create the legend
  var legend = svg.append("g").attr("transform", "translate(550, 25)");

  legend
    .selectAll()
    .data(range(colors.length))
    .enter()
    .append("svg:rect")
    .attr("height", `${LEGEND_SIZE}px`)
    .attr("width", `${LEGEND_SIZE}px`)
    .attr("x", 5)
    .attr("y", d => d * LEGEND_SIZE)
    .style("fill", d => colors[d]);

  // Create the legend scale (from 0% to 100%)
  const minLegend = min(csv, () => 0);
  const maxLegend = max(csv, () => 100);
  var legendScale = scaleLinear()
    .domain([minLegend, maxLegend])
    .range([0, colors.length * LEGEND_SIZE]);

  const legendAxis = legend
    .append("g")
    .attr("class", "axis")
    .call(axisLeft(legendScale));

  const tooltip = addTooltip(svg);

  //
  csv.forEach(function(e, i) {
    const { INSEE, TOTAL, REGION, ILL, WELL, RECOVERED, TARGET_PERCENT } = e;
    const region = select(`#code-${INSEE}`);
    const regionColor = colors[quantile(TARGET_PERCENT)];
    region.style("fill", () => regionColor).style("stroke-width", "0.5");

    region.on("mouseover", function(d) {
      region.style("stroke", REGION_HOVER_COLOR);
      tooltip.style("display", "block");
      tooltip.select("#tooltip-region").text(REGION);
      tooltip.select("#tooltip-score").text(TOTAL);
      tooltip.select("#tooltip-ill").text(ILL);
      tooltip.select("#tooltip-well").text(WELL);
      tooltip.select("#tooltip-recovered").text(RECOVERED);
    });

    region.on("mouseout", function() {
      region.style("fill", d => regionColor);
      region.style("stroke", "none");
      tooltip.style("display", "none");
      legend.select("#cursor").style("display", "none");
    });

    region.on("mousemove", function() {
      var [x, y] = mouse(this);
      tooltip.attr("transform", "translate(" + (x + 20) + "," + (y - 75) + ")");
    });
  });

  return Promise.resolve();
};
