var { createElementFromHTML }  = require ('../../Helpers/String' );

module.exports = (results, d, container) => { return new Template(results, d, container) }

function Template(results, d, container){    
    const template = results.template(d)
    this.create(template, container)
    
    return template;
}

Template.prototype.create = function(d, container){
    const template = createElementFromHTML(d)
    container.appendChild(template)
}
