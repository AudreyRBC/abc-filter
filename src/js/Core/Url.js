import Checkbox from '../Inputs/Checkbox'
import Radio from '../Inputs/Radio'
import Select from '../Inputs/Select'
import Search from '../Inputs/Search'

export default function Url(){
  this.search = new URLSearchParams();
  if(location.hash) this.params = this.disconstruct()
};

Url.prototype.construct = function(label){
  let name = label.url_name ? label.url_name : label.name
  const value = label.names ? label.names : label.value
  if (value.length !== 0 && this.search) this.search.set(name, value);
  if (value.length === 0 && this.search || value.length === 1 && value[0] === "" && this.search) this.search.delete(name);
}
Url.prototype.disconstruct = function() {
  const params = [];
  const hash = location.hash.replace('#', '');
  const hashArray = hash.split('&');
  hashArray.forEach( h => {
    h = h.split('=')
    params[ h[0] ] = h[1].split('%2C');
    this.search.set(h[0], h[1].split('%2C'))
  })
  return params;
}
