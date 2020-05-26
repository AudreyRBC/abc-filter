var { inArray }  = require ('../../Helpers/Array' );

module.exports = () => { return new Select() }
function Select(){
    this.name    = false
    this.compare = false
    this.url_name= false
    this.multiple= false
    this.operator= "or"
    this.relation= "and"
    this.value   = []
    this.id      = true
}


Select.prototype.validate = function(data){
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

Select.prototype.update = function(options){
    // Get all inputs from this name
    const inputs = options.el.formObj.querySelectorAll(`[name="${this.name}"] option`)
    // Return the checked inputs

    const checked = [...inputs].filter( input => input.selected );

    // Insert value in instance
    this.value = [...checked].map( input => input.value )
    this.names = [...checked].map( input => input.hasAttribute('id') && this.id ? input.getAttribute('id') : input.value );

    options.el.inputValues[this.name] = this.names;
}

Select.prototype.create = function(options){
    
    const select = options.formObj.querySelector(`[name="${this.name}"]`);

    const inputs = options.formObj.querySelectorAll(`[name="${this.name}"] option`)
    
    const checked = [...inputs].filter( input => {
        const attr = this.id === true && input.getAttribute('id') ? input.getAttribute('id') : input.value;
        if (this.value.indexOf(attr) > -1) {
            input.setAttribute('selected', 'selected')
            return input
        }
    });
    this.value = [...checked].map( input => input.value )
    this.names = [...checked].map( input => input.getAttribute('id') ? input.getAttribute('id') : input.value );

    select.selectedOptions = checked
    
    
    select.setAttribute('value', this.value.join('&'))

}
