var { inArray }  = require ('../Helpers/Array' );
module.exports = () => { return new Checkbox() }
function Checkbox(d){
    this.name       = false
    this.compare    = false
    this.url_name   = false
    this.operator   = "and"
    this.value      = []
}

Checkbox.prototype.validate = function(data){
    data.inputs = [];

    if (this.value.length === 0) return true;

    let isValidated = inArray(data, this.compare, this.value);
    if( isValidated ) {

        isValidated = isValidated.filter( v => this.value.indexOf( String(v) ) > -1);
        isValidated = [...new Set(isValidated)];

        isValidated = this.operator !== "and" ?  isValidated.length > 0 : isValidated.length === this.value.length ;

        return isValidated;

    } else return false;



}
Checkbox.prototype.update = function(options){
    // Get all inputs from this name
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
        const attr = input.getAttribute('id') ? input.getAttribute('id') : input.value ;
        this.value.indexOf(attr) > -1 ? input.checked = true : input.checked = false;
    });
}
