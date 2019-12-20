export const error = (msg) => {
  console.error(msg);
  return;
};

export const isTarget = (e, el) => {
  el.target = e.target.hasAttribute('id') ? e.target.getAttribute('id') : e.target.value
  return closest(e.target, el.name, el.name) || e.target.getAttribute('name') === el.name;
}
export const isTargetSelected = (e, el, form) => {
	const attr = e.target.getAttribute('rel')
	if (attr === "" || attr === null || attr === "default" || attr === "all") return true;
	const target = attr ? form.querySelector(`[name="${el.name}"] [value="${attr}"]`)
											: e.target
	if (!target) return;
	return closest(target, "select", "select") || target.getAttribute('name') === el.name;
}

export const closest = (el, selector, stopSelector) => {
	var retval = null;
	while (el) {
		if (el.matches(selector)) {
			retval = el;
			break
		} else if (stopSelector && el.matches(stopSelector)) {
			break
		}
		el = el.parentElement;
	}
	return retval;
}



if (!Element.prototype.matches) {
	Element.prototype.matches =
		Element.prototype.matchesSelector ||
		Element.prototype.mozMatchesSelector ||
		Element.prototype.msMatchesSelector ||
		Element.prototype.oMatchesSelector ||
		Element.prototype.webkitMatchesSelector ||
		function (s) {
			var matches = (this.document || this.ownerDocument).querySelectorAll(s),
				i = matches.length;
			while (--i >= 0 && matches.item(i) !== this) {}
			return i > -1;
		};
}
