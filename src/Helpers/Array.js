export const setArray = function(array, options){
    for (var key in array) {
        if (typeof array[key] === "function" )
          array[key] = array[key];
        else if (typeof array[key] !== "object" || key === "value")
          array[key] = key in options ? options[key] : array[key];
        else if ( typeof array[key] === "object" ) {
          array[key] =  key in options ? setArray(array[key], options[key] ) : array[key]
        };
    }
    return array;
}

export const inArray = (data, compare, val) => {
  const toCompare = compare.split('.')


  val = data;

  toCompare.forEach( (t, i) => {
    val = typeof val[t] != "undefined" ? val[t] : false
  })
  return val

}
