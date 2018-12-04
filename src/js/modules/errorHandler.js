'use strict';

export const Modal = (() => {
	let instance,
		divError;

	let getModal = (errText) => {
		divError = document.createElement('div');
		divError.id = 'error-popup';
		divError.innerHTML = `<div class="error-body"><div class="error-content"><p>${errText}</p>
		<button id="err-close">Close</button></div></div>`;
		document.body.appendChild(divError);
		document.getElementById('err-close').addEventListener("click", () => elRemove(divError.id));
		return divError;
	};

	let elRemove = (id) => {
		let elToRemove = document.getElementById(id);
		elToRemove.parentNode.removeChild(elToRemove);
	};

	var createInstance = function () {
		return {
			getModal: getModal,
			elRemove: elRemove
		}
	};

	return {
		getInstance: function () {
			return instance || (instance = createInstance());
		}
	};

})();
