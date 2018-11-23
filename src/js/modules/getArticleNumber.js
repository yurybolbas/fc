'use strict';

export let getArticleNumber = () => {
	let selector = document.getElementById('articles-number');
	let value = selector[selector.selectedIndex].value;
	console.debug("Selected Article Number: " + value);
	return value;
};
