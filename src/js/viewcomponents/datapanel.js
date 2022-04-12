(function () {
  
  //Events and Logic

  
  //Rendering
  dataPanelUI = {};

  dataPanelUI.selectDropDown = function () {
    $("#dataPanelBody").append("<select id='files'> </select>");
    let dataFiles = window.GLOBALDATA.files;
    for (file in dataFiles) {
      $("#files").append(
        `<option value=${dataFiles[file]["fileName"]}> ${dataFiles[file]["label"]} </option`
      );
    }
  };
})();
