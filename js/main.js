require('es6-promise').polyfill();
require('fetch-ie8');

const tabs = document.querySelectorAll('.js-tab');

// This function updates a DOM element with data fetched from the Content API. It must be passed two arguments :
// * the listTopic as a string
// * the DOM element that should be updated with the new data
const fillListFromAPI = (listTopic, element) =>
{
  let updatedNewsList = '';

  fetch(`http://content.guardianapis.com/search?section=${listTopic}&api-key=9wur7sdh84azzazdt3ye54k4`)
    .then(function (response) {
      return response.json()
    }).then(function (json) {
    // @TODO handle the case in which we receive less than 5 items from the API
    const results = json.response.results;
    for (var key in results) {
      if (results.hasOwnProperty(key)) {
        updatedNewsList += `<li><a href="${results[key].webUrl}">${results[key].webTitle}</a></li>`;
      }
    }
  }).catch(function (ex) {
    // @TODO handle fetch error
  }).then(function () {
    // Check if the new string actually contains something, otherwise leave the DOM unchanged
    if (updatedNewsList) {
      element.innerHTML = updatedNewsList;
    }
  });
}


[].forEach.call(tabs, function(tab) {
  const topic = tab.getAttribute('data-topic');
  const allNewsLists = document.querySelectorAll('.js-news-list');
  const newsList = document.querySelector('.js-news-items').querySelector(`[data-topic="${topic}"]`);

  // First we fetch data for all tabs on page load
  fillListFromAPI(topic, newsList);

  // Then we bind the event listener to handle the tabs being clicked
  tab.addEventListener('click', function() {
    [].forEach.call(allNewsLists, function(currentNewsList) {
      currentNewsList.classList.remove('active');
    });

    newsList.classList.add('active');
    fillListFromAPI(topic, newsList);
  });
});
