var Checkbox = require( '../Inputs/Checkbox' );
var Radio = require( '../Inputs/Radio' );
var Select = require( '../Inputs/Select' );
var Search = require( '../Inputs/Search' );

module.exports = () => { return new Url() }
function Url(){
  this.search = new URLSearchParams();
  if(location.hash) this.params = this.disconstruct()
};

Url.prototype.construct = function(label){
  let name = label.url_name ? label.url_name : label.name
  let value = label.names && label.id && label.names[0] != "" ? label.names : label.value
  value = encodeURIComponent(value)
  if (value.length !== 0 && this.search) this.search.set(name, value);
  if (value.length === 0 && this.search || value.length === 1 && value[0] === "" && this.search) this.search.delete(name);
}
Url.prototype.disconstruct = function() {
  const params = [];
  const hash = location.hash.replace('#', '');
  const hashArray = hash.split('&');

  hashArray.forEach( h => {
    h = h.split('=')
    params[ h[0] ] = decodeURIComponent(decodeURIComponent(h[1]));
    this.search.set(h[0], decodeURIComponent(decodeURIComponent(h[1])))
  })
  return params;
}
