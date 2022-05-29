const process = class Process{

  constructor(){

  }

  // function to check adjacency pair name whether adapting naming convention or not
  checkNamingConvention(adj_prefix, err_message){
    var _prefix = SHEET.getName();
    if (adj_prefix.trim('') != _prefix.trim('')){
      var response = display.prototype.showAlert('Naming Convention Error',
                                                  `You should adapt naming rules of the project. E.g ${err_message}`,
                                                  ui.ButtonSet.OK);
    }else{
      Logger.log('pass')
    }

  }

  processMultiplelines(range) {
  var output = [];
  for (var i in range) {
    var celLen = 1;
    var c1 = range[i].map(function(e, i){
      var cell = e.toString().split("\n"); // Modified
      var len = cell.length;
      if (len == 1) {
        return cell[0];
      } else if (len > 1) {
        celLen = celLen > len ? celLen : len;
        var t2 = [];
        for (var k=0; k<cell.length; k++) {
          t2.push(cell[k]);
        }
        return t2;
      }
    });
    var c2 = c1.map(function(e, i){
      var r = [];
      if (!Array.isArray(e)) {
        for (var k=0; k<celLen; k++) {
          r.push(e);
        }
      } else {
        for (var k in e) {
          r.push(e[k]);
        }
        if (e.length < celLen) {
          for (var m=0; m<celLen - e.length; m++) {
            r.push("");
          }
        }
      }
      return r;
    });
    var c3 = c2[0].map(function(e, i){return c2.map(function(f, j){return c2[j][i]})});
    Array.prototype.push.apply(output, c3);
  }
  return output;
}


  
}
