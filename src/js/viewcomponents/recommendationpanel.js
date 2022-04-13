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
    dendrogram.createDendrogram("visOutput", data);
  };
})();
