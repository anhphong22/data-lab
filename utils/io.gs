var pd = class Pandas{

  constructor(){
    var utils = new Utils;
  }

  // function to read data
  read_csv(name, rIndex, cIndex, rIndexOffset, cIndexOffset){
    var data = utils.getData(name, rIndex, cIndex, rIndexOffset, cIndexOffset);
    return data.slice(1);
  }

}
