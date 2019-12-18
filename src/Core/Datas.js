import {Fetch} from '../Helpers/Fetch'

import {onChange} from '../Actions/Change'
import {onClick} from '../Actions/Click'
import {onRedirect} from '../Actions/Redirect'

import {Url} from '../Core/Url'

export function Datas(){};

Datas.prototype.get = function( el ){
  return Fetch(el.options.url, (error, success) => {
      if(error) console.log(error);
      else {
        el.datas = success;
        el.datas = el.datas.filter( d => {
          d.hide = false;
          d.abc_selector = document.querySelector("#"+d[el.results.id])
          if(d.abc_selector) return d;
        });

        console.info("ABC Ready")
        // if(el.options.create_url === true) el.options.url_settings = new Url();

        let action;
        switch (el.form.action) {
          case 'change':
            action = new onChange(el);
            break;
          case 'submit':
            action = new onClick(el);
            break;
          case 'redirect':
            action = new onRedirect(el);
            break;

        }

      }
  })
}
