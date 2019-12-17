import {setArray} from '../Helpers/Array'
import {capitalize} from '../Helpers/String'

import {Range} from '../Inputs/Range';
import Radio from '../Inputs/Radio';
import Select from '../Inputs/Select';
import Search from '../Inputs/Search';
import Checkbox from '../Inputs/Checkbox';

import Url from '../Core/Url'

export function Filter(params){
    this.options = {
      url : params.url ? params.url : false,
      create_url : params.create_url ? params.create_url : false,
    };

    this.url = params.create_url ? new Url() : false;

    this.results = {
      target:           false,
      action:           false,
      id    :           false,
      visible_class:    false,
      hidden_class :    false,
      before_show  :    false,
      before_hide  :    false,
    };

    this.nb_results = {
        target: '',
        no_results: '',
        singular: '',
        plural: ''
    }

    this.form = {
        target: '',
        action: '',
        target: '',
    }
    return this;

};

Filter.prototype.construct = function(params){
    this.inputs = {};

    if (params.results) this.results = setArray(this.results, params.results);
    if (params.nb_results) this.nb_results = setArray(this.nb_results, params.nb_results);
    if (params.form) this.form = setArray(this.form, params.form);



    return this;

}

Filter.prototype.setInputs = function( inputs ) {

    // --- set inputs --- //
    // for (const key in inputs) {
    //     if (inputs[key])      this.get(inputs, key, capitalize(key))
    // }
    if (inputs.select)      this.get(inputs.select, "select", Select)
    if (inputs.search)      this.get(inputs.search, "search", Search)
    if (inputs.checkbox)    this.get(inputs.checkbox, "checkbox", Checkbox)
    if (inputs.radio)       this.get(inputs.radio, "radio", Radio)
    if (inputs.range)       this.get(inputs.range, "range", Range)

    return this;
}

Filter.prototype.get = function(array, val, fct ) {
    this.inputs[val] = [];

    array.forEach( (el, index)=> {
        let obj = new fct();
        if(!document.querySelector(`[name="${el.name}"]`)){
            delete array[index];
            return
        }
        const els = el.url_name ? el.url_name : el.name;
        if(this.url && location.hash && this.url.params[els] ) el.value = this.url.params[els];

        this.inputs[val].push( setArray( obj, el ) )

        if(el.value) obj.create(this);
    })
}