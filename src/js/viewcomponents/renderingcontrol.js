(function(){

    renderingControl = {};

    renderingControl.onInitialLoad = function ()
    {
        dataPanelUI.header();
        dataPanelUI.selectDropDown();  
        dataPanelUI.uploadFile();
        taskPanelUI.header();
        recPanelUI.header();  
        recPanelUI.recommendationInformation();
    }

    renderingControl.visUpdate = function ()
    {
        recPanelUI.renderRecommendation("nodelink");
        dataPanelUI.attrSelectionBtn();
        dataPanelUI.treeSummaryPanel();
    }


}());