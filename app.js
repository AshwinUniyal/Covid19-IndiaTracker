//jshint esversion:6

$(document).ready(function() {

  // var alerted = sessionStorage.getItem('alerted') || '';
  //   if (alerted != 'yes') {
  //    alert("Stay Safe and Stay Happy \n ~Ashwin Uniyal");
  //    sessionStorage.setItem('alerted','yes');
  //   }

  $.get("https://api.rootnet.in/covid19-in/stats/latest", function(response) {

    const totalCases = response.data.summary.total;
    const activeCases = (response.data.summary.total-response.data.summary.discharged);
    const recovered = response.data.summary.discharged;
    const deaths = response.data.summary.deaths;

    $(".confirmed").text(totalCases);
    $(".activeCases").text(activeCases);
    $(".recovered").text(recovered);
    $(".deaths").text(deaths);

///////////////////TABLE/////////////


    for(var i = 1; i < response.data.regional.length; i++){
            $("table").append(`<tr>
              <th >${response.data.regional[i].loc}</th>
               <td >${response.data.regional[i].totalConfirmed}</td>
               <td >${response.data.regional[i].totalConfirmed-response.data.regional[i].discharged}</td>
               <td >${response.data.regional[i].discharged}</td>
               <td >${response.data.regional[i].deaths}</td>
             </tr>`);
        }
    ///////////PIE CHART////////////

    am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // am4core.useTheme(am4themes_kelly);
    // Themes end

    var chart = am4core.create("chartdiv", am4charts.PieChart3D);
chart.innerRadius = am4core.percent(40);

    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.legend = new am4charts.Legend();

    chart.data = [
      {
        "case": "Confirmed Cases",
        "figures": response.data.summary.total

      },
      {
        "case" : "Active Cases",
        "figures": response.data.summary.total-response.data.summary.discharged
      },
      {
        "case": "Recovered Patients",
        "figures": response.data.summary.discharged
      },
      {
        "case": "Deaths",
        "figures": response.data.summary.deaths
      }
    ];

    var series = chart.series.push(new am4charts.PieSeries3D());
series.dataFields.value = "figures";
series.dataFields.category = "case";
pieSeries.slices.template.propertyFields.fill = "color";
});






  });






});

