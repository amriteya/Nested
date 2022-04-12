(function () {
  //main ui panel rendering

  //Default Load flare.json
  async function loadData() {
    let defaultFileName = "flare";
    //all the processing related to file should happen here
    await dataProcessing.readFile(defaultFileName);
  }

  //load data and render the task and recommendation panel
  loadData().then(() => {
    mainUIPanel.dataPanel();
    mainUIPanel.taskPanel();
    mainUIPanel.recommendationPanel();
  });
})();
