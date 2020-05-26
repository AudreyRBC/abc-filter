var SelectInput = require('./Core/Input')
var Select = module.exports = {
    init: function (params) {
    
        if(params.all){
            const targets = document.querySelectorAll(params.target)
            if(!targets) return;

            targets.forEach( target => new SelectInput(target).construct(params) )
        }else{
            const target = document.querySelector(params.target)
            if(!target) return;
            new SelectInput(target).construct(params)
        }
    }
}
