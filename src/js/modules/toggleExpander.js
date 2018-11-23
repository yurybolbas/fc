'use strict';

export const toggleExpander = () => {
	let sideBlock = document.getElementById('side-block');
	let sideBlockClass = sideBlock.getAttribute('class');
	if (sideBlockClass === 'collapsed') {
		sideBlock.removeAttribute('class')
	} else {
		sideBlock.setAttribute('class', 'collapsed')
	}
};

