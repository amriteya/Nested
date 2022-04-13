(function () {
  recPanelUI = {};

  recPanelUI.renderRecommendation = function () {
    var data = window.GLOBALDATA.files[window.GLOBALDATA.currentFile]["data"];
    $("#recPanelBody").append("<div id='visOutput'> </div>");
    dendrogram.createDendrogram("visOutput", data);
  };
})();
