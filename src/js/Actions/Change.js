import Checkbox from '../Inputs/Checkbox'
import Radio from '../Inputs/Radio'
import Select from '../Inputs/Select'
import Search from '../Inputs/Search'

import {closest, error, isTarget, isTargetSelected} from '../Helpers/Utils'

import {Datas} from '../Core/Datas'

export function onChange(el){

  this.el = el
  this.bindEvent();

};


onChange.prototype.bindEvent = function(){
  const events = ['click', 'change', 'keyup']
  events.forEach( event => {
    this.el.formObj.addEventListener(event, e => {
      this.update(e);
      if(this.el.url) location.hash = this.el.url.search.toString()
      if(!this.el.url) this.filter( )
    })
  })
  if (this.el.url){
    this.filter()
    window.addEventListener("hashchange", () => {
       this.filter()} )
  }

}

onChange.prototype.update = function(e){

  for (var key in this.el.inputs) {
    switch (key) {
        case "checkbox" : {
          if(!this.el.inputs.checkbox) error( ' No checkbox setted ');
          this.el.inputs.checkbox.forEach( checkbox => {
            if( isTarget(e, checkbox) ) {
              checkbox.update(this)
              if(this.el.url) this.el.url.construct( checkbox )
            }
          })
        }
        break;
        case "radio" : {
          if(!this.el.inputs.radio) error( ' No radio setted ');
          this.el.inputs.radio.forEach( radio => {
            if( isTarget(e, radio) ){
              radio.update(this)
              if(this.el.url) this.el.url.construct( radio )
            }
          })
        }
        break;
        case "select" : {
          if(!this.el.inputs.select) error( ' No select setted ');
          this.el.inputs.select.forEach( select => {
            if( isTargetSelected(e, select, this.el.formObj) ){
              select.update(this)
              if(this.el.url) this.el.url.construct( select )
            }
          })
        }
        break;
        case "search" : {
          if(!this.el.inputs.search) error( ' No search setted ');
          this.el.inputs.search.forEach( search => {

            if( isTarget(e, search) ){
              search.update(this)
              if(this.el.url) this.el.url.construct( search )
            }
          })
        }
        break;
    }
  }
}


onChange.prototype.get = function(array, data) {
  let validation = [];
  array.forEach( el => {
      validation.push(el.validate(data));
  })

  return validation;
}


onChange.prototype.filter = function(){
  let inputs = this.filterByKey("search" );
  let datas  = this.el.datas

  this.el.inputs.search.forEach( s => { datas = s.validate(  this.el.datas ) } );

  let nbs = this.el.datas.filter( data => {
    let compare = [];
    for (const key in inputs) {
      compare = [...compare, ...this.get(inputs[key], data)];

    }
    let result = compare.filter( t => t );
    data.hide = datas && datas.indexOf(data) === -1 ? true : false;

    if (!data.hide) data.hide = compare.length === result.length  ? false : true;

    data.hide ? data.abc_selector.classList.add( "abc-hide" ) : data.abc_selector.classList.add( "abc-show" )
    // data.abc_selector.style.display = data.hide ?  "none" : "block"
    if(!data.hide) return data
  });

  if(this.el.nb_results) this.results(nbs.length);
}

onChange.prototype.filterByKey = function(value) {
 const array = {};
 if( !this.el.inputs ) return;
 for (var key in this.el.inputs) { if (key != value) array[key] = this.el.inputs[key] }
 return array;
}

onChange.prototype.results = function(nb){
  let result = this.el.nb_results, setText = "plural";
  const target = document.querySelector(this.el.nb_results.target);
  if(!target) error( ' No Result target found ')

  if (nb === 0) setText = "no_results"
  else if (nb === 1) setText = "singular"

  target.innerHTML = result[setText].replace('-var-', nb);
}
