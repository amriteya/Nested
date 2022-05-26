(function(){
    treeUtils = {};
    treeUtils.findSize = function (node){
        let descendants = node.descendants();
        let nodeName = node.data.name;
        let childNodes = descendants.filter((d) => {
          if (d.parent !== null) {
            return (
              d.parent.data.name === nodeName || d.data.name === nodeName
            );
          } else {
            return d;
          }
        });
        return childNodes.length-1;
    }

})();