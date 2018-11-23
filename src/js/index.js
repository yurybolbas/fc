'use strict';
import { renderArticles } from './modules/renderArticles.js';
import { toggleExpander } from './modules/toggleExpander.js';
import { getSourceUrl } from './modules/getSourceUrl.js';

let currentSourceId = '';

let onSourceClick = (event) => {
	console.log(`Old SourceId: ${currentSourceId}`);
	if (event.target.id !== 'sources-list') {
		currentSourceId = event.target.id;
	}
	console.log(`New SourceId: ${currentSourceId}`);
	loadSource();
	toggleExpander();
};

let loadSource = async () => {
	if (!currentSourceId) {
		return;
	}

	console.debug("loadSource() called");
	console.debug("Selected Source Id: " + currentSourceId);

	let sourceUrl = getSourceUrl(currentSourceId);
	let req = new Request(sourceUrl);
	try {
		let sourceResponse = await fetch(req);
		let articlesResult = sourceResponse.json();
		articlesResult.then(renderArticles);
	} catch(e) {
		console.error(e);
	}
};

document.getElementById('articles-number').addEventListener('change', loadSource);

const sourcesUrl = "https://newsapi.org/v2/sources?apiKey=2b17f156630a4c0caf074c1251e75c02";
const sourcesReq = new Request(sourcesUrl);

(async () => {
	try {
		let sourcesResponse = await fetch(sourcesReq);
		let result = sourcesResponse.json();
		console.log(result);
		result.then((promiseValue) => {
			if (promiseValue && promiseValue.sources && promiseValue.sources.length > 0) {
				let list = "";
				for (let source of promiseValue.sources) {
					list += `<li id= ${source.id}  >  ${source.name}  </li>`;
				}

				document.getElementById('sources-list').innerHTML += list;

				currentSourceId = promiseValue.sources[0].id;
				loadSource();

				let itemsList = document.getElementById('sources-list');
				itemsList.addEventListener("click", onSourceClick);

			}
		});
	} catch (e) {
		console.error(e);
	}
})();

document.getElementById('expander').addEventListener("click", toggleExpander);
