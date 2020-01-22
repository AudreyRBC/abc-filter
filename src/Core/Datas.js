var {Fetch} = require( '../Helpers/Fetch' )

var onChange = require ( '../Actions/Change' )
var onClick = require ( '../Actions/Click' )
var onRedirect = require ( '../Actions/Redirect' )

var Url = require ( '../Core/Url' );
module.exports = () => { return new Datas() }

function Datas(){};

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
        if(el.debug) {
          console.info( "url: " + el.options.url)
          console.info( el.datas.length + " datas founds")
        }
        // if(el.options.create_url === true) el.options.url_settings = new Url();

        let action;
        switch (el.form.action) {
          case 'change':
            action = new onChange( el );
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
