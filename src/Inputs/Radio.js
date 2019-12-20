var { inArray }  = require ('../Helpers/Array' );
module.exports = () => { return new Radio() }
function Radio(){
  this.name    = false
  this.compare = false
  this.group   = []
  this.group.operator = "="
  this.group.compare = false
  this.url_name= false
  this.operator= "and"
  this.relation= "and"
  this.value   = []
  this.id      = true
}


Radio.prototype.validate = function(data){
    let toValidate;
    data.inputs = [];

    if (this.value.length === 0) return true;
      let comp = this.compare, operator = this.operator;
      if (this.target && this.compare[this.target] ){
        comp = this.compare[this.target].compare
        operator  = this.compare[this.target].operator
      }
        if (typeof comp === "object") {
            toValidate = [];
            comp.forEach( compare => {
                toValidate.push(inArray(data, compare, this.value));
            })
            return this.multiCompare(data, toValidate, this.value)

        }else{
            return this.singleCompare(data, this.value, comp, operator)
        }

}

Radio.prototype.multiCompare = function( data, toValidate, value ){

    if ( toValidate ) {
        if (toValidate[0] !== "" && toValidate[1] !== "") {
            isValidated = value >= toValidate[0] && value <= toValidate[1]
        }else if(toValidate[0] !== "" && toValidate[1] === ""){
            isValidated = value >= toValidate[0]
        }
        else if(!toValidate[0] && toValidate[1] || toValidate[0] === "" && toValidate[1] ){
            isValidated = value <= toValidate[1]
        }else{
            return true;
        }

        return isValidated
    }
     else return false;
}

Radio.prototype.singleCompare = function( data, value, compare, operator ){

    let isValidated = inArray(data, compare, value);

    if( isValidated ) {

        isValidated = typeof isValidated != 'object' ? [isValidated] : isValidated

        if (operator === "and") {
            isValidated = isValidated.length === value.length ;
            isValidated = isValidated.filter( v => value.indexOf( String(v) ) > -1);
            isValidated = [...new Set(isValidated)];
        }else if (operator === "or"){
            isValidated = isValidated.filter( v => value.indexOf( String(v) ) > -1);
            isValidated = [...new Set(isValidated)];
            isValidated = isValidated.length > 0
        }else if (operator === ">"){
            isValidated = isValidated > value[0]
        }else if (operator === ">="){
            isValidated = isValidated >= value[0]
        }else if (operator === "<="){
            isValidated = isValidated <= value[0]
        }else if (operator === "<"){
            isValidated = isValidated < value[0]
        }else if (operator === "="){
            isValidated = isValidated === value[0]
        }
        return isValidated;

    } else return false;


}

Radio.prototype.update = function(options){
    // Get all inputs from this name
    const inputs = options.el.formObj.querySelectorAll(`[name="${this.name}"]`)
    // Return the checked inputs
    const checked = [...inputs].filter( input => input.checked );

    // Insert value in instance
    this.value = [...checked].map( input => input.value )
    this.names = [...checked].map( input => input.getAttribute('id') ? input.getAttribute('id') : input.value );
}


Radio.prototype.create = function(options){
    const inputs = options.formObj.querySelectorAll(`[name="${this.name}"]`)

    const checked = [...inputs].forEach( input => {

        const attr = input.getAttribute('id') && this.id ? input.getAttribute('id') : input.value ;
        console.log(attr);
        if( this.value.indexOf(attr) > -1 ) {
          input.setAttribute('checked', 'checked')
          input.checked = true
         }
          else {
            input.checked = false;
          }
    });
}
