export const error = (msg) => {
  console.error(msg);
  return;
};

export const isTarget = (e, label) => {
  return closest(e.target, label.name, label.name) || e.target.getAttribute('name') === label.name;
}
export const isTargetSelected = (e, label, form) => {
	const attr = e.target.getAttribute('rel')

	if (attr === "" || attr === null || attr === "default" || attr === "all") return true;
	const target = attr ? form.querySelector(`[name="${label.name}"] [value="${attr}"]`)
											: e.target
	return closest(target, "select", "select") || target.getAttribute('name') === label.name;
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
