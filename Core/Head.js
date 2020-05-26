
module.exports = () => { return new Head() }

function Head(){
    this.tag = 'button'
    this.className = 'abc-select__head'
    this.default = ""
    this.auto = true
    this.join = ','
    this.max_char = false

    return this;
}

Head.prototype.construct = function(opt){
    this.target = document.createElement(this.tag)
    opt.container.appendChild(this.target)

    this.target.classList.add(this.className)

    this.target.setAttribute('aria-hasPopup', 'listbox')
    this.default = this.default ? this.default : opt.options.options[0].innerHTML
    this.target.innerHTML = this.default
    
}

Head.prototype.update = function(options){
    if(!this.auto) return
    
    const html = options.selected && options.selected.length > 0 ? options.default.join(this.join) : this.default
    
    this.target.innerHTML = this.max_char && html.length > this.max_char ? html.slice(0, this.max_char) + '…' : html
}