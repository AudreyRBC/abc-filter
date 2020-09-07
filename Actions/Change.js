var Action = require( './Action' );
module.exports = ( el ) => { return new onChange( el ) }

function onChange(el){
  this.el = el
  this.action = new Action(el)

  this.bindEvent();
};


onChange.prototype.bindEvent = function(){

  this.el.formObj.addEventListener("keydown", e => {
    e = e.detail
    if (e.keyCode === 13) e.preventDefault();
  })

  document.addEventListener('update', e => {
    if (e.keyCode === 13) return;
    e = e.detail
    
    this.action.update(e);
    if(this.el.url)  window.history.pushState( '', '', location.origin + location.pathname +"?"+this.el.url.search.toString() ); 
    this.action.do( )
    // this.el.facette.update(this.el)
  })

  

  if (this.el.url) this.action.do()
  document.addEventListener('url', (evt) => this.action.do())

}
