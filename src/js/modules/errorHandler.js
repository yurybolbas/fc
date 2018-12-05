'use strict';

export const Modal = (() => {
	let instance,
		divError;

	let getModal = (errText) => {
		let errItem = `<li>${errText}</li>`;
		if (document.getElementById('error-popup')) {
			divError = document.getElementById('error-popup');
			let errList = document.getElementById('errors-list');
			errList.innerHTML += errItem;
		} else {
			divError = document.createElement('div');
			divError.id = 'error-popup';
			divError.innerHTML = `<div class="error-body"><div class="error-content">
				<h2>Error</h2>
				<ol id="errors-list">${errItem}</ol>
				<button id="err-close">Close</button></div></div>`;
			document.body.appendChild(divError);
		}
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
