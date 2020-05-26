module.exports = () => { return new Body() }

function Body(){
    this.tag = 'ul'
    this.className = 'abc-select__body'
    this.target = false
    this.auto_height = true
    this.close = 0
    
    
    return this;
}

Body.prototype.construct = function(opt){

    
    this.target = document.createElement(opt.body.tag)
    opt.container.appendChild(this.target)

    if(opt.options ) this.els = opt.options.construct(this.target) 


    this.target.classList.add(this.className)
    this.target.setAttribute('role', 'listbox')
    this.target.setAttribute('tabindex', '-1')

    if(this.auto_height) this.setHeight()
    
}

Body.prototype.setHeight = function(){
    this.height = this.getHeight()
    this.target.style.height = `${this.height}px`
}
Body.prototype.getHeight = function(){
    return this.target.scrollHeight
    
}

Body.prototype.state = function(open) {
    this.target.style.height = open ? `${this.height}px` : `${this.close}px`
    // this.els.forEach(el => el.setAttribute('tabIndex', open ? '0' : '-1' ))
}