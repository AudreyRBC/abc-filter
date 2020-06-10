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

Select.prototype.set = function(options){
    this.input = options.formObj.querySelector(`[name="${this.name}"]`);
    this.inputs = this.input.querySelectorAll(`option`)

    options.formObj.addEventListener('click', (event)  => { 
    const newEvent = new CustomEvent(
            'update', 
            {detail: event}
        )
        document.dispatchEvent(newEvent)
    })
    this.resetEvent = function () {
        var event = new CustomEvent('reset');
        this.input.dispatchEvent(event);
    };

    return this;
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
    // Return the checked inputs

    const checked = [...this.inputs].filter( input => input.selected );

    // Insert value in instance
    this.value = [...checked].map( input => input.value )
    this.names = [...checked].map( input => input.hasAttribute('id') && this.id ? input.getAttribute('id') : input.value );

    options.el.inputValues[this.name] = this.names;
}

Select.prototype.create = function(options){
    
    
    
    const checked = [...this.inputs].filter( input => {
        const attr = this.id === true && input.getAttribute('id') ? input.getAttribute('id') : input.value;
        if (this.value.indexOf(attr) > -1) {
            input.setAttribute('selected', 'selected')
            return input
        }
    });
    this.value = [...checked].map( input => input.value )
    this.names = [...checked].map( input => input.getAttribute('id') ? input.getAttribute('id') : input.value );

    this.input.selectedOptions = checked
    
    
    this.input.setAttribute('value', this.value.join('&'))

}

Select.prototype.reset = function(options){
    this.value = []
    this.names = []
    
    
    this.input.setAttribute('value','')
    this.input.value = ''

    this.inputs.forEach( input => { 
        input.selected = false
        input.removeAttribute('selected')
        input.removeAttribute('aria-selected')
    } );

    if(this.multiple){
        this.input.selectedOptions = []
        this.input.selected = []
    }else{
        this.input.selectedIndex = 0
        this.input.selected = [this.inputs[0]]
    }
    
    this.resetEvent()
    options.inputValues[this.name] = [];
    options.url.reset(this.url_name)
}