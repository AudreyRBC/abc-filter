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
Search.prototype.set = function(options){
    this.input = options.formObj.querySelector(`[name="${this.name}"]`)
    
    if(this.autocomplete && this.autocomplete.fn) {
        this.isAutocomplete = true
        this.autocomplete.compare = this.compare
        

        this.autocomplete = this.autocomplete.fn.init(this.autocomplete)
        
        
    }

    return this
}

Search.prototype.update = function(options){
    // Get all inputs from this name
    if (!this.input) return
    
    
    this.input.setAttribute('value', this.input.value)
    // Insert value in instance
    this.value = this.input.value
    options.el.inputValues[this.name] = this.value;

    
    if(this.isAutocomplete) this.autocomplete.match(options,  this.value, this.input)

}
Search.prototype.create = function(options, value){
    if (!this.input) return
    
    
    this.input.setAttribute('value', value)
    // Insert value in instance
    this.input.value = value
}
