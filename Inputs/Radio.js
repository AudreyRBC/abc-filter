var { inArray }  = require ('../../Helpers/Array' );
module.exports = () => { return new Radio() }
function Radio(){
  this.name    = false 
  this.compare = false
  this.url_name= false
  this.operator= "or"
  this.value   = []
  this.id      = false
}


// Radio.prototype.validate = function(data){
//     let toValidate;
//     data.inputs = [];

//     if (this.value.length === 0) return true;
//       let comp = this.compare, operator = this.operator;
//       if (this.target && this.compare[this.target] ){
//         comp = this.compare[this.target].compare
//         operator  = this.compare[this.target].operator
//       }
      
//         if (typeof comp === "object") {
         
//             toValidate = [];
//             comp.forEach( compare => {
//                 toValidate.push(inArray(data, compare, this.value));
//             })
//             return this.multiCompare(data, toValidate, this.value)

//         }else{
//             return this.singleCompare(data, this.value, comp, operator)
//         }

// }
Radio.prototype.customEvent = function(){
    const newEvent = new CustomEvent(
        'update', 
        {detail: event}
    )
    document.dispatchEvent(newEvent)
}
Radio.prototype.set = function(options){
    this.inputs = options.formObj.querySelectorAll(`[name="${this.name}"]`)

    this.inputs.forEach(input => {
        input.addEventListener('click', (event)  => this.customEvent() )
    })
    return this
}
Radio.prototype.validate = function(data){
    if (this.value.length === 0 || this.value.length === 1 && this.value[0] === "") return true;

    let isValidated = inArray(data, this.compare, this.value);

    
    isValidated = typeof isValidated != 'object' ? [isValidated] : isValidated
    if( isValidated ) {

        isValidated = isValidated.filter( v => this.value.indexOf( String(v) ) > -1);
        isValidated = [...new Set(isValidated)];

        isValidated = this.operator !== "and" ?  isValidated.length > 0 : isValidated.length === this.value.length ;

        return isValidated;

    } else return false;

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
    
    // if(!compare) return
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
Radio.prototype.set = function(options){
    this.inputs = options.formObj.querySelectorAll(`[name="${this.name}"]`)
    return this
}
Radio.prototype.update = function(options){
    // Get all inputs from this name
    // Return the checked inputs
    const checked = [...this.inputs].filter( input => input.checked );

    // Insert value in instance
    this.value = [...checked].map( input => input.value )
    this.names = [...checked].map( input => input.getAttribute('id') && this.id ? input.getAttribute('id') : input.value );

    options.el.inputValues[this.name] = this.names;
}
Radio.prototype.create = function(options){


    const checked = [...this.inputs].forEach( input => {
        const attr = input.getAttribute('id') && this.id ? input.getAttribute('id') : input.value ;

        if(this.value.indexOf(input.value) > -1){
            input.setAttribute('checked', 'checked')
            input.checked = true
        }else{
            input.checked = false;
            input.removeAttribute("checked")
        } 
    });

    
}

Radio.prototype.reset = function(options){
    this.inputs.forEach( input => { 
        input.checked = false;
        input.removeAttribute("checked")
    })
    this.value = []
    this.names = []
    options.inputValues[this.name] = this.names;
    options.url.reset(this.url_name)
}
