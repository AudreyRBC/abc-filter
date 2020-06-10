var { inArray }  = require ('../../Helpers/Array' );

module.exports = () => { return new Range() }

function Range(){
    this.name    = false
    this.compare = false
    this.url_name= false
    this.min = {
        default: false,
        value: false,
        name: false,
        min: false
    }
    this.max = {
        default: false,
        value: false,
        name: false,
        max: false
    }
    this.multiple= false
    this.operator= "or"
    this.relation= "and"

}

Range.prototype.validate = function (data){
    data.inputs = []
    if(!this.multiple) return this.validateMin( data );

    if(this.multiple) {
        const isMin = this.validateMin( data );
        const isMax = this.validateMax( data );
       
        
        return isMin && isMax
    }
}
Range.prototype.customEvent = function(target) {
    target.addEventListener('input', (event)  => { 
        const newEvent = new CustomEvent(
            'update', 
            {detail: event}
        )
        document.dispatchEvent(newEvent)
    })
}
Range.prototype.set = function(options){
    if(!this.multiple)  this.inputMin = this.name ? options.formObj.querySelector(`[name="${this.name}"]`) : options.el.formObj.querySelector(`[name="${this.min.name}"]`)
    else{
        this.inputMin = options.formObj.querySelector(`[name="${this.min.name}"]`)
        this.inputMax = options.formObj.querySelector(`[name="${this.max.name}"]`)

    }

    this.resetEvent = function () {
        var event = new CustomEvent('reset');
        this.inputMin.dispatchEvent(event);
    };
    this.customEvent(this.inputMin)
    if(this.inputMin) this.customEvent(this.inputMax)
    
    return this
}

Range.prototype.update = function(options){
    let isValidated;

    if(!this.multiple){
       
        this.updateMin( this.inputMin );
        options.el.inputValues[this.min.name ? this.min.name : this.name] = this.min.value;
        
    }

    if(this.multiple) {
        
        this.updateMin( this.inputMin );
        this.updateMax( this.inputMax );
        options.el.inputValues[this.min.name] = this.min.value;
        options.el.inputValues[this.max.name] = this.max.value;
    }

    
    
}

Range.prototype.updateMin = function ( input ){
    this.min.value = input.value
    
}
Range.prototype.updateMax = function ( input ){
    this.max.value = input.value
}

Range.prototype.validateMin = function ( data ){
    if(this.min.value === "") return true
    let isValidated = inArray(data, this.compare, this.min.value);
    return Number(isValidated) >= Number(this.min.value);
}
Range.prototype.validateMax = function ( data ){
    if(this.max.value === "") return true
    let isValidated = inArray(data, this.compare, this.max.value);

    return Number(isValidated) <= Number(this.max.value);
}

Range.prototype.create = function(options, values){
    
    values = values[0].split('-');
    
    // this.inputMin = this.name ? options.formObj.querySelector(`[name="${this.name}"]`) : options.formObj.querySelector(`[name="${this.min.name}"]`)
       
    this.inputMin.setAttribute('value', values[0])
    this.min.value = values[0]
    this.min.min = this.inputMin.getAttribute('min')
    this.inputMin.value = values[0]

    if(values[1]){
        // const inputMax = options.formObj.querySelector(`[name="${this.max.name}"]`)
        this.inputMax.setAttribute('value', values[1])
        this.max.max = this.inputMin.getAttribute('max')
        this.max.value = values[1]
        this.inputMax.value = values[1]
    }
}

Range.prototype.reset = function(options){
    this.min.value = this.min.min
    this.max.value = this.max.max
    this.inputMin.value = this.min.min
    this.inputMax.value = this.max.max
    this.inputMin.setAttribute('value', this.min.min)
    this.inputMax.setAttribute('value', this.max.max)

    this.updateMin( this.inputMin );
    this.updateMax( this.inputMax );
    options.inputValues[this.min.name] = this.min.value;
    options.inputValues[this.max.name] = this.max.value;
    
    // this.inputMin.updateInput();
    this.resetEvent()
    options.inputValues[this.name] = this.names;
    options.url.reset(this.url_name)
}
