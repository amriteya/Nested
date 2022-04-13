(function () {
  //Events and Logic
  function dataPanelEventBinder() {
    $("#files").change(function () {
      var val = this.value;
      //Load new data and change current file
      dataProcessing.readFileSetupView(val);
    });
  }

  //Rendering
  dataPanelUI = {};

  dataPanelUI.header = function ()
  {
    var datapanelBody = $(`<div id="dataPanelBody"> </div>`);
    $("#dataPanel")
      .width(window.GLOBALDATA.panelWidth.dataPanel + "%")
      .append(datapanelBody);
      $("#dataPanelBody").append(`<div class="panelHeader align-middle p-1 bg-light text-dark"> Input </div>`)
  }

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
