(function () {
    infoTable = {};

    //Create a compare table
    infoTable.createCompareTable = function ()
    {
        $("#visOutput").append(`<div id="comparetablecontainer" class="infotable">  </div>`)
    };
    
    //Populate the compare table
    //info: [{nodeLabel:"flare", valueLabel:"Degree", value: 50}]
    infoTable.populateCompareTable = function (info = [{nodeLabel:"flare", valueLabel:"Degree", value: 50},{nodeLabel:"analytics", valueLabel:"Degree", value: 25}])
    {
        $("#comparetablecontainer").append(`<table id="comparetable" class="visinfotable"> </table> `)
        //create table row
        let tableColumnHeaders = ["Node",info[0]["valueLabel"]];
        $("#comparetable").append(`<tr class="tablerow" id="tablerowheader"></tr>`)
        let headerItems = [];
        for(let element of tableColumnHeaders)
        {
            headerItems.push(`<th class="tableheader">${element}</th>`);
        }
        let headerItemsHTML = headerItems.join("");
        console.log(headerItemsHTML);
        $("#tablerowheader").append(headerItemsHTML);

        //create table data
        let tableDataItem = [];
        for(let element of info)
        {
            let tableDataRow; 
            $("#comparetable").append(`<tr class="tablerow" id= ${element["nodeLabel"]}> </tr>`)
 
            $(`#${element["nodeLabel"]}`).append(`<th class="tabledata">${element["nodeLabel"]}</th>`)
            $(`#${element["nodeLabel"]}`).append(`<th class="tabledata">${element["value"]}</th>`)

        }

    }


})();