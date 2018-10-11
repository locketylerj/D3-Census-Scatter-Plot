// @TODO: YOUR CODE HERE!
// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");
  
    // clear svg is not empty
    if (!svgArea.empty()) {
      svgArea.remove();
    }
  
    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
  
    var margin = {
      top: 50,
      bottom: 50,
      right: 50,
      left: 50
    };
  
    var height = svgHeight - 4*margin.top;
    var width = svgWidth - 4*margin.left - 4*margin.right;
  
    // Append SVG element
    var svg = d3
      .select("#scatter")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);
  
    // Append group element
    var chartGroup = svg.append("g")
    // Move chart area to the top left coordinates. 
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    // Read CSV
    d3.csv("data/CensusData.csv"). then(function(CensusData) {
    
    // console.log(CensusData);

      // parse data
      CensusData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.healthcare = +data.healthcare;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
      });
  
      // create scales
      var xScale = d3.scaleLinear()
        .domain([d3.min(CensusData, d => d.income)-1000, d3.max(CensusData, d => d.income)])
        .range([0, width]);
  
      var yScale = d3.scaleLinear()
        .domain([d3.min(CensusData, d => d.smokes)-3, d3.max(CensusData, d => d.smokes)+3])
        .range([height, 0]);
  
      // create axes
      var xAxis = d3.axisBottom(xScale);
      var yAxis = d3.axisLeft(yScale);
  
      // add x axis to a group and move the x axis to the bottom of the chart area. 
      chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

      // add y axis to a group. 
      chartGroup.append("g")
        .call(yAxis);
  
      // create circles for data points

      var circlesGroup = chartGroup.selectAll("circle")
      .data(CensusData)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.income))
      .attr("cy", d => yScale(d.smokes))
      .attr("class", "stateCircle")
      .attr("r", "10")
      .attr("fill", "blue")
      .attr("opacity", ".5");

      var textGroup = chartGroup.append("g")
      .selectAll("text")
      .data(CensusData)
      .enter()
      .append("text")
      .text(d => d.abbr)
      .attr('font-size',8)
      .attr('fill',"white")
      .attr("dx", d => xScale(d.income)-5)
      .attr("dy", d => yScale(d.smokes)+3);

      
      // Step 1: Append tooltip div
      var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Income Level: ${d.income}<br>Smokers: ${d.smokes}`);
      });
      
      chartGroup.call(toolTip);
      // Step 2: Create "mouseover" event listener to display tooltip
      circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this)
        d3.select(this)
        .transition()
        .attr("class", "active")
        ;
      })
        // Step 3: Create "mouseout" event listener to hide tooltip
        .on("mouseout", function(data, index) {
          toolTip.hide(data)
          d3.select(this)
          .transition()
          .duration(1000)
          .attr("class", "stateCircle")
          // circlesGroup.select(this)
          // .attr("class","inactive:hover")
          ;
        });

        // Create axes labels
      chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height/2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Smokers (%)");

      chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 5})`)
      .attr("class", "axisText")
      .text("Income Level (Median)");
  
    });
}
  
// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);
