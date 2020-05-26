var { setArray }  = require ('../../Helpers/Array' );
var { closest }  = require ('../../Helpers/Utils' );

var Head = require ('./Head' );
var Body = require ('./Body' );
var Options = require ('./Options' );

module.exports = (el) => { return new SelectInput(el) }

function SelectInput(el){
    this.input = {
        multiple : false,
        tag: 'div',
        target : false, 
        open: false,
        openClass : 'abc-select--open'
    }

    this.el = el;
    // this.el.setAttribute('tabIndex', '-1')
    this.open = false
    this.body = new Body()
    this.head = new Head()
    this.options = new Options()

    this.focus = -1
    
}
// SelectInput.prototype.onOpen = function(){
//     this.head.target.setAttribute('aria-expanded', 'true');
// }
SelectInput.prototype.bindEvents = function(){

    document.addEventListener('click', e => {
        if(this.open === true){
            if( e.target != this.body.target && e.target != closest(e.target, this.body.className, this.body.className) 
                && e.target != this.head.target && e.target != closest(e.target, this.head.className, this.head.className) )
            { 
                this.update(false) 
            }
        }
    })

    this.head.target.addEventListener('click', evt =>  { 
        evt.preventDefault()
        this.update() 
    })

    this.head.target.addEventListener('keydown', evt =>  { 
        if(evt.keyCode === 13 ) this.update() 
        else if( [38,40].indexOf(evt.keyCode) > -1 )this.update(true) 
        else if( [27].indexOf(evt.keyCode) > -1 ){
            this.update(false) 
            this.options.els[this.focus].blur()
        }

        if( this.options.selected && this.options.selected[0] ){
            this.focus = this.options.selected[0].index
            this.options.selected[0].related.focus()
        }
        else this.options.els[0].focus()        
    })
    this.body.target.addEventListener('keydown', evt =>  { 
        // if( [38,40].indexOf(evt.keyCode) > -1 ) this.update(true) 
        if(this.focus != this.options.els.length - 1 && evt.keyCode === 40 ) this.focus = this.focus + 1
        if(this.focus != 0 && evt.keyCode === 38 ) this.focus = this.focus - 1

        if(this.focus > -1  && [38,40].indexOf(evt.keyCode) > -1) {
            this.options.els[this.focus].focus()  
            if(!this.input.multiple){
                this.options.single(this.options.els[this.focus]) 
                this.head.update(this.options)
            }
        }
        if(this.focus > -1 && evt.keyCode === 13 && !this.input.multiple){
            this.update(false)
            this.options.els[this.focus].blur()
        }
        else if(this.focus > -1 && evt.keyCode === 13 && this.input.multiple){
            this.options.multi(this.options.els[this.focus]) 
            this.head.update(this.options)
        }
        else if(this.focus > -1 && [27, 9].indexOf(evt.keyCode) > -1 ){
            this.update(false) 
            this.options.els[this.focus].blur()
        }
        
    })

    
    this.options.els.forEach( (el) => {
        el.addEventListener('click', () => {
            if( !this.input.multiple ){
                this.options.single(el)
                this.update(false)
                el.blur()
            }else{
                this.options.multi(el)
                this.head.update(this.options)
            }
            // this.head.update(this.options)

            
           
        })
        
        // el.addEventListener('keydown', evt => {
        //     !this.input.multiple ? this.options.single(el) : this.options.multi(el)
        //     this.head.update(this.options)
        // })
    })
    

}

SelectInput.prototype.update = function(open){
    this.open = open ? open : !this.open
    this.state()
}

SelectInput.prototype.construct = function(params){

    if (params) this.input = setArray(this.input, params);

    if( params.body != false && params.body) this.body = setArray(this.body, params.body)
    else if( params.body === false) this.body = false

    if( params.head != false && params.head) this.head = setArray(this.head, params.head)
    else if( params.head === false) this.head = false

    if( params.options != false && params.options) this.options = setArray(this.options, params.options)
    else if( params.options === false) this.options = false

    
    this.create()  
}


SelectInput.prototype.create = function(){
    this.options.options = this.el.options
    this.options.selected = this.el.selectedOptions
            
    this.container = document.createElement(this.input.tag);
    this.container.classList.add('abc-select');

    this.el.parentNode.insertBefore(this.container, this.el)
   
    this.container.appendChild(this.el);
    
    if( this.head ) this.head.construct(this) 
    if( this.body ) this.body.construct(this) 
   
    if(!this.head.default) this.head.target.innerHTML =  this.options.options[0].innerHTML
    this.state()

   

    this.bindEvents()
}

SelectInput.prototype.state = function(){
    this.open ? this.container.classList.add(this.input.openClass) : this.container.classList.remove(this.input.openClass)
    this.body.state(this.open)
    this.head.update(this.options)
}