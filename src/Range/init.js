var RangeInput = require('./Core/Input')
var Range = module.exports = {
    init: function (params) {
        return new RangeInput().construct(params) 
    }
}
