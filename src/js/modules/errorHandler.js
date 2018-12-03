'use strict';
import { elRemove } from "./removeElement.js";

export const errorPopup = (errText) => {
	var divError = document.createElement('div');
	divError.id = 'error-popup';
	divError.innerHTML = `<p>${errText}</p>
		<button id="err-close">Close</button>`;
	document.body.appendChild(divError);
	document.getElementById('err-close').addEventListener("click", () => elRemove(divError.id));
};
