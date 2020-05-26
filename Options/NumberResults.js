module.exports = (arr, length) => { return new NumberResults(arr, length) }

function NumberResults(arr, length){

    this.target = document.querySelector(arr.target);
    this.getFn = 0
    this.length = length
    
    this.options = [
        arr.no_results ? arr.no_results : "", 
        arr.singular ? arr.singular : "" ,
        arr.plural ? arr.plural : ""
    ]

    this.update(length)
    
       
    return this;
}

NumberResults.prototype.update = function(length){
    this.length = length
    if(length > 1) this.getFn = 2
    else this.getFn = length
    this.target.innerHTML = this.options[this.getFn](length)
}
