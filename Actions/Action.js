var {error, isTarget, isTargetSelected }  = require ('../../Helpers/Utils');


module.exports = ( el ) => { return new Action( el ) }

function Action(el){
  this.el = el
};

Action.prototype.update = function(e){
  
    for (var key in this.el.inputs) {
      switch (key) {
          case "checkbox" : {
            if(!this.el.inputs.checkbox) error( ' No checkbox setted ');
            this.el.inputs.checkbox.forEach( checkbox => {
              if( isTarget(e, checkbox) || e.target === this.el.form.targetEl) {
                checkbox.update(this)
                if(this.el.url) this.el.url.construct( checkbox )
              }
            })
          }
          break;
          case "radio" : {
            if(!this.el.inputs.radio) error( ' No radio setted ');
            this.el.inputs.radio.forEach( radio => {
              if( isTarget(e, radio) || e.target === this.el.form.targetEl){
                radio.update(this)
                if(this.el.url) this.el.url.construct( radio )
              }
            })
          }
          break;
          case "select" : {
            if(!this.el.inputs.select) error( ' No select setted ');
            this.el.inputs.select.forEach( select => {
              if( isTargetSelected(e, select, this.el.formObj)|| e.target === this.el.form.targetEl ){
                select.update(this)
                if(this.el.url) this.el.url.construct( select )
              }
            })
          }
          break;
          case "search" : {
            if(!this.el.inputs.search) error( ' No search setted ');
            this.el.inputs.search.forEach( search => {
  
              if( isTarget(e, search)|| e.target === this.el.form.targetEl ){
                search.update(this)
                search.state(true)
                if(this.el.url) this.el.url.construct( search )
              }else{
                search.state(false)
              }
            }) 
          }
          break;
          case "range" : {
            if(!this.el.inputs.range) error( ' No range setted ');
            this.el.inputs.range.forEach( range => {
              if( !range.multiple && isTarget(e, range) 
                  || !range.multiple && isTarget(e, range.min)
                  || range.multiple && isTarget(e, range.min) 
                  || range.multiple && isTarget(e, range.max) 
                  || e.target === this.el.form.targetEl
                ){
                range.update(this)
                if(this.el.url) this.el.url.constructRange( range )
              }
            })
          }
      }
    }
  }
  
  
  Action.prototype.get = function(array, data) {
    let validation = [];
    array.forEach( el => {
      validation.push(el.validate(data));
    })
  
    return validation;
  }
  
  
  Action.prototype.do = function(el){
    let inputs = this.filterByKey("search");
    let datas  = this.el.datas

    if( this.el.inputs.search ) this.el.inputs.search.forEach( s => { datas = s.validate(  this.el.datas ) } );
  
    let nbs = this.el.datas.filter( data => {
      let compare = [];
      for (const key in inputs) {
        compare = [...compare, ...this.get(inputs[key], data)];
      }
  
  
      let result = compare.filter( t => t );
      
      data.hide = datas && datas.indexOf(data) === -1 ? true : false;


  
      
      if (!data.hide) data.hide = compare.length === result.length  ? false : true;

      data.hide ? data.abc_selector.classList.add( "abc-hide" ) : data.abc_selector.classList.remove( "abc-hide" )
      data.hide ? data.abc_selector.classList.remove( "abc-show" ) : data.abc_selector.classList.add( "abc-show" )
  
      if(!data.hide) return data
    });

    if(this.el.get_nbResult) this.el.get_nbResult.update( nbs.length );
  }
  
  Action.prototype.filterByKey = function(value) {
   const array = {};
   if( !this.el.inputs ) return;
   for (var key in this.el.inputs) { if (key != value) array[key] = this.el.inputs[key] }
   return array;
  }
  
  