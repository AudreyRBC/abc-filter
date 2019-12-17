import {Filter} from './Core/Filter'
import {Datas} from './Core/Datas'

var abcFilter = module.exports = {};
abcFilter.filter = function(params) {

    if(!document.querySelector(params.form.container) ) {
        console.error('No container form found');
        return;
    }

    const abc = new Filter(params);
    abc.construct(params);
    abc.formObj = document.querySelector(params.form.container);
    if( params.inputs ) abc.setInputs(params.inputs)

    const datas = new Datas();
    datas.get( abc ) ;

};
abcFilter.testing = function() {
  console.log("It's running")
}
