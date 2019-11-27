
// select the table body
var tbody = d3.select("tbody");
// select the button
var button = d3.select("#filter-btn");

// attach our event handler
button.on("click", () => {
    // select the input element
    var inputElement = d3.select("#datetime");
    // get the value of the element
    var inputValue = inputElement.property("value");
    // debug echo to console to test
    console.log(inputValue);

    // clear out any prior results!!!
    tbody.html("");
    
    // filter function 
    function selectDate(dateval){
        return dateval.datetime == inputValue;
    }

    // apply our filter
    var tableData = data.filter(selectDate);

    // return alert if there is no data available and include a distinct list of valid dates to prompt the user
    if (tableData.length == 0) {
      const distinctDates = [...new Set(data.map(x => x.datetime))];
    alert(`No data to return for the Date \n     ${inputValue}     \nplease try a different Date\nValid Dates:\n${distinctDates.join("\n")}`)
    };
    
    // append the filtered array to our table body
    tableData.forEach((ufoReport) => {
        var row = tbody.append("tr");
        Object.entries(ufoReport).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
      });

});


