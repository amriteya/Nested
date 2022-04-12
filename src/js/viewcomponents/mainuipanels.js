(function () {
  mainUIPanel = {};
  mainUIPanel.dataPanel = function () {
    //data panel
    var datapanelBody = $(`<div id="dataPanelBody"> </div>`);
    $("#dataPanel")
      .width(window.GLOBALDATA.panelWidth.dataPanel + "%")
      .append(datapanelBody);
      $("#dataPanelBody").append(`<div class="panelHeader align-middle p-1 bg-light text-dark"> Input </div>`)
      dataPanelUI.selectDropDown();
  };
  mainUIPanel.taskPanel = function () {
    //task panel
    var taskpanelBody = $(`<div id="taskPanelBody"> </div>`);
    $("#taskPanel")
      .width(window.GLOBALDATA.panelWidth.taskPanel + "%")
      .append(taskpanelBody);
      $("#taskPanelBody").append(`<div class="panelHeader p-1 bg-light text-dark"> Tasks</div>`)

  };
  mainUIPanel.recommendationPanel = function () {
    //rec panel
    var recPanel = $(`<div id="recPanelBody"> </div>`);
    $("#recommendationPanel")
      .width(window.GLOBALDATA.panelWidth.recommendationPanel + "%")
      .append(recPanel);
      $("#recPanelBody").append(`<div class="panelHeader p-1 bg-light text-dark"> Recommendation </div>`)
      recPanelUI.renderRecommendation();
  };
})();
