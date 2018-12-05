'use strict';

export const requestService = (type, id) => {
	let requestUrl;
	if (type === 'sourceUrl') {
		requestUrl = `https://newsapi.org/v2/top-headlines?sources= +
			${id} +
			&apiKey=2b17f156630a4c0caf074c1251e75c02`;
		console.log(`${id} source requested`)
	}
	if (type === 'sourcesUrl') {
		requestUrl = 'https://newsapi.org/v2/sources?apiKey=2b17f156630a4c0caf074c1251e75c02';
		console.log('All sources requested')
	}
	return new Request(requestUrl)
};

