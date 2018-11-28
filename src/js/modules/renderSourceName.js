'use strict';

export let renderSourceName = (promiseValue) => {
	if (promiseValue && promiseValue.articles) {
		document.getElementById('articles-list').innerHTML = '';

		if (promiseValue.articles.length > 0 && promiseValue.articles[0].source) {
			let sourceTitle = promiseValue.articles[0].source.name;
			console.debug("Source Title to Show: " + sourceTitle);
			document.getElementById('source-title').innerHTML = sourceTitle;
		}
	}
};
