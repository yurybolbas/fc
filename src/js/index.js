'use strict';
import {toggleExpander} from './modules/toggleExpander.js';
import {requestService} from './modules/requestFactory.js';

let currentSourceId = '';

let onSourceClick = (event) => {
	console.log(`Old SourceId: ${currentSourceId}`);
	if (event.target.id !== 'sources-list') {
		currentSourceId = event.target.id;
	}
	console.log(`New SourceId: ${currentSourceId}`);
	import('./modules/renderSourceName.js').then((renderSourceName) => {
			loadSource(renderSourceName.renderSourceName)
		}
	);
	toggleExpander();
};

let loadSource = async (sourceToLoad) => {
	if (!currentSourceId) {
		return;
	}

	console.debug("loadSource() called");
	console.debug("Selected Source Id: " + currentSourceId);

	try {
		let sourceResponse = await new requestService('sourceUrl', currentSourceId);
		let articlesResult = sourceResponse.json();
		articlesResult.then(sourceToLoad);
	} catch (e) {
		console.error(e);
		import('./modules/errorHandler.js').then((errorHandler) => {
				errorHandler.Modal.getInstance().getModal(e)
			}
		);
	}
};

let renderArticlesContent = () => {
	import('./modules/renderArticles.js').then((renderArticles) => {
			loadSource(renderArticles.renderArticles)
		}
	);
};

document.getElementById('articles-number').addEventListener('change', loadSource);

(async () => {
	try {
		let sourcesResponse = await new requestService('sourcesUrl');
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
				import('./modules/renderSourceName.js').then((renderSourceName) =>
						loadSource(renderSourceName.renderSourceName)
				);

				let itemsList = document.getElementById('sources-list');
				itemsList.addEventListener("click", onSourceClick);

			}
		});
	} catch (e) {
		console.error(e);
		import('./modules/errorHandler.js').then((errorHandler) => {
				errorHandler.Modal.getInstance().getModal(e)
			}
		);
	}
})();

document.getElementById('expander').addEventListener("click", toggleExpander);
document.getElementById('show-articles').addEventListener("click", renderArticlesContent);
