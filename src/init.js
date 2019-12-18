var ABC = module.exports = {};
ABC.filter = function(params){
    var Filter = require('./Core/Filter')
    var Datas = require('./Core/Datas')

    if(!params.form || !document.querySelector(params.form.container) ) {
        console.error('No container form found');
        return;
    }

    const abc = new Filter(params);
    abc.construct(params);
    abc.formObj = document.querySelector(params.form.container);
    if( params.inputs ) abc.setInputs(params.inputs)

    const datas = new Datas();
    datas.get( abc ) ;
}


ABC.test = function(){
    console.log("ABC is running")
}