var React = require('react');
var Router = require('react-router');
var FlockApp = require('./components/FlockApp.react.js');
var Event = require('./components/Event.react.js');
var Participants = require('./components/Participants.react.js');
var RouterStore = require('./stores/RouterStore.js');
var {Route, Handler} = Router;

var routes = (
  /* jshint ignore:start */
  <Route handler={FlockApp}>
    <Route name="event" path="event/:role/:accessKey" handler={Event} />
    <Route name="participants" path="participants/:role/:accessKey" handler={Participants} />
  </Route>
  /* jshint ignore:end */
);

//TODO: Default route handler
//TODO: 'Not found' route handler

var router = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});

RouterStore.set(router);

router.run(function(Handler) {
  /* jshint ignore:start */
  var Router = React.render(<Handler/>, document.getElementById('flockapp'));
  /* jshint ignore:end */
});