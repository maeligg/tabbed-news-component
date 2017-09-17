require('es6-promise').polyfill();
require('fetch-ie8');

fetch('http://content.guardianapis.com/search?section=uk-news&api-key=9wur7sdh84azzazdt3ye54k4')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
  console.log('parsed json', json.response.results)
}).catch(function(ex) {
  console.log('parsing failed', ex)
});
