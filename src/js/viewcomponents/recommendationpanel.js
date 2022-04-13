(function () {
  recPanelUI = {};

  recPanelUI.header= function ()
  {
    var recPanel = $(`<div id="recPanelBody"> </div>`);
    $("#recommendationPanel")
      .width(window.GLOBALDATA.panelWidth.recommendationPanel + "%")
      .append(recPanel);
      $("#recPanelBody").append(`<div class="panelHeader p-1 bg-light text-dark"> Recommendation </div>`)
  }


  recPanelUI.renderRecommendation = function () {
    var data = window.GLOBALDATA.files[window.GLOBALDATA.currentFile]["data"];
    $("#recPanelBody").append("<div id='visOutput'> </div>");
    dendrogram.clear("visOutput");
    let chart = dendrogram.createDendrogram(data, {
        label: d => d.name,
        title: (d, n) => `${n.ancestors().reverse().map(d => d.data.name).join(".")}`, // hover text
        width: 1152
      })
    $("#visOutput").append(chart);
    
  };
})();
