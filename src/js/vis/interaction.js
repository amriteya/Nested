(function () {
  interaction = {};
  interaction.highlightNodeWithLinks = function (id, event) {
    if (event === "select") {
      d3.selectAll(".node").style("opacity", "0.2");
      d3.selectAll(".link").style("opacity", "0.2");
      d3.selectAll("#" + id).style("opacity", "1");
      // var top = $("#" + id).position().top - 400;
      // console.log(top);
      // $("#visOutput").animate({ scrollTop: top + "px" }, 1000);
    } else {
      d3.selectAll(".node").style("opacity", "1");
      d3.selectAll(".link").style("opacity", "1");
    }
  };

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

  interaction.highlightPath = function (nodes, event) {
    if (event === "select") {
      d3.selectAll(".node").transition().duration("50").style("opacity", ".3");
      d3.selectAll(".link").transition().duration("50").style("opacity", ".1");
      nodes.forEach((val) => {
        d3.selectAll("#node_" + val.index)
          .transition()
          .duration("100")
          .style("opacity", "1");
      });

      for (var i = 0; i < nodes.length; i++) {
        for (var j = 0; j < nodes.length; j++) {
          d3.selectAll(`#node_${nodes[i].index}-node_${nodes[j].index}`)
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

  interaction.highlightPathWithNoLinks = function (nodes, event) {
    if (event === "select") {
      d3.selectAll(".node").transition().duration("50").style("opacity", ".3");
      d3.selectAll(".link").transition().duration("50").style("opacity", ".1");
      nodes.forEach((val) => {
        d3.selectAll(`#node_${val.index}_${val.depth}`)
          .transition()
          .duration("100")
          .style("opacity", "1");
      });
    } else {
      d3.selectAll(".node").transition().duration("50").style("opacity", "1");
      d3.selectAll(".link").transition().duration("50").style("opacity", "1");
    }
  };

  interaction.appendTitle = function (d, options) {
    let combinedString = [];
    if (options.ancestors) {
      combinedString.push(
        `Hierarchy: ${d
          .ancestors()
          .reverse()
          .map((d) => d.data.name)
          .join(".")}`
      ); // hover text
    }
    if (options.nodeValue.status) {
      combinedString.push(`Value: ${d.value}`); // hover text
    }
    if (options.size) {
      combinedString.push(`Size: ${d.descendants().length}`);
    }
    if (options.height) {
      combinedString.push(`Height: ${d.height}`);
    }
    if (options.depth) {
      combinedString.push(`Depth: ${d.depth}`);
    }
    if (options.degree) {
      combinedString.push(`Degree: ${treeUtils.findSize(d)}`);
    }

    //Combined Results
    let finalResult = combinedString.join("\n");
    return finalResult;
  };
})();
