'use strict';

let renderArticles = (promiseValue) => {
	if (promiseValue && promiseValue.articles) {
		let articlesList = "";
		let articleNumber = getArticleNumber();

		if (promiseValue.articles.length > 0 && promiseValue.articles[0].source) {
			let sourceTitle = promiseValue.articles[0].source.name;
			console.debug("Source Title to Show: " + sourceTitle);
			document.getElementById('source-title').innerHTML = sourceTitle;
		}

		let length = promiseValue.articles.length > articleNumber ? articleNumber : promiseValue.articles.length;
		console.debug("Article Number to Show: " + length);

		for (let i = 0; i < length; i++) {
			let article = promiseValue.articles[i];
			articlesList += `<div class="article">
							<h2><a href="${article.url}" target="_blank">${article.title}</a></h2>`;
			if (article.publishedAt) {
				let date = new Date(Date.parse(article.publishedAt));
				articlesList += `<div class="date">Published: ${date}</div>`;
			}
			if (article.urlToImage) {
				articlesList += `<img src="${article.urlToImage}" alt="">`;
			}
			if (article.content) {
				articlesList += `<p>${article.content}</p>`;
			} else if (article.description) {
				articlesList += `<p>${article.description}</p>`;
			}
			articlesList += `</div>`;
		}

		document.getElementById('articles-list').innerHTML = articlesList;
	}
};

let getArticleNumber = () => {
	let selector = document.getElementById('articles-number');
	let value = selector[selector.selectedIndex].value;
	console.debug("Selected Article Number: " + value);
	return value;
};

const toggleExpander = () => {
	let sideBlock = document.getElementById('side-block');
	let sideBlockClass = sideBlock.getAttribute('class');
	if (sideBlockClass === 'collapsed') {
		sideBlock.removeAttribute('class')
	} else {
		sideBlock.setAttribute('class', 'collapsed')
	}
};

const getSourceUrl = (sourceId) => {
	return `https://newsapi.org/v2/top-headlines?sources= +
			${sourceId} +
			&apiKey=2b17f156630a4c0caf074c1251e75c02`;
};

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
