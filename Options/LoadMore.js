var { inArray }  = require ('../../Helpers/Array' );
var {Fetch} = require( '../../Helpers/Fetch' )

module.exports = () => { return new LoadMore() }

function LoadMore(){
    this.url =  {
        params : '',
        add : 0,
    }
    this.limit = false
    this.number = false

    this.action = ''
    this.thresold = ''
    this.target = ''
    this.search = ''
    this.canUpdate = true

    this.onStart = false
    this.onComplete = false
}

LoadMore.prototype.init = function(el){
    if(this.action === 'click') this.initClick(el)
    else if(this.action === 'scroll') this.initScroll(el)
    
}
LoadMore.prototype.initClick = function(el){
    this.target = document.querySelector(this.target)
    if(!this.target) return
    this.search = new URLSearchParams(el.options.url)
    this.target.addEventListener('click', e => {
        if(this.canUpdate) this.update(el);
    })
}
LoadMore.prototype.initScroll = function(el){
    this.target = document.querySelector(this.target)
    if(!this.target) return
    this.search = new URLSearchParams(el.options.url)

    let observer;

    var options = {
        rootMargin : `${this.thresold}px`
    };

    const callback = (entries, observer) => { 
        entries.forEach(entry => {
            if(entry.isIntersecting && this.canUpdate) this.update(el); 
        });
    };
    observer = new IntersectionObserver(callback, options);
    observer.observe(this.target);
}
LoadMore.prototype.update = function(el){

    const number = this.search.get(this.url.params);
    const newNumber = Number(number) + Number(this.url.add)
    this.search.set(this.url.params, newNumber);

    el.options.url = decodeURIComponent(decodeURIComponent( this.search.toString() ));
    
    
    const start = this.onStart;
    const getdatas =  fetch(el.options.url, el)  
        .then( response => response.json() )
        .then( json => { this.Fetch(null, json, el)  })
        .catch(error => this.Fetch(error, null))
    const complete = this.onComplete;
    
    if(start) start();
    Promise.all([start]).then( (getdatas) => getdatas);
    if(complete) Promise.all([start, getdatas]).then( () => complete() );
    
}

LoadMore.prototype.Fetch = function(error, success, el){
        if(error) console.log(error);
        else { 
            
            this.datas = success;
            this.results = el.results
            
            if( el.results.path ) this.datas = inArray(this.datas, el.results.path);
            if( el.results.template ) this.container = document.querySelector(el.results.container)
            
            const newDatas = el.alldatas.filtered(this.datas, el)
            
            el.datas = [...el.datas, ...newDatas]


            
            this.number = el.datas.length

            if(this.limit && this.number){
                this.url.add = this.limit - this.number > this.url.add ? this.url.add : this.limit - this.number
                this.canUpdate = this.url.add > 0 ? true : false 
            }

            if(!this.canUpdate)  this.target.classList.add('abc-limited')
            el.form.fn.do()

            if(el.debug) {
              console.info( el.datas.length + " datas loaded")
            }        
    }
}