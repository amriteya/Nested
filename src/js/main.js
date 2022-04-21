(function () {
  //load data and render the task and recommendation panel
  //main ui panel rendering
  let defaultFileName = "flare";
  dataProcessing.readFileSetupView(defaultFileName);
  //set the default vis name
  //this should go to recommendation
  window.GLOBALDATA.currentVis = "nodelink";

  //Drawing header of the panels
  renderingControl.onInitialLoad();

})();
