(function () {
    recPanelUI = {};
  
    recPanelUI.renderRecommendation = function () {
      $("#recPanelBody").append("<div id='visOutput'> </div>");
      dendrogram.createDendrogram("visOutput")
    };
  })();