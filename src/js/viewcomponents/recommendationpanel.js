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
    let chart = dendrogram.createDendrogram(data, {
        label: d => d.name,
        title: (d, n) => `${n.ancestors().reverse().map(d => d.data.name).join(".")}`, // hover text
        link: (d, n) => `https://github.com/prefuse/Flare/${n.children ? "tree" : "blob"}/master/flare/src/${n.ancestors().reverse().map(d => d.data.name).join("/")}${n.children ? "" : ".as"}`,
        width: 1152
      })
    $("#visOutput").append(chart);
    
  };
})();
