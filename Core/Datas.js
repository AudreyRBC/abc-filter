var { inArray }  = require ('../../Helpers/Array' );

var onChange = require ( '../Actions/Change' )
var onSubmit = require ( '../Actions/Submit' )
var onRedirect = require ( '../Actions/Redirect' )

var Template = require ( '../Options/Template' );
var NumberResults = require ( '../Options/NumberResults' );

var LoadMore = require ( '../Options/LoadMore' );
module.exports = () => { return new Datas() }

function Datas(){
  this.extract = '';
  this.container = '';
  this.datas = []
};


Datas.prototype.init = function(el) {
  el.datas = this.filtered(this.datas, el)
  
  if( el.nb_results && el.nb_results.target) el.get_nbResult = new NumberResults(el.nb_results, el.datas.length)
  
  console.info("ABC Ready")
  if(el.debug) {
    console.info( "url: " + el.options.url)
    console.info( el.datas.length + " datas founds")
  }
  
  this.actions(el)
}


Datas.prototype.get = function(el) {
  const start = el.results.onStart;
  const datas = this.find(el)
  const complete = el.results.onComplete;
  
  if(start) start();
  Promise.all([start]).then( (datas) => datas);
  if(complete) Promise.all([start, datas]).then( () => complete() );

}



Datas.prototype.filtered = function(datas, el) {
  return datas.filter( (d, i) => {

    //Status
    
    if(el.datas[i]) return

    d.hide = false;
    
    //stock DOM element
    if(!d || typeof d === 'undefined' || !this.results) return;
    const id = inArray(d, this.results.id);
    
    d.id = `${this.results.prefix}${id}`;

    d.abc_selector = d.abc_selector ? d.abc_selector : document.querySelector(`#${d.id}`)

    if( this.container && !d.abc_selector ) d.template = new Template(this.results, d, this.container)
    
    d.abc_selector = d.abc_selector ? d.abc_selector : document.querySelector(`#${d.id}`)

    
    if(d.abc_selector) return d;
  });
}

Datas.prototype.find = function(el) {

  let datas;
  if(el.options.url){
    datas = fetch(el.options.url, el)  
    .then( response => response.json() )
    .then( json => { this.Fetch(null, json, el)  })
    .catch(error => this.Fetch(error, null))
  }else datas = this.HTML(el)

  return datas
}

Datas.prototype.HTML = function(el){

  const datas = document.querySelectorAll(el.results.target);
  this.results = el.results
  console.log(datas);
  
  this.datas = datas.map( d => {

    const arr = { abc_selector : d }

    d.attributes.forEach( attr => arr[attr.name] = attr.value )

    return arr;
  })
      
  this.init(el)
}

Datas.prototype.Fetch = function(error, success, el){
  if(error) console.log(error);
  else {

    this.datas = success;
    
    this.results = el.results
    
    if( el.results.path ) this.datas = inArray(this.datas, el.results.path);
    if( el.results.template ) this.container = document.querySelector(el.results.container)
    
    this.init(el)    
  }
}

Datas.prototype.actions = function(el) {
  switch (el.form.action) {
    case 'change':
      el.form.fn = new onChange(el);
      break;
    case 'submit':
      el.form.fn = new onSubmit(el);
      break;
    case 'redirect':
      el.form.fn = new onRedirect(el);
      break;
  }
}

