var { inArray }  = require ('../../Helpers/Array' );

var Fuse = require ('fuse.js' );
module.exports = () => { return new Search() }

function Search(){
    this.name    = false;
    this.compare = false;
    this.url_name= false;
    this.relation= "and"
    this.value   = "";
    this.id      = true;
    this.input = '';
    this.autocomplete = {
        fn : '',
        target : '',
        label : {
            target: false,
            default: false,
            singular:false,
            plural:false,
            zero:false
        },
        max : 100,
        template: {},
        fetch: false
    }
    return this;
}

Search.prototype.validate = function(datas){

    const compare = typeof this.compare === "string" ? [this.compare] : this.compare
    const value = typeof this.value === "object" ? this.value[0] : this.value

    var options = { 
      threshold: 0.4,
      keys: compare,
      distance: 10000,
    }
    var fuse = new Fuse(datas, options)
    return value ? fuse.search(value) : datas
}
Search.prototype.customEvent = function(){
    const newEvent = new CustomEvent(
        'update', 
        {detail: event}
    )
    document.dispatchEvent(newEvent)
}
Search.prototype.set = function(options){
    this.input = options.formObj.querySelector(`[name="${this.name}"]`)
    this.url_name = this.url_name === false ?  this.name : this.url_name

    if(this.autocomplete && this.autocomplete.fn) {
        this.isAutocomplete = true
        this.autocomplete.compare = this.compare

        this.autocomplete = this.autocomplete.fn.init(this.autocomplete)
    }

    this.input.addEventListener('input', (event)  => this.customEvent())

    document.addEventListener('url', (evt) => {
        if(this.url_name in evt.detail) { 
            this.input.value = evt.detail[this.url_name]
            this.setValues()
        }else if(!(this.url_name in evt.detail) && this.input.value.length > 0) {
            this.input.value = "";
            this.setValues()
        }
    })
    
    return this
}
Search.prototype.setValues = function(){
    console.log(this.input.value);
    
    this.input.setAttribute('value', this.input.value)
    // Insert value in instance
    this.value = this.input.value
    this.input.value.length > 0 ? this.input.classList.add('hasValue') : this.input.classList.remove('hasValue')
    
}
Search.prototype.update = function(options){
    // Get all inputs from this name
    if (!this.input) return
    this.setValues()
    
    if(this.isAutocomplete) this.autocomplete.match(options,  this.value, this)

}
Search.prototype.create = function(options, value){
    if (!this.input) return
    
    // Insert value in instance
    this.input.value = value
    this.setValues()

}


Search.prototype.state = function(state){
    if(state) this.input.classList.add('onInput')
    else this.input.classList.remove('onInput')
}

Search.prototype.reset = function(options){
    this.input.value = ''
    this.setValues();
    this.input.classList.remove('hasValue')

    options.inputValues[this.name] = '';

    options.url.reset(this.url_name)

}