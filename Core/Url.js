module.exports = () => { return new Url() }
function Url(){
  this.change();
  window.addEventListener('popstate', () => { 
    this.change()
    this.customEvent()
  });
  window.addEventListener('pushstate', () => {
    this.change()
    this.customEvent()
  });

  return this;
};
Url.prototype.customEvent = function(){
  const newEvent = new CustomEvent(
    'url', 
    {detail: this.params}
  )
  document.dispatchEvent(newEvent)
}

Url.prototype.change = function(){
  this.search = new URLSearchParams(location.search);
  this.params = [];
  var it = this.search.keys();
  let keys = it.next();
  while (keys.done === false) {
    const uri = decodeURIComponent(decodeURIComponent( this.search.get(keys.value) ))
    this.params[keys.value] = uri
    keys = it.next()
  }
}

Url.prototype.construct = function(label){
  let name = label.url_name ? label.url_name : label.name

  let value = label.names && label.id && label.names[0] != "" ? label.names : label.value
  value = encodeURIComponent(value)
  
  
  if (value.length !== 0 && this.search) this.search.set(name, value);
  if (value.length === 0 && this.search || value.length === 1 && value[0] === "" && this.search) this.search.delete(name);

}
Url.prototype.reset = function(key){
  this.search.delete(key)
  if(this.params && this.params.indexOf(key) > -1) delete this.params[key]
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
