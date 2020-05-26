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

Url.prototype.constructRange = function(label){
  let name = label.url_name ? label.url_name : label.name
  let value;
  let minValue = label.min.value
  let maxValue = label.max.value
  
  if(minValue === "" && maxValue != "") minValue = 0
  
  if(minValue && maxValue) value = `${minValue}-${maxValue}`
  else if(minValue && !maxValue) value = minValue
  else if(!minValue && maxValue) value = maxValue

  
  if (minValue !== label.min.min || maxValue !== label.max.max && this.search) this.search.set(name, value);
  if (minValue === label.min.min && this.search && !label.multiple || minValue === "" && maxValue === "" || minValue === label.min.min && maxValue === label.max.max && this.search && label.multiple) this.search.delete(name);

}

Url.prototype.disconstruct = function() {
  const params = [];
  const hash = location.hash.replace('#', '');
  const hashArray = hash.split('&');

  hashArray.forEach( h => {
    h = h.split('=')
    params[ h[0] ] = decodeURIComponent(decodeURIComponent(h[1]));
    this.search.set(h[0], decodeURIComponent(h[1]))
  })
  return params;
}

