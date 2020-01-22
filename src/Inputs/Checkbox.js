var { inArray }  = require ('../Helpers/Array' );
module.exports = () => { return new Checkbox() }
function Checkbox(d){
    this.name       = false
    this.compare    = false
    this.url_name   = false
    this.operator   = "or"
    this.value      = []
    this.id         = true
}

Checkbox.prototype.validate = function(data){
    let toValidate;
    data.inputs = [];
    if (this.value.length === 0) return true;

        if (typeof this.compare === "object") {
            toValidate = [];

            this.compare.forEach( compare => {
                toValidate.push(inArray(data, compare, this.value));
            })
            return this.multiCompare(data, toValidate, this.value)
        }else{
            return this.singleCompare(data, this.value, this.compare)
        }
    // }

}

Checkbox.prototype.multiCompare = function( data, toValidate, value ){

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

Checkbox.prototype.singleCompare = function( data, value, compare ){

    let isValidated = inArray(data, compare, value);

    if( isValidated ) {

        isValidated = typeof isValidated != 'object' ? [isValidated] : isValidated
        if (this.operator === "and") {
            isValidated = isValidated.length === value.length ;
            isValidated = isValidated.filter( v => value.indexOf( String(v) ) > -1);
            isValidated = [...new Set(isValidated)];
        }else if (this.operator === "or"){
            isValidated = isValidated.filter( v => value.indexOf( String(v) ) > -1);
            isValidated = [...new Set(isValidated)];
            isValidated = isValidated.length > 0
        }else if (this.operator === ">"){
            isValidated = isValidated > value[0]
        }else if (this.operator === ">="){
            isValidated = isValidated >= value[0]
        }else if (this.operator === "<="){
            isValidated = isValidated <= value[0]
        }else if (this.operator === "<"){
            isValidated = isValidated < value[0]
        }else if (this.operator === "="){
            isValidated = isValidated === value[0]
        }
        return isValidated;

    } else return false;


}

Checkbox.prototype.update = function(options){
        const inputs = options.el.formObj.querySelectorAll(`[name="${this.name}"]`)
        // Return the checked inputs
        const checked = [...inputs].filter( input => input.checked );

        // Insert value in instance
        this.value = [...checked].map( input => input.value )
        this.names = [...checked].map( input => input.getAttribute('id') ? input.getAttribute('id') : input.value );
}

Checkbox.prototype.create = function(options){

    const inputs = options.formObj.querySelectorAll(`[name="${this.name}"]`)

    const checked = [...inputs].forEach( input => {
        const attr = input.value ;
        this.value.indexOf(input.value) > -1 ? input.checked = true : input.checked = false;
    });
}
