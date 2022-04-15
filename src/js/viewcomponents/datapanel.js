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

  //File Drop Down Panel
  dataPanelUI.selectDropDown = function () {
    //View
    $("#dataPanelBody").append(
      `<div class="dataInputPanelContainer"><span class="headerText">Try a Hierarchy</span><select id='files'> </select> </div>`
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

  //Upload button
  dataPanelUI.uploadFile = function () {
    let uploadBtn = `
    <div id="uploadPanel" class="dataInputPanelContainer">
    <label class="form-label headerText" for="customFile"> or Upload</label>
    <input type="file" class="form-control" id="customFileUpload" />
    </div>`;
    $("#dataPanelBody").append(uploadBtn);

    //Event
    $("#customFileUpload").change(function (event) {
      var uploadedFile = event.target.files[0];

      if (uploadedFile) {
        var readFile = new FileReader();
        readFile.onload = function (e) {
          var contents = e.target.result;
          var json;
          try {
            json = JSON.parse(contents);
          } catch (e) {
            alert("Wrong file type == " + uploadedFile.type);
          }
          console.log(json);
        };
        readFile.readAsText(uploadedFile);
      } else {
        console.log("Failed to load file");
      }
    });
  };

  //Attribute button
  dataPanelUI.attrSelectionBtn = function () {
    $("#attrSelection").remove();  
    let attrHeader = `<div id="attrSelection" class="dataInputPanelContainer"> 
    <span class="headerText"> Node-Size Mapping  </span>
    <i title="Select an attribute that you want to use for node size. By default, node sizes are mapped to the number of child nodes." class="fas fa-info-circle"></i>
    </div>`;

    $("#dataPanelBody").append(attrHeader);

    //Adding the button pills
    let file = window.GLOBALDATA.currentFile;
    let values = window.GLOBALDATA.files[file]["values"];
    
    //First add the default pill
    let attrPills = `<button id="Degree" class="btn btn-secondary col-12 m-1"> Degree </>`
    for (value of values)
    {
        console.log(value)
        attrPills = attrPills.concat(`<button id=${value} class="btn btn-light col-12 m-1"> ${value} </>`)
    }

    $("#attrSelection").append(attrPills)

}

})();
