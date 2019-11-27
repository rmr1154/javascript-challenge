
// select the table body
var tbody = d3.select("tbody");
// select the button
var button = d3.select("#filter-btn");

// attach our event handler
button.on("click", () => {
    // select the input element
    var inputDate = d3.select("#datetime").property("value");
    var inputCity = d3.select("#city").property("value");
    var inputState = d3.select("#state").property("value");
    var inputCountry = d3.select("#country").property("value");
    var inputShape = d3.select("#shape").property("value");

    // debug echo to console to test
    console.log(inputDate,inputCity,inputState,inputCountry,inputShape);

    // clear out any prior results!!!
    tbody.html("");

    // build our array object of filter criteria
    var query = {datetime:inputDate,city:inputCity,state:inputState,country:inputCountry,shape:inputShape};
    //debug to show raw query
    console.log(query);
    // clean our query so it only tries to filter on supplied values (ignore undefined, null or "")
    clean(query);
    //debug to validate cleaned query
    console.log(query);
    // filter out items from the data based on our cleaned query
    tableData = data.filter((item) => {
      for (var key in query) {
        if (item[key] === undefined || item[key] != query[key])
          return false;
      }
      return true;
    });

    // return alert if there is no data available
    if (tableData.length == 0) {
    alert(`No data to return for your search criteria please try again`)
    };
    
    // append the filtered array to our table body and pass to the browser
    tableData.forEach((ufoReport) => {
        var row = tbody.append("tr");
        Object.entries(ufoReport).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
      });

});


    // clean function to remove null, undefined, or empty string elements from an array
    function clean(obj) {
      for (var propName in obj) { 
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
          delete obj[propName];
        }
      }
    }