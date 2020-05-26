var ABCFilter = require('./Core/Filter')
var Datas = require('./Core/Datas')

let abc;
var Filter = module.exports = {
    init: function (params) {
        
        if(!params.form || !document.querySelector(params.form.container) ) {
           console.error('No container form found');
           return;
        }
        const abc =  new ABCFilter(params).construct(params);

        abc.formObj = document.querySelector(params.form.container);

        if( params.inputs ) abc.setInputs(params.inputs)

        abc.alldatas = new Datas();
        abc.alldatas.get( abc ) ;
    

        if(abc.load_more) Promise.all([abc.alldatas.get]).then( () => abc.load_more.init(abc)); 
        if(abc.facette) Promise.all([abc.alldatas.get]).then( () => abc.facette.init(abc)); 
        
        return abc
    }
}

function isFunction(fn) { 
    return typeof(fn) === typeof(Function); 
} 