require('es6-promise').polyfill();
require('fetch-ie8');

const tabs = document.querySelectorAll('.js-tab');

// This function updates a DOM element with data fetched from the Content API. It should be passed three arguments :
// * the listTopic as a string
// * the DOM element that should be updated with the new data
// * (Optional) the maximum number of items to be displayed, as a number
const fillListFromAPI = (listTopic, element, maxItems) =>
{
  const numItems = maxItems <= 10 ? maxItems : 10;
  let updatedNewsList = '';

  fetch(`http://content.guardianapis.com/search?section=${listTopic}&api-key=9wur7sdh84azzazdt3ye54k4`)
    .then(function (response) {
      return response.json()
    }).then(function (json) {
    // @TODO handle the case in which we receive less than 10 items from the API
    const results = json.response.results;

    for (let i = 0; i < numItems; i++) {
      updatedNewsList += `<li><a href="${results[i].webUrl}">${results[i].webTitle}</a></li>`;
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
  const numItemsInList = 5;

  // First we fetch data for all tabs on page load
  fillListFromAPI(topic, newsList, numItemsInList);

  // Then we bind the event listener to handle the tabs being clicked
  tab.addEventListener('click', function() {
    [].forEach.call(allNewsLists, function(currentNewsList) {
      currentNewsList.classList.remove('active');
    });

    newsList.classList.add('active');
    fillListFromAPI(topic, newsList, numItemsInList);
  });
});
