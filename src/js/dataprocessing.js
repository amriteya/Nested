(function () {
    
    dataProcessing = {};

    //read a file and render vis
    dataProcessing.readFileSetupView = function (fileKey)
    {
        window.GLOBALDATA.currentFile = fileKey;
        let fileName = window.GLOBALDATA.files[fileKey]["fileName"]
        d3.json("../assets/data/"+fileName)
        .then(data=>{
            window.GLOBALDATA.files[fileKey]["data"] = data;
            recPanelUI.renderRecommendation();

        });
    }

}());
