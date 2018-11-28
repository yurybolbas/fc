'use strict';

export const getSourceUrl = (sourceId) => {
	return `https://newsapi.org/v2/top-headlines?sources= +
			${sourceId} +
			&apiKey=2b17f156630a4c0caf074c1251e75c02`;
};

