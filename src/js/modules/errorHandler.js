'use strict';
import { elRemove } from "./removeElement.js";

export const errorPopup = (errText) => {
	var divError = document.createElement('div');
	divError.id = 'error-popup';
	divError.innerHTML = `<div class="error-body"><div class="error-content"><p>${errText}</p>
		<button id="err-close">Close</button></div></div>`;
	document.body.appendChild(divError);
	document.getElementById('err-close').addEventListener("click", () => elRemove(divError.id));
};
