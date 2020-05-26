var AutoCompleteInput = require('./Core/Input')
var AutoComplete = module.exports = {
    init: function (params) {
        return new AutoCompleteInput().construct(params) 
    }
}