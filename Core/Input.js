var Fuse = require ('fuse.js' );
var { setArray, inArray }  = require ('../../Helpers/Array' );
var { closest }  = require ('../../Helpers/Utils' );


module.exports = () => { return new AutoCompleteInput() }

function AutoCompleteInput(){
    this.url = false
    this.datas = false
    this.results = {
        path : ''
    }
    this.compare = false
    this.label = {
        target: false,
        default: false,
        singular:false,
        plural:false,
        zero:false
    }
    this.max = 100
    this.target = false
    this.template = (highlight) => {
        return `<li class="abc-autocomplete__item">
                    <span class="name">${highlight}</span>
                </li>`
    }

    return this
}
AutoCompleteInput.prototype.construct = function(params){
    let getDatas;
    if (params) setArray(this, params);
    
    this.className = this.target
    this.target = document.querySelector(this.target)

    if(this.url) {
        getDatas = this.find
        getDatas()
        
        Promise.all([getDatas]).then( () => {
            var options = { 
                threshold: 0.4,
                keys: this.compare,
                distance: 10000,
              }
              var fuse = new Fuse(datas, options)
              return value ? fuse.search(value) : datas
        })
    }
    
    return this
    
}
AutoCompleteInput.prototype.find = function() {

    if(this.url){
      fetch(this.url, this)  
      .then( response => response.json() )
      .then( json => { this.Fetch(null, json, this)  })
      .catch(error => this.Fetch(error, null))
    }
  
}
AutoCompleteInput.prototype.Fetch = function(error, success){
    if(error) console.log(error);
    else {
  
      this.datas = success;
      if(this.results.path) {
          this.datas = inArray(this.datas, this.results.path)
      }
 
    }
  }
AutoCompleteInput.prototype.findMatches = function(options) {
    return options.el.datas.filter(d => {
        this.compare.forEach( c => {
            const compare = inArray(d, c);
            
            const regex = new RegExp(this.value, 'gi');
            return String(compare).match(regex)
        })
    });
}
AutoCompleteInput.prototype.match = function(options, value, input) {
    const toMatch = value ? value : this.value
    if (toMatch && toMatch.length > 0 ) this.target.classList.add('abc-autocomplete--open')
    else this.target.classList.remove('abc-autocomplete--open')
  
  
    // if (options.max_results && matchArray.length > options.max_results) html = fullResult(matchArray, options)
    // else if (matchArray.length === 0 ) html = noResult(matchArray, options)
    // else

    this.getResults(options, toMatch)
    
    // target.innerHTML = html;
    // target.style.height = [...target.children].reduce((tot, num) => tot + Number( num.clientHeight ) + 28 , 0 ) + "px"
    
    this.target.childNodes.forEach(item => {
        item.addEventListener('click', e => {
            input.value = item.innerText
            input.setAttribute('value', item.innerText);
            this.target.classList.remove('abc-autocomplete--open')
        })
        document.addEventListener('click', e => {
            if(e.target != this.target && this.target != closest(e.target, this.className,  this.className)) this.target.classList.remove('abc-autocomplete--open')
        })
    })
  

  }
AutoCompleteInput.prototype.getResults = function(options, value){
   
    
    let html = '';
    options.el.datas.map(d => {
        this.compare.forEach( c => {
            const compare = inArray(d, c);
            
            const regex = new RegExp(value, 'gi');
            
            const highlight = compare.replace(regex, `<span class="hl">${value}</span>`);
            const str = String(compare).match(regex)
            
            if(str && value!="" && typeof value != 'undefined' && compare.toLowerCase() != value){
                html+= this.template(highlight);
            }
        })
    });

    this.target.innerHTML = html
}
  
//   function autocomplete(options){
  
//     options = {
//       'url'   : options.url ? options.url : '',
//       'datas' : options.datas ? options.datas : '',
//       'no_results' : options.no_results ? options.no_results : '',
//       'max_results_text' : options.max_results_text ? options.max_results_text : '',
//       'max_results': options.max_results ? options.max_results : '',
//       'targets' : options.targets ? options.targets : '',
//       'to_show' : options.to_show ? options.to_show : '',
//     }
  
//     options.targets = document.querySelectorAll(`${options.targets}`);
//     options.datas = getDatas(options);
  
//     if(!options.targets || !options.datas) return
//     init(options)
  
//   }
  
//   function init(options){
  
//     options.targets.forEach( t => {
//       const blockList = createDom_el('ul','autocomplete-items')
//       t.parentNode.appendChild(blockList)
  
//       t.addEventListener('keyup', e => displayMatches(t, options, blockList));
//     })
//   }
  
//   function findMatches(toMatch, options) {
//     return options.datas.filter(d => {
//       const attr = inArray(d, options.to_show)
//       const regex = new RegExp(toMatch, 'gi');
//       return String(attr).match(regex)
//     });
//   }
//   function displayMatches(t, options, blockList) {
//     const toMatch = t.value;
//     if (toMatch && toMatch.length > 0 ) t.parentNode.classList.add('isActive')
//     else t.parentNode.classList.remove('isActive')
  
//     const matchArray = findMatches(toMatch, options);
  
//     let html;
//     if (options.max_results && matchArray.length > options.max_results) html = fullResult(matchArray, options)
//     else if (matchArray.length === 0 ) html = noResult(matchArray, options)
//     else html = results(toMatch, matchArray, options)
  
//     blockList.innerHTML = html;
//     blockList.style.height = [...blockList.children].reduce((tot, num) => tot + Number( num.clientHeight ) + 28 , 0 ) + "px"
  
//     const items = blockList.querySelectorAll('.autocomplete-item');
//     items.forEach(item => {
//       item.addEventListener('click', e => {
//         t.value = item.innerText
//         t.setAttribute('value', item.innerText);
//         t.parentNode.classList.remove('isActive')
//       })
//       document.addEventListener('click', e => {
//         e.target != t && e.target != blockList && e.target != item && e.target.parentNode != blockList ? t.parentNode.classList.remove('isActive') :''
//       })
//     })
  
  
//   }
  
//   
//   function noResult(matchArray, options){
//       return `
//         <li class="autocomplete-item">
//           <span class="no-result">${options.no_results ? options.no_results : "No results"}</span>
//         </li>
//       `;
//   }
//   function fullResult(matchArray, options){
//       return `
//         <li class="autocomplete-item">
//           <span class="name">${options.max_results_text ? options.max_results_text : "Please type another character to refine your search."}</span>
//         </li>
//       `;
//   }
//   function createDom_el(type, className){
//     const el = document.createElement(type);
//     if(className) el.classList.add(className)
//     return el
//   }
  
  
//   function getDatas(options){
//     if(options.datas) return options.datas;
//     else if(options.url) fetchDatas(options.url, (error, datas) => {
//       if (error){
//         console.log(error)
//       }
//       else{
//         options.datas = datas
//         init(options)
//       }
//     });
//   }
  
//   function fetchDatas(url, callback){
//     fetch(url)
//        .then(response => response.json())
//        .then(json => callback(null, json))
//        .catch(error => callback(error, null))
//   }
  
//   function inArray(data, compare, val){
//     const toCompare = compare.split('.')
//     val = data;
  
//     toCompare.forEach( (t, i) => {
//       val = typeof val[t] != "undefined" ? val[t] : val
//       return val
//     })
//     return val
//   }
  