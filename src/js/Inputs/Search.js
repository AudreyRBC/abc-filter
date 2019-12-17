import Fuse from 'fuse.js'

export default function Search(){
    this.name    = false;
    this.compare = false;
    this.url_name= false;
    this.value   = "";
}


Search.prototype.validate = function(datas){

    const compare = typeof this.compare === "string" ? [this.compare] : this.compare

    var options = {
      threshold: 0.4,
      keys: compare,
      distance: 10000,
    }
    var fuse = new Fuse(datas, options)
    return this.value ? fuse.search(this.value) : datas
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
