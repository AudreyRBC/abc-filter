var Fuse = require ('fuse.js' );
module.exports = () => { return new Search() }

function Search(){
    this.name    = false;
    this.compare = false;
    this.url_name= false;
    this.relation= "and"
    this.value   = "";
    this.id      = true
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


Search.prototype.update = function(options){
    // Get all inputs from this name
    const input = options.el.formObj.querySelector(`[name="${this.name}"]`)
    input.setAttribute('value', input.value)
    // Insert value in instance
    this.value = input.value

}
Search.prototype.create = function(options){
    const input = options.formObj.querySelector(`[name="${this.name}"]`)
    input.setAttribute('value', this.value)
    // Insert value in instance
    input.value = this.value
}
