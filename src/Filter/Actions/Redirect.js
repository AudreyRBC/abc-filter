var Action = require( './Action' );
module.exports = ( el ) => { return new onRedirect( el ) }

function onRedirect(el){
    this.el = el
    this.action = new Action(el)
    this.target = document.querySelector(el.form.target)
    this.link = this.target.href
    this.bindEvent();
};


onRedirect.prototype.bindEvent = function(){

  this.el.formObj.addEventListener("keydown", e => {
    if (e.keyCode === 13) e.preventDefault();
  })
  const events = ['click', 'change', 'keyup', 'input']
  events.forEach( event => {
    this.el.formObj.addEventListener(event, e => {
      if (e.keyCode === 13) return;
      
      this.action.update(e);
      if(this.el.url && this.el.form.action != 'redirect') location.hash = this.el.url.search.toString()
    
      this.target.setAttribute('href', `${this.link}#${this.el.url.search.toString()}`)

      this.action.do( )
      // this.el.facette.update(this.el)
    })
  })
  if (this.el.url) this.action.do()

}
