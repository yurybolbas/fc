'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var renderArticles = function renderArticles(promiseValue) {
  if (promiseValue && promiseValue.articles) {
    var articlesList = "";
    var articleNumber = getArticleNumber();

    if (promiseValue.articles.length > 0 && promiseValue.articles[0].source) {
      var sourceTitle = promiseValue.articles[0].source.name;
      console.debug("Source Title to Show: " + sourceTitle);
      document.getElementById('source-title').innerHTML = sourceTitle;
    }

    var length = promiseValue.articles.length > articleNumber ? articleNumber : promiseValue.articles.length;
    console.debug("Article Number to Show: " + length);

    for (var i = 0; i < length; i++) {
      var article = promiseValue.articles[i];
      articlesList += "<div class=\"article\">\n\t\t\t\t\t\t\t<h2><a href=\"".concat(article.url, "\" target=\"_blank\">").concat(article.title, "</a></h2>");

      if (article.publishedAt) {
        var date = new Date(Date.parse(article.publishedAt));
        articlesList += "<div class=\"date\">Published: ".concat(date, "</div>");
      }

      if (article.urlToImage) {
        articlesList += "<img src=\"".concat(article.urlToImage, "\" alt=\"\">");
      }

      if (article.content) {
        articlesList += "<p>".concat(article.content, "</p>");
      } else if (article.description) {
        articlesList += "<p>".concat(article.description, "</p>");
      }

      articlesList += "</div>";
    }

    document.getElementById('articles-list').innerHTML = articlesList;
  }
};

var getArticleNumber = function getArticleNumber() {
  var selector = document.getElementById('articles-number');
  var value = selector[selector.selectedIndex].value;
  console.debug("Selected Article Number: " + value);
  return value;
};

var toggleExpander = function toggleExpander() {
  var sideBlock = document.getElementById('side-block');
  var sideBlockClass = sideBlock.getAttribute('class');

  if (sideBlockClass === 'collapsed') {
    sideBlock.removeAttribute('class');
  } else {
    sideBlock.setAttribute('class', 'collapsed');
  }
};

var getSourceUrl = function getSourceUrl(sourceId) {
  return "https://newsapi.org/v2/top-headlines?sources= +\n\t\t\t".concat(sourceId, " +\n\t\t\t&apiKey=2b17f156630a4c0caf074c1251e75c02");
};

var currentSourceId = '';

var onSourceClick = function onSourceClick(event) {
  console.log("Old SourceId: ".concat(currentSourceId));

  if (event.target.id !== 'sources-list') {
    currentSourceId = event.target.id;
  }

  console.log("New SourceId: ".concat(currentSourceId));
  loadSource();
  toggleExpander();
};

var loadSource =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var sourceUrl, req, sourceResponse, articlesResult;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (currentSourceId) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            console.debug("loadSource() called");
            console.debug("Selected Source Id: " + currentSourceId);
            sourceUrl = getSourceUrl(currentSourceId);
            req = new Request(sourceUrl);
            _context.prev = 6;
            _context.next = 9;
            return fetch(req);

          case 9:
            sourceResponse = _context.sent;
            articlesResult = sourceResponse.json();
            articlesResult.then(renderArticles);
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](6);
            console.error(_context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[6, 14]]);
  }));

  return function loadSource() {
    return _ref.apply(this, arguments);
  };
}();

document.getElementById('articles-number').addEventListener('change', loadSource);
var sourcesUrl = "https://newsapi.org/v2/sources?apiKey=2b17f156630a4c0caf074c1251e75c02";
var sourcesReq = new Request(sourcesUrl);

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2() {
  var sourcesResponse, result;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return fetch(sourcesReq);

        case 3:
          sourcesResponse = _context2.sent;
          result = sourcesResponse.json();
          console.log(result);
          result.then(function (promiseValue) {
            if (promiseValue && promiseValue.sources && promiseValue.sources.length > 0) {
              var list = "";
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = promiseValue.sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var source = _step.value;
                  list += "<li id= ".concat(source.id, "  >  ").concat(source.name, "  </li>");
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              document.getElementById('sources-list').innerHTML += list;
              currentSourceId = promiseValue.sources[0].id;
              loadSource();
              var itemsList = document.getElementById('sources-list');
              itemsList.addEventListener("click", onSourceClick);
            }
          });
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this, [[0, 9]]);
}))();

document.getElementById('expander').addEventListener("click", toggleExpander);