var React = require('react');
var FlockConstants = require('../constants/FlockConstants');
var FlockActions = require('../actions/FlockActions');
var Button = require('./widgets/Button.react');
var Validations = require('./mixins/validations/Validations');
var ValidatorMixin = require('./mixins/Validator.react');
var Util = require('../utils/Util');

var _savedState;

var Event = React.createClass({

  mixins: [ValidatorMixin],

  statics: {
    FIELDS: [
      'name',
      'organizer',
      'details',
      'where',
      'when'
    ]
  },

  getInitialState: function() {
    return {
      name: '',
      organizer: '',
      details: '',
      where: '',
      when: '',
      initialized: false
    };
  },

  componentDidMount: function() {
    if (_savedState) {
      this.setState(_savedState);
    }
    this.setFieldValidations([
      new Validations.NonEmptyValidation('name'),
      new Validations.NonEmptyValidation('organizer')
    ]);
  },

  componentWillUnmount: function() {
    _savedState = this.state;
  },

  componentWillReceiveProps: function(properties) {
    this._initializeState(properties);
  },

  _initializeState: function(properties) {
    var flock = properties.flock;

    this.setState({
      name: flock.name,
      organizer: flock.organizer,
      details: flock.details,
      where: flock.where,
      when: flock.when,
      initialized: true
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
    }) && this.state.initialized;
  },

  _save: function() {
    if (!this.hasErrors()) {
      FlockActions.save({
        name: this.state.name,
        organizer: this.state.organizer,
        details: this.state.details,
        where: this.state.where,
        when: this.state.when
      });
    }
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
    var hasChanges = this._hasChanges();
    var role = this.props.role;
    var isAdmin = (role === FlockConstants.ROLES.ADMIN);
    var unsavedChangesIndicator;
    var footer;

    var fields = Event.FIELDS.map(function(field, idx) {
      var errorMessage = self.getErrorMessage(field);
      var hasErrorValue = (typeof errorMessage !== 'undefined');
      var className = hasErrorValue ? 'error' : '';

      /* jshint ignore:start */
      var fieldValue = isAdmin ?
        (field === 'details' ?
          (
            <textarea
              className={className}
              onChange={self._onChange.bind(self, field)}
              value={self.state[field]}>
            </textarea>
          ) : (
            <input
              className={className}
              type="text"
              value={self.state[field]}
              onChange={self._onChange.bind(self, field)}>
            </input>
          )
        ) : (
          <label className="field-value">{self.state[field]}</label>
        );
      /* jshint ignore:end */

      if (hasErrorValue) {
        /* jshint ignore:start */
        errorMessage = (
          <label className="field-error-message">{errorMessage}</label>
        );
        /* jshint ignore:end */
      }

      return (
        /* jshint ignore:start */
        <div key={idx} className="field">
          <label>{Util.capitalize(field)}</label>
          {fieldValue}
          {errorMessage}
        </div>
        /* jshint ignore:end */
      );
    });

    if (isAdmin) {
      unsavedChangesIndicator = (
        /* jshint ignore:start */
        <span
          className={(hasChanges ? 'unsaved-changes has-changes': 'unsaved-changes')}>*</span>
        /* jshint ignore:end */
      );
      footer = (
        /* jshint ignore:start */
        <footer>
          <Button
            label="Save"
            onClick={this._save}
            disabled={!hasChanges} />
          <Button
            label="Cancel"
            onClick={this._cancel}
            disabled={!hasChanges} />
        </footer>
        /* jshint ignore:end */
      );
    }

    return (
      /* jshint ignore:start */
      <section className="event-details">
        <header>
          <i className="fa fa-4x fa-calendar"></i>
          <span className="event-details-description">What, when, where and any additional details.</span>
        </header>
        {fields}
        {unsavedChangesIndicator}
        {footer}
      </section>
      /* jshint ignore:end */
    );
  }
});

module.exports = Event;