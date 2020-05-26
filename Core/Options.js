module.exports = () => { return new Options() }

function Options(){
    this.tag = 'li'
    this.className = 'abc-select__item'
    this.targets = false
    this.values = []
    this.els = []
    this.default = [];
}

Options.prototype.construct = function(body){
    this.options.forEach(option => {
        const el = document.createElement(this.tag)
        option.attributes.forEach( attr => {
            if(attr.name === "value"  && attr.value) el.setAttribute('abc-value', attr.value)
            else if(attr.name === "id" && attr.value) el.setAttribute(`abc-${attr.name}`, attr.value)
            else if(attr.name && attr.value) el.setAttribute(attr.name, attr.value)
            
        })
        el.innerHTML = option.innerHTML
        el.setAttribute('role', 'option')
        el.setAttribute('tabindex', '-1')

        el.classList.add(this.className)
        el.related = option
        option.related = el
        body.appendChild(el)
        this.els.push(el)
    });

    this.values = [...this.selected].map( val => val.value )
    this.default = this.selected ? [...this.selected].map( val => val.innerHTML ) : this.options[0].innerHTML
    
    return this.els;
}


Options.prototype.single = function(el){

    this.els.forEach( (opt) => {
        if(opt != el){
            opt.removeAttribute('selected')
            opt.removeAttribute('aria-selected')

            opt.related.removeAttribute('selected') 
        }else{
            opt.setAttribute('selected', 'selected')
            opt.setAttribute('aria-selected', true)
            opt.related.setAttribute('selected', 'selected')
            this.selected = [opt]
            this.default = [opt.innerHTML]
            this.values = [opt.value]
        }
        
    })
}
Options.prototype.multi = function(el){
    if( el.hasAttribute('selected') ){
        el.removeAttribute('selected')
        el.related.removeAttribute('selected')

        const indexDef = this.default.indexOf(el.related.innerHTML);
        const indexVal = this.values.indexOf(el.related.value);
        if(indexDef > -1) this.default.splice(indexDef, 1);
        if(indexVal > -1) this.values.splice(indexVal, 1);
    }else{
        el.setAttribute('selected', 'selected')
        el.related.setAttribute('selected', 'selected')

        el.setAttribute('aria-selected', true)
        
        this.default.push(el.related.innerHTML)
        this.values.push(el.related.value)
    
    }
}