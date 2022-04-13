(function () {
  //load data and render the task and recommendation panel
  //main ui panel rendering
  let defaultFileName = "flare";
  dataProcessing.readFileSetupView(defaultFileName);

  //Drawing header of the panels
  dataPanelUI.header();
  dataPanelUI.selectDropDown();
  taskPanelUI.header();
  recPanelUI.header();  

})();
