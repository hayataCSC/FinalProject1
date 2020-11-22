//Define Fnc to clear graph elements
var clear = function(){
    //Clear elements from first SVG
    d3.select(".unempS").remove()
        
    //Clear elements from second SVG
    d3.select(".unempR").remove()
    
    //Clear elements from third SVG
    d3.select(".moneyS").remove()
    
    //Clear elements from forth SVG
    d3.select(".moneyR").remove()
    
    //Clear legends
    d3.select(".aLegend").remove()
}

//Get inflation rate
var getInf = function(aYear)
{
    return aYear.inf;
}

//Get unemployment rate
var getUnemp = function(aYear)
{
    return aYear.unemp;
}

//Get correlation coefficient for unemployment
var getR = function(aYear)
{
    return aYear.r;
}

//Get money supply
var getMoney = function(aYear)
{
    return aYear.money;
}

//Get correlation coefficient for money supply
var getMoneyR = function(aYear)
{
    return aYear.moneyR;
}

//Difine fnc to draw plots for unemployment
var drawPlot = function(d, graph, margins, xScale, yScale)
{
    console.log("drawPlot was called");
    
    //Create circles
    d3.select(".unempS")
        //Create group for circles
        .append("g")
        .classed("graph", true)
        //Move g
        .attr("transform",
              "translate(" + margins.left + "," + margins.top + ")")
        //Bind data with circles
        .selectAll("circle")
        .data(d)
        .enter()
        .append("circle")
        //Position circles
        .attr("cx", function(d){return xScale(d.unemp);})
        .attr("cy", function(d){return yScale(d.inf);})
        .attr("r", 4)
        .attr("class", function(d){
            if (d.year < 1970) {return "d60s"}
            else if (d.year < 1980) {return "d70s"}
            else if (d.year < 1990) {return "d80s"}
            else if (d.year < 2000) {return "d90s"}
            else if (d.year < 2010) {return "d00s"}
            else {return "d10s"}
        })
        
        //Categorize by time periods using colors
        .attr("fill", function(d){
            if (d.year < 1970) {return "red"}
            else if (d.year < 1980) {return "violet"}
            else if (d.year < 1990) {return "orange"}
            else if (d.year < 2000) {return "green"}
            else if (d.year < 2010) {return "blue"}
            else {return "purple"}
        })
        //Add tooltip
        .on("mouseenter", function(d){
        
            console.log("hovering");
        
            //Get mouse position
            var xPos = d3.event.pageX;
            var yPos = d3.event.pageY;
        
            //Position tooltip
            d3.select("#tooltip")
                .classed("hidden", false)
                .style("left", xPos+"px")
                .style("top", yPos+"px")
        
            //Show values inside tooltip
            d3.select("#year")
                .text("Year: " + d.year)
            d3.select("#xValue")
                .text("Unemp Rate: " + d.unemp)
            d3.select("#yValue")
                .text("Inf Rate: " + d.inf)
        })
        //Hide tooltip
        .on("mouseleave", function(d){
            
            console.log("mouse left");
        
            d3.select("#tooltip")
                .classed("hidden", true)
        })
}

//Define fnc to draw labels for unemployment
var drawLabels = function(d, graph, margins, xScale, yScale)
{
    console.log("makeLabels was called");
    
    //draw title label
    d3.select(".unempS")
        .append("text")
        .text("Unemployment vs. Inflation Rate")
        .classed("title", true)
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (margins.left+graph.width/2) + "," + (margins.top-20) + ")")
    
    //Draw x label
    d3.select(".unempS")
        .append("text")
        .text("Unemployment Rate")
        .classed("xLabel", true)
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (margins.left+graph.width/2) + "," + (margins.top+graph.height+50) + ")")
    
    //Draw y label
    d3.select(".unempS")
        .append("g")
        .attr("transform", "translate(" + 30 + "," + (margins.top+graph.width/2) + ")")
        .append("text")
        .text("Inflation Rate")
        .classed("yLabel", true)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(90)")
}

//Define fnc to draw axes for unemployment
var drawAxes = function(d, graph, margins, xScale, yScale)
{
    console.log("drawAxes was called");
    
    //Define fncs for drawing axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    //Draw x axis
    d3.select(".unempS")
        .append("g")
        .classed("xAxis", true)
        .attr("transform", "translate(" + margins.left + "," + (margins.top + graph.height) + ")")
        .call(xAxis)
    
    //Draw y axis
    d3.select(".unempS")
        .append("g")
        .classed("yAxis", true)
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
        .call(yAxis)
}

//Define fnc to draw legends
var drawLegends = function(d)
{
    console.log("drawLegends was called");
    
    //Show up the note
    d3.select("#note").classed("hidden2", false);
    
    var decade = ["d60s", "d70s", "d80s", "d90s", "d00s", "d10s"];
    
    var decade = [
        {name: "60s", class: "d60s"},
        {name: "70s", class: "d70s"},
        {name: "80s", class: "d80s"},
        {name: "90s", class: "d90s"},
        {name: "00s", class: "d00s"},
        {name: "10s", class: "d10s"}
        ]
    
    //Create group for legends
    var legend = d3.select("#legend")
        .append("g")
        .classed("aLegend", true)
    
    //Bind each legend with category
    var entries = legend.selectAll("g")
        .data(decade)
        .enter()
        .append("g")
        .attr("transform", function(aDecade, index)
        {
            return "translate(0," + index*40 + ")";
        })
        //Assign color
        .attr("fill", function(aDecade)
        {
            if (aDecade.class == "d60s") {return "red"}
            else if (aDecade.class == "d70s") {return "violet"}
            else if (aDecade.class == "d80s") {return "orange"}
            else if (aDecade.class == "d90s") {return "green"}
            else if (aDecade.class == "d00s") {return "blue"}
            else {return "purple"}
        })
        .on("click", function(aDecade)
        {
            console.log("Legend was clicked");
            
            var on = ! d3.select(this).classed("off");
            
            if(on){
                d3.select(this)
                    .classed("off", true)
                d3.selectAll("." + aDecade.class)
                    .classed("off", true)
            } else {
                d3.select(this)
                    .classed("off", false)
                d3.selectAll("." + aDecade.class)
                    .classed("off", false)
            }
        })
    
    //Add rectangle for each legend
    entries.append("rect")
        .attr("width",30)
        .attr("height",30)
    
    //Add name for each legend
    entries.append("text")
        .text(function(aDecade){return aDecade.name;})
        .attr("x",50)
        .attr("y",20)  
}

//Define fnc to initialize unemployment scatter plot
var initUnempGraph = function(d, sizes)
{
    console.log("initUnempGraph was called");
    
    //Set screen size
    var screen = {width: sizes[0].width, height: sizes[0].height};
    
    //Apply screen size
    d3.select("#firstGraph")
        .attr("width", screen.width)
        .attr("height", screen.height)
        .append("g")
        .classed("unempS", true)
    
    //Set margins
    var margins = {top: sizes[1].top, right: sizes[1].right, bottom: sizes[1].bottom, left: sizes[1].left};
    
    //Set graph size
    var graph = {
        width: screen.width - margins.right - margins.left,
        height: screen.height - margins.top - margins.bottom
    }
    
    //Define x scale fnc for unemployment rate
    var xScale = d3.scaleLinear()
        .domain([d3.min(d, getUnemp), d3.max(d, getUnemp)])
        .range([0, graph.width])
    
    //Define y scale fnc for inflation rate
    var yScale = d3.scaleLinear()
        .domain([d3.min(d, getInf), d3.max(d, getInf)])
        .range([graph.height, 0])
        
    //Draw plot
    drawPlot(d, graph, margins, xScale, yScale);
    
    //Draw labels
    drawLabels(d, graph, margins, xScale, yScale);
    
    //Draw axes
    drawAxes(d, graph, margins, xScale, yScale);
    
    //Draw Legends
    drawLegends(d, margins)
}

//Difine fnc to draw line graph for unemployment correlation
var drawLineForR = function(d, graph, margins, xScale, yScale)
{
    console.log("drawLineForR was called");
    
    //Define line generator
    var line = d3.line()
        .defined(function(aYear){return aYear.r;})
        .x(function(aYear) {
            return xScale(aYear.year);})
        .y(function(aYear) {
            return yScale(aYear.r);});
    
    
    //Create circles
    d3.select(".unempR")
        //Create group for circles
        .append("g")
        .classed("graph", true)
        //Move g
        .attr("transform",
              "translate(" + margins.left + "," + margins.top + ")")
        //Bind data with circles
        .append("path")
        .classed("line", true)
        .datum(d)
        .attr("d", line);
}

//Define fnc to draw labels for unemployment correlation graph
var drawLabelsForR = function(d, graph, margins, xScale, yScale)
{
    console.log("drawLabelsForR was called");
    
    //draw title label
    d3.select(".unempR")
        .append("text")
        .text("R btw Unemp and Inf")
        .classed("title", true)
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (margins.left+graph.width/2) + "," + (margins.top-20) + ")")
    
    //Draw x label
    d3.select(".unempR")
        .append("text")
        .text("Period")
        .classed("xLabel", true)
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (margins.left+graph.width/2) + "," + (margins.top+graph.height+50) + ")")
    
    //Draw y label
    d3.select(".unempR")
        .append("g")
        .attr("transform", "translate(" + 30 + "," + (margins.top+graph.width/2) + ")")
        .append("text")
        .text("Correlation Coefficient")
        .classed("yLabel", true)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(90)")
}

//Define fnc to draw axes for unemployment correlation graph
var drawAxesForR = function(d, graph, margins, xScale, yScale)
{
    console.log("drawAxesForR was called");
    
    //Define fncs for drawing axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    //Draw x axis
    d3.select(".unempR")
        .append("g")
        .classed("xAxis", true)
        .attr("transform", "translate(" + margins.left + "," + (margins.top + graph.height) + ")")
        .call(xAxis)
    
    //Draw y axis
    d3.select(".unempR")
        .append("g")
        .classed("yAxis", true)
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
        .call(yAxis)
}

//Define fnc to initialize unemployment correlation line graph
var initUnempR = function(d, sizes)
{
    console.log("initUnempR was called")
    
    //Set screen size
    var screen = {width: sizes[0].width, height: sizes[0].height};
    
    //Apply screen size
    d3.select("#secondGraph")
        .attr("width", screen.width)
        .attr("height", screen.height)
    //Create group for all graph elements
        .append("g")
        .classed("unempR", true)
    
    //Set margins
    var margins = {top: sizes[1].top, right: sizes[1].right, bottom: sizes[1].bottom, left: sizes[1].left};
    
    //Set graph size
    var graph = {
        width: screen.width - margins.right - margins.left,
        height: screen.height - margins.top - margins.bottom
    }
    
    //Define x scale fnc for year
    var xScale = d3.scaleLinear()
        .domain([1970, 2019])
        .range([0, graph.width])
    
    //Define y scale fnc for inflation rate
    var yScale = d3.scaleLinear()
        .domain([d3.min(d, getR), d3.max(d, getR)])
        .range([graph.height, 0])
    
     //Draw plot
    drawLineForR(d, graph, margins, xScale, yScale);
    
    //Draw labels
    drawLabelsForR(d, graph, margins, xScale, yScale);
    
    //Draw axes
    drawAxesForR(d, graph, margins, xScale, yScale);
}

//Difine fnc to draw plots for money supply
var drawMoneyPlot = function(d, graph, margins, xScale, yScale)
{
    console.log("drawMoneyPlot was called");
    
    //Create circles
    d3.select(".moneyS")
        //Create group for circles
        .append("g")
        .classed("graph", true)
        //Move g
        .attr("transform",
              "translate(" + margins.left + "," + margins.top + ")")
        //Bind data with circles
        .selectAll("circle")
        .data(d)
        .enter()
        .append("circle")
        //Filter data
        .filter(function(aYear) {return aYear.money})
        //Position circles
        .attr("cx", function(d){return xScale(d.money);})
        .attr("cy", function(d){return yScale(d.inf);})
        .attr("r", 4)
        .attr("class", function(d){
            if (d.year < 1970) {return "d60s"}
            else if (d.year < 1980) {return "d70s"}
            else if (d.year < 1990) {return "d80s"}
            else if (d.year < 2000) {return "d90s"}
            else if (d.year < 2010) {return "d00s"}
            else {return "d10s"}
        })
        
        //Categorize by time periods using colors
        .attr("fill", function(d){
            if (d.year < 1970) {return "red"}
            else if (d.year < 1980) {return "violet"}
            else if (d.year < 1990) {return "orange"}
            else if (d.year < 2000) {return "green"}
            else if (d.year < 2010) {return "blue"}
            else {return "purple"}
        })
        //Add tooltip
        .on("mouseenter", function(d){
        
            console.log("hovering1");
        
            //Get mouse position
            var xPos = d3.event.pageX;
            var yPos = d3.event.pageY;
        
            //Position tooltip
            d3.select("#tooltip1")
                .classed("hidden1", false)
                .style("left", xPos+"px")
                .style("top", yPos+"px")
        
            //Show values inside tooltip
            d3.select("#year1")
                .text("Year: " + d.year)
            d3.select("#xValue1")
                .text("Change in M: " + d.money.toFixed(3))
            d3.select("#yValue1")
                .text("Inf Rate: " + d.inf)
        })
        //Hide tooltip
        .on("mouseleave", function(d){
            
            console.log("mouse left");
        
            d3.select("#tooltip1")
                .classed("hidden1", true)
        })
}

//Define fnc to draw labels for money supply
var drawMoneyLabels = function(d, graph, margins, xScale, yScale)
{
    console.log("makeMoneyLabels was called");
    
    //draw title label
    d3.select(".moneyS")
        .append("text")
        .text("Money Supply vs. Inflation Rate")
        .classed("title", true)
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (margins.left+graph.width/2) + "," + (margins.top-20) + ")")
    
    //Draw x label
    d3.select(".moneyS")
        .append("text")
        .text("Annual change in money supply")
        .classed("xLabel", true)
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (margins.left+graph.width/2) + "," + (margins.top+graph.height+50) + ")")
    
    //Draw y label
    d3.select(".moneyS")
        .append("g")
        .attr("transform", "translate(" + 30 + "," + (margins.top+graph.width/2) + ")")
        .append("text")
        .text("Inflation Rate")
        .classed("yLabel", true)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(90)")
}

//Define fnc to draw axes for money supply
var drawMoneyAxes = function(d, graph, margins, xScale, yScale)
{
    console.log("drawMoneyAxes was called");
    
    //Define fncs for drawing axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    //Draw x axis
    d3.select(".moneyS")
        .append("g")
        .classed("xAxis", true)
        .attr("transform", "translate(" + margins.left + "," + (margins.top + graph.height) + ")")
        .call(xAxis)
    
    //Draw y axis
    d3.select(".moneyS")
        .append("g")
        .classed("yAxis", true)
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
        .call(yAxis)
}

//Define fnc to initialize money scatter plot
var initMoneyGraph = function(d, sizes)
{
    console.log("initMoneyGraph was called");
    
    //Set screen size
    var screen = {width: sizes[0].width, height: sizes[0].height};
    
    //Apply screen size
    d3.select("#thirdGraph")
        .attr("width", screen.width)
        .attr("height", screen.height)
        .append("g")
        .classed("moneyS", true)
    
    //Set margins
    var margins = {top: sizes[1].top, right: sizes[1].right, bottom: sizes[1].bottom, left: sizes[1].left};
    
    //Set graph size
    var graph = {
        width: screen.width - margins.right - margins.left,
        height: screen.height - margins.top - margins.bottom
    }
    
    //Define x scale fnc for unemployment rate
    var xScale = d3.scaleLinear()
        .domain([d3.min(d, getMoney), d3.max(d, getMoney)])
        .range([0, graph.width])
    
    //Define y scale fnc for inflation rate
    var yScale = d3.scaleLinear()
        .domain([d3.min(d, getInf), d3.max(d, getInf)])
        .range([graph.height, 0])
        
    //Draw plot
    drawMoneyPlot(d, graph, margins, xScale, yScale);
    
    //Draw labels
    drawMoneyLabels(d, graph, margins, xScale, yScale);
    
    //Draw axes
    drawMoneyAxes(d, graph, margins, xScale, yScale);
}

//Difine fnc to draw line graph for money correlation
var drawLineForMoneyR = function(d, graph, margins, xScale, yScale)
{
    console.log("drawLineForMoneyR was called");
    
    //Define line generator
    var line = d3.line()
        .defined(function(aYear){return aYear.moneyR;})
        .x(function(aYear) {
            return xScale(aYear.year);})
        .y(function(aYear) {
            return yScale(aYear.moneyR);});
    
    //Create circles
    d3.select(".moneyR")
        //Create group for circles
        .append("g")
        .classed("graph", true)
        //Move g
        .attr("transform",
              "translate(" + margins.left + "," + margins.top + ")")
        //Bind data with circles
        .append("path")
        .classed("line", true)
        .datum(d)
        .attr("d", line);
}

//Define fnc to draw labels for money correlation graph
var drawLabelsForMoneyR = function(d, graph, margins, xScale, yScale)
{
    console.log("drawLabelsForMoneyR was called");
    
    //draw title label
    d3.select(".moneyR")
        .append("text")
        .text("R btw Money and Inf")
        .classed("title", true)
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (margins.left+graph.width/2) + "," + (margins.top-20) + ")")
    
    //Draw x label
    d3.select(".moneyR")
        .append("text")
        .text("Period")
        .classed("xLabel", true)
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (margins.left+graph.width/2) + "," + (margins.top+graph.height+50) + ")")
    
    //Draw y label
    d3.select(".moneyR")
        .append("g")
        .attr("transform", "translate(" + 30 + "," + (margins.top+graph.width/2) + ")")
        .append("text")
        .text("Correlation Coefficient")
        .classed("yLabel", true)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(90)")
}

//Define fnc to draw axes for money correlation graph
var drawAxesForMoneyR = function(d, graph, margins, xScale, yScale)
{
    console.log("drawAxesForMoneyR was called");
    
    //Define fncs for drawing axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    //Draw x axis
    d3.select(".moneyR")
        .append("g")
        .classed("xAxis", true)
        .attr("transform", "translate(" + margins.left + "," + (margins.top + graph.height) + ")")
        .call(xAxis)
    
    //Draw y axis
    d3.select(".moneyR")
        .append("g")
        .classed("yAxis", true)
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
        .call(yAxis)
}

//Define fnc to initialize money correlation line graph
var initMoneyR = function(d, sizes)
{
    console.log("initMoneyR was called")
    
    //Set screen size
    var screen = {width: sizes[0].width, height: sizes[0].height};
    
    //Apply screen size
    d3.select("#forthGraph")
        .attr("width", screen.width)
        .attr("height", screen.height)
    
    //Create group for all graph elements
        .append("g")
        .classed("moneyR", true)
    
    //Set margins
    var margins = {top: sizes[1].top, right: sizes[1].right, bottom: sizes[1].bottom, left: sizes[1].left};
    
    //Set graph size
    var graph = {
        width: screen.width - margins.right - margins.left,
        height: screen.height - margins.top - margins.bottom
    }
    
    //Define x scale fnc for year
    var xScale = d3.scaleLinear()
        .domain([1970, 2019])
        .range([0, graph.width])
    
    //Define y scale fnc for inflation rate
    var yScale = d3.scaleLinear()
        .domain([d3.min(d, getMoneyR), d3.max(d, getMoneyR)])
        .range([graph.height, 0])
    
     //Draw plot
    drawLineForMoneyR(d, graph, margins, xScale, yScale);
    
    //Draw labels
    drawLabelsForMoneyR(d, graph, margins, xScale, yScale);
    
    //Draw axes
    drawAxesForMoneyR(d, graph, margins, xScale, yScale);
}

//Get data
var econPromise = d3.csv("data/econ.csv");

//When data was found...
var successFnc = function(data)
{
    
    console.log("successFnc was called");
    
    //Define screen variables
    var sizes = [
    {width: 500, height: 430},
    {top: 40, right: 30, bottom: 70, left: 80}
    ]
    
    d3.select("#us")
        .on("click", function()
        {
        
            console.log("US button was clicked");
        
            clear();
        
            //Convert string to int and float
            data.forEach(function(d) {
            d.year = parseInt(d.year);
            d.inf = parseFloat(d.us_inf);
            d.unemp = parseFloat(d.us_unemp);
            d.r = parseFloat(d.us_r_unemp);
            d.money = parseFloat(d.us_changeInM);
            d.moneyR = parseFloat(d.us_r_money);
            })
        
            console.log(data);
        
            //Change country title
            d3.select("#country")
                .text("US")
        
            //Draw unemployment graph
            initUnempGraph(data, sizes);
        
            //Draw correlation line graph
            initUnempR(data, sizes);
        
            //Draw money supply graph
            initMoneyGraph(data, sizes);
            
            //Draw money correlation line graph
            initMoneyR(data, sizes);
        })
    
    d3.select("#jp")
        .on("click", function()
        {
        
            console.log("JP button was clicked");
        
            clear();
        
            //Convert string to int and float
            data.forEach(function(d) {
            d.year = parseInt(d.year);
            d.inf = parseFloat(d.jp_inf);
            d.unemp = parseFloat(d.jp_unemp);
            d.r = parseFloat(d.jp_r_unemp);
            d.money = parseFloat(d.jp_changeInM);
            d.moneyR = parseFloat(d.jp_r_money);
            })
        
            console.log(data);
        
            //Change country title
            d3.select("#country")
                .text("Japan")
        
            //Draw unemployment graph
            initUnempGraph(data, sizes);
        
            //Draw correlation line graph
            initUnempR(data, sizes);
        
            //Draw money supply graph
            initMoneyGraph(data, sizes);
            
            //Draw money correlation line graph
            initMoneyR(data, sizes);
        })
    
    d3.select("#eu")
        .on("click", function()
        {
        
            console.log("EU button was clicked");
        
            clear();
        
            //Convert string to int and float
            data.forEach(function(d) {
            d.year = parseInt(d.year);
            d.inf = parseFloat(d.eu_inf);
            d.unemp = parseFloat(d.eu_unemp);
            d.r = parseFloat(d.eu_r_unemp);
            d.money = parseFloat(d.eu_changeInM);
            d.moneyR = parseFloat(d.eu_r_money);
            })
        
            console.log(data);
        
            //Change country title
            d3.select("#country")
                .text("EU")
        
            //Draw unemployment graph
            initUnempGraph(data, sizes);
        
            //Draw correlation line graph
            initUnempR(data, sizes);
        
            //Draw money supply graph
            initMoneyGraph(data, sizes);
            
            //Draw money correlation line graph
            initMoneyR(data, sizes);
        })

}

//When data was NOT found...
var failFnc = function(error)
{
    console.log(error);
}

//When data retrieval is finished
econPromise.then(successFnc, failFnc);