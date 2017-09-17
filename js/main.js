require('es6-promise').polyfill();
require('fetch-ie8');

const tabs = document.querySelectorAll('.js-tab');

// For each tab, fetch the corresponding news items
[].forEach.call(tabs, function(tab) {
  const topic = tab.getAttribute('data-topic');
  const newsList = document.querySelector('.js-news-items').querySelector(`[data-topic="${topic}"]`);
  let updatedNewsList = '';

  fetch(`http://content.guardianapis.com/search?section=${topic}&api-key=9wur7sdh84azzazdt3ye54k4`)
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      // @TODO handle the case in which we receive less than 5 items from the API
      const results = json.response.results;
      for (var key in results) {
        if(results.hasOwnProperty(key)) {
          updatedNewsList += `<li><a href="${results[key].webUrl}">${results[key].webTitle}</a></li>`;
        }
      }
  }).catch(function(ex) {
    // @TODO handle fetch error
  }).then(function() {
    // Check if the new string actually contains something, otherwise leave the DOM unchanged
    if(updatedNewsList) {
      newsList.innerHTML = updatedNewsList;
    }
  });
});
