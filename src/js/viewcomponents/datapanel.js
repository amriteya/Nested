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
    $("#dataPanelBody").append(
      `<div class="dataInputPanelContainer"><span>Try a Hierarchy</span><select id='files'> </select> </div>`
    );
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
    let uploadBtn = `
    <div class="dataInputPanelContainer">
    <label class="form-label" for="customFile"> or Upload</label>
    <input type="file" class="form-control" id="customFile" />
    </div>`;
    $("#dataPanelBody").append(uploadBtn);
  };
})();
