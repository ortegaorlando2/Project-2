// @TODO: YOUR CODE HERE!

const svgWidth = 960;
const svgHeight = 700;

const margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
const svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

let chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// append text element
let circlesTextGroup = chartGroup.append("g")

d3.csv("assets/data/final_HAR_df.csv").then(function (stateData) {
    console.log(stateData);

  // Step 1: Parse Data/Cast as numbers
  // ==============================
    stateData.forEach(function (data) {
        data.list_price = +data.list_price;
        data.bedrooms = +data.bedrooms;
    });

  // Step 2: Create scale functions
  // ==============================
    let xLinearScale = d3.scaleLinear()
    .domain([((d3.min(stateData, d=> d.list_price))-2), (d3.max(stateData, d => d.list_price))+3])
    // .domain([0, d3.max(stateData, d => d.poverty)])
    .range([0, width]);

    let yLinearScale = d3.scaleLinear()
    .domain([((d3.min(stateData, d=> d.bedrooms))-2), (d3.max(stateData, d => d.bedrooms))+2])
    // .domain([0, d3.max(stateData, d => d.healthcare)])
    .range([height, 0]);

  // Step 3: Create axis functions
//   // ==============================
    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  // ==============================
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);

  // Step 5: Create Circles
  // // ==============================
    circlesGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.list_price))
        .attr("cy", d => yLinearScale(d.bedrooms))
        .text(d => d.abbr)
        .attr("r", "20")
        .style("font-weight", "bold")
        .attr("fill", "navy")
        .attr("stroke", "black")
        .attr("opacity", ".3");  
        
    textGroup = circlesTextGroup.selectAll("text")
        .data(stateData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .style("font-weight", "bold")
        .attr("x", d => xLinearScale(d.list_price))
        .attr("y", d => yLinearScale(d.bedrooms))
        .classed("stateText", true);
        // .attr("class", "stateText")
    
    
  // Step 6: Initialize tool tip
  // ==============================
    let toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function (d) {
            return (`${d.zip}<br>List Price USD: ${d.list_price}<br>Bedrooms: ${d.bedrooms}`);
    });

  // Step 7: Create tooltip in the chart
  // ==============================
    chartGroup.call(toolTip);

  // Step 8: Create event listeners to display and hide the tooltip
  // ==============================
    circlesGroup.on("mouseover", function (data) {
    toolTip.show(data, this);
    })
    // onmouseout event
    .on("mouseout", function (data, index) {
        toolTip.hide(data);
    });

  // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 1.5))
        // .attr("dy", "1em")
        .attr("class", "axisText")
        .style("fill", "black")
        .style("font", "20px sans-serif")
        .style("font-weight", "bold")
        .text("Quantity of Rooms");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .style("font", "20px sans-serif")
        .style("font-weight", "bold")
        .text("List Price ($)");

    }).catch(function (error) {
    console.log(error);
});

// circle text help:
// https://observablehq.com/@abebrath/scatterplot-of-text-labels