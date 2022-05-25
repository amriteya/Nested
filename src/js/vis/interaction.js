(function () {
  interaction = {};
  interaction.highlightDescendantsNoLink = function (descendants, event) {
    if (event === "select") {
      d3.selectAll(".node").transition().duration("50").style("opacity", ".3");
      d3.selectAll(".link").transition().duration("50").style("opacity", ".1");

      // d3.select("#" + id)
      //   .transition()
      //   .duration("100")
      //   .style("opacity", "1");
      descendants.forEach((val) => {
        d3.select(`#node_${val.index}_${val.depth}`)
          .transition()
          .duration("100")
          .style("opacity", "1");
      });
      // for (var i = 0; i < descendants.length - 1; i++){
      //   for(var j = 1; j< descendants.length; j++)
      //   {
      //     d3.select(
      //       `#node_${descendants[i].index}-node_${descendants[j].index}`
      //        )
      //       .transition()
      //       .duration("100")
      //       .style("opacity", "1");
      //   }
      // }
    } else {
      d3.selectAll(".node").transition().duration("50").style("opacity", "1");
      d3.selectAll(".link").transition().duration("50").style("opacity", "1");
    }
  };

  interaction.highlightDescendantsWithLinks = function (descendants, event) {
    if (event === "select") {
      d3.selectAll(".node").transition().duration("50").style("opacity", ".3");
      d3.selectAll(".link").transition().duration("50").style("opacity", ".1");

      // d3.select("#" + id)
      //   .transition()
      //   .duration("100")
      //   .style("opacity", "1");
      descendants.forEach((val) => {
        d3.selectAll("#node_" + val.index)
          .transition()
          .duration("100")
          .style("opacity", "1");
      });
      for (var i = 0; i < descendants.length - 1; i++) {
        for (var j = 1; j < descendants.length; j++) {
          d3.selectAll(
            `#node_${descendants[i].index}-node_${descendants[j].index}`
          )
            .transition()
            .duration("100")
            .style("opacity", "1");
        }
      }
    } else {
      d3.selectAll(".node").transition().duration("50").style("opacity", "1");
      d3.selectAll(".link").transition().duration("50").style("opacity", "1");
    }
  };

  //Siblings
  interaction.highlightSiblingsWithLinks = function (siblings, event) {
    if (event === "select") {
      d3.selectAll(".node").transition().duration("50").style("opacity", ".3");
      d3.selectAll(".link").transition().duration("50").style("opacity", ".1");
      siblings.forEach((val) => {
        d3.selectAll("#node_" + val.index)
          .transition()
          .duration("100")
          .style("opacity", "1");
      });
    } else {
      d3.selectAll(".node").transition().duration("50").style("opacity", "1");
      d3.selectAll(".link").transition().duration("50").style("opacity", "1");
    }
  };
  //Siblings 
  interaction.highlightSiblingsWithNoLinks = function (siblings, event) {
    if (event === "select") {
      d3.selectAll(".node").transition().duration("50").style("opacity", ".3");
      d3.selectAll(".link").transition().duration("50").style("opacity", ".1");
      siblings.forEach((val) => {
        d3.select(`#node_${val.index}_${val.depth}`)
          .transition()
          .duration("100")
          .style("opacity", "1");
      });
    } else {
      d3.selectAll(".node").transition().duration("50").style("opacity", "1");
      d3.selectAll(".link").transition().duration("50").style("opacity", "1");
    }
  };
})();
