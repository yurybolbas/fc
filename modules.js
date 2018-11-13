'use strict';

export let renderArticles = (promiseValue) => {
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

export let getArticleNumber = () => {
	let selector = document.getElementById('articles-number');
	let value = selector[selector.selectedIndex].value;
	console.debug("Selected Article Number: " + value);
	return value;
};

export const toggleExpander = () => {
	let sideBlock = document.getElementById('side-block');
	let sideBlockClass = sideBlock.getAttribute('class');
	if (sideBlockClass === 'collapsed') {
		sideBlock.removeAttribute('class')
	} else {
		sideBlock.setAttribute('class', 'collapsed')
	}
};
