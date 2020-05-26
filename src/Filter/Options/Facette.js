var { inArray }  = require ('../../Helpers/Array' );

module.exports = () => { return new Facette() }
// TO DO:
function Facette(){
    this.number = false
    this.visible_class = false
    this.hidden_class = false,
    this.facettes = []
    this.indexs = [];
}

Facette.prototype.init = function(el) {

    for (const key in this.facettes) {
        const name = this.facettes[key].compare;

        this.facettes[key]['values'] = []

        el.datas.forEach( (d) => {
        
            const result = inArray(d, name)
            if(this.facettes[key]['values'].indexOf(result) === -1) this.facettes[key]['values'].push(result)

        })

    }     
}

Facette.prototype.update =  function(el){
    let visibles = el.datas.map( d =>{ if(!d.hide) return d} )    
    visibles = visibles.filter( d => d )

    
    for (const key in this.facettes) {
        const name = this.facettes[key].compare;

        this.indexs[key] = []
        visibles.forEach( (d) => {
            const result = inArray(d, name)
            if(this.indexs[key].indexOf(result) === -1) this.indexs[key].push(result)
        })

        this.facettes[key]['values'].forEach( r => {
            const isIn = this.indexs[key].indexOf(r) > -1

            const input = el.formObj.querySelector(`[name="${key}"] [value="${r}"]`) ? el.formObj.querySelector(`[name="${key}"] [value="${r}"]`) :el.formObj.querySelector(`[name="${key}"][value="${r}"]`)
            if(input){
                isIn ? input.classList.remove('noFacette') : input.classList.add('noFacette')
            }
            
        })
    }    

}

Facette.prototype.compare = function(arr1,arr2){
  
  
    if(!arr1  || !arr2) return
    
        let result;
    
    arr1.forEach((e1,i)=>arr2.forEach(e2=>{
        
            if(e1.length > 1 && e2.length){
                result = this.compare(e1,e2);
            }else if(e1 !== e2 ){
                result = false
            }else{
                result = true
            }
        })
    )
    
    return result
       

  }