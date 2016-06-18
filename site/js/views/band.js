'use strict';
/* global Backbone, _ */

var app = app || {};

app.BandView = Backbone.View.extend({
  tagName: 'div',
  className: 'bandContainer',
  template: _.template($('#bandTemplate').html()),

  events: {
    'click .delete': 'deleteBand'
  },

  deleteBand: function() {
    //Delete model
    this.model.destroy();

    //Delete view
    this.remove();
  },

  render: function() {
    //this.el is what we defined in tagName. use $el to get access to jQuery html() function
    this.$el.html(this.template(this.model.attributes));

    return this;
  }

});