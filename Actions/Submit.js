var Action = require( './Action' );
module.exports = ( el ) => { return new onSubmit( el ) }

function onSubmit(el){  
  this.el = el
  this.action = new Action(el)
  this.target = document.querySelector(el.form.target);


  this.bindEvent();
};


onSubmit.prototype.bindEvent = function(){

  // const events = ['click', 'change', 'keyup', 'input']
  // events.forEach( event => {
  //   this.el.formObj.addEventListener(event, e => {
  //     if (e.keyCode === 13) return;
  //     this.action.update(e);
  //   })
  // })

  this.target.addEventListener("keydown", e => {
    if (e.keyCode === 13){
      e.preventDefault();
      if(this.el.url) location.hash = this.el.url.search.toString()
      this.action.do()
    }
   
  })

  this.target.addEventListener('click', e => {

      e.preventDefault()
      this.action.update(this);
      if(this.el.url) location.hash = this.el.url.search.toString()
      
      this.action.do()
      // this.el.facette.update(this.el)
  })

  
  if (this.el.url) this.action.do()

}
onSubmit.prototype.do = function(){
  this.action.do()
}