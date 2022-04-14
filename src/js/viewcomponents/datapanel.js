(function () {
  //Rendering
  dataPanelUI = {};

  dataPanelUI.header = function () {
    var datapanelBody = $(`<div id="dataPanelBody"> </div>`);
    $("#dataPanel")
      .width(window.GLOBALDATA.panelWidth.dataPanel + "%")
      .append(datapanelBody);
    $("#dataPanelBody").append(
      `<div class="panelHeader align-middle p-1 bg-light text-dark"> Input </div>`
    );
  };

  dataPanelUI.selectDropDown = function () {
    //View
    $("#dataPanelBody").append(`<div class="dataInputPanelContainer"><spanp>Select a Hierarchy</span><select id='files'> </select> </div>`);
    let dataFiles = window.GLOBALDATA.files;
    for (file in dataFiles) {
      $("#files").append(
        `<option value=${file}> ${dataFiles[file]["label"]} </option`
      );
    }
    //Events
    $("#files").change(function () {
      var val = this.value;
      //Load new data and change current file
      dataProcessing.readFileSetupView(val);
    });
  };

  dataPanelUI.uploadFile = function () {
   let uploadBtn = `<div class="dataInputPanelContainer"><button type="button" class="btn btn-light col-12"><i class="fas fa-plus"></i> Upload File</buton></div>`;
   $("#dataPanelBody").append(uploadBtn)
  };
})();
