var React = require('react');
var FlockActions = require('../actions/FlockActions');
var Button = require('./widgets/Button.react');

var Event = React.createClass({

  statics: {
    FIELDS: ['name', 'organizer', 'details', 'where', 'when']
  },

  getInitialState: function() {
    return {
      name: '',
      organizer: '',
      details: '',
      where: '',
      when: ''
    };
  },

  componentWillReceiveProps: function(properties) {
    var flock = properties.flock;

    this.setState({
      name: flock.name,
      organizer: flock.organizer,
      details: flock.details,
      where: flock.where,
      when: flock.when
    });
  },

  _onChange: function(field, event) {
    var newState = {};

    newState[field] = event.target.value;
    this.setState(newState);
  },

  _hasChanges: function() {
    var self = this;

    return Event.FIELDS.some(function(field) {
      return self.props.flock[field] !== self.state[field];
    });
  },

  _save: function() {
    FlockActions.save({
      name: this.state.name,
      organizer: this.state.organizer,
      details: this.state.details,
      where: this.state.where,
      when: this.state.when
    });
  },

  _cancel: function() {
    var flock = this.props.flock;

    this.setState({
      name: flock.name,
      organizer: flock.organizer,
      details: flock.details,
      where: flock.where,
      when: flock.when
    });
  },

  render: function() {
    var self = this;

    var fields = Event.FIELDS.map(function(field, idx) {
      return (
        /* jshint ignore:start */
        <div key={idx} className="field">
          <label>{field}</label>
          <input type="text" value={self.state[field]}
            onChange={self._onChange.bind(self, field)}></input>
        </div>
        /* jshint ignore:end */
      );
    });
    var unsavedChangesIndicatorClass = (self._hasChanges() ? 'unsaved-changes has-changes': 'unsaved-changes');

    return (
      /* jshint ignore:start */
      <section className="event-details">
        {fields}
        <span className={unsavedChangesIndicatorClass}>*</span>
        <footer>
          <Button label="Save" onClick={this._save} />
          <Button label="Cancel" onClick={this._cancel} />
        </footer>
      </section>
      /* jshint ignore:end */
    );
  }
});

module.exports = Event;