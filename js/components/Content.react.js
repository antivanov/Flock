var React = require('react');
var {RouteHandler} = require('react-router');

var Content = React.createClass({

  render: function() {
    return (
      /* jshint ignore:start */
      <div className="content">
        <RouteHandler flock={this.props.flock} role={this.props.role}/>
        <div className="logo">
         <span>Flock</span>
         <span className="subtitle">events</span>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Content;