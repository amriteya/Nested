(function () {
  //Events and Logic
  function dataPanelEventBinder() {
    $("#files").change(function () {
      var val = this.value;
      //Load new data and change current file
    });
  }

  //Rendering
  dataPanelUI = {};

  dataPanelUI.selectDropDown = function () {
    $("#dataPanelBody").append("<select id='files'> </select>");
    let dataFiles = window.GLOBALDATA.files;
    for (file in dataFiles) {
      $("#files").append(
        `<option value=${file}> ${dataFiles[file]["label"]} </option`
      );
    }
    dataPanelEventBinder();
  };
})();
