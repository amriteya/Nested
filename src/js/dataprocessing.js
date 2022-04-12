(function () {
    
    dataProcessing = {};

    //read a file
    dataProcessing.readFile = function (fileKey)
    {
        let fileName = window.GLOBALDATA.files[fileKey]["fileName"]
        d3.json("../assets/data/"+fileName).then(data=>{
            window.GLOBALDATA.files[fileKey]["data"] = data;
        });
    }

}());
