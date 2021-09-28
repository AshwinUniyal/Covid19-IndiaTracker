//jshint esversion:6

$(document).ready(function() {

  // var alerted = sessionStorage.getItem('alerted') || '';
  //   if (alerted != 'yes') {
  //    alert("Stay Safe and Stay Happy \n ~Ashwin Uniyal");
  //    sessionStorage.setItem('alerted','yes');
  //   }

  $.get("https://api.rootnet.in/covid19-in/stats/latest", function(response) {

    const totalCases = response.statewise[0].confirmed;
    const activeCases = response.statewise[0].active;
    const recovered = response.statewise[0].recovered;
    const deaths = response.statewise[0].deaths;

    $(".confirmed").text(totalCases);
    $(".activeCases").text(activeCases);
    $(".recovered").text(recovered);
    $(".deaths").text(deaths);

///////////////////TABLE/////////////


    for(var i = 1; i < response.statewise.length; i++){
            $("table").append(`<tr>
               <th >${response.statewise[i].state}</th>
               <td >${response.statewise[i].confirmed}</td>
               <td >${response.statewise[i].active}</td>
               <td >${response.statewise[i].recovered}</td>
               <td >${response.statewise[i].deaths}</td>
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
        "figures": response.statewise[0].confirmed

      },
      {
        "case" : "Active Cases",
        "figures": response.statewise[0].active
      },
      {
        "case": "Recovered Patients",
        "figures": response.statewise[0].recovered
      },
      {
        "case": "Deaths",
        "figures": response.statewise[0].deaths
      }
    ];

    var series = chart.series.push(new am4charts.PieSeries3D());
series.dataFields.value = "figures";
series.dataFields.category = "case";
pieSeries.slices.template.propertyFields.fill = "color";
});






  });






});
