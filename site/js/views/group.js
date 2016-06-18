'use strict';
/* global Backbone */


var app = app || {};

app.GroupView = Backbone.View.extend({
  el: $('#bands'),

  initialize: function() {
    this.collection = new app.Group();
    this.collection.fetch({
      reset: true
    });
    this.render();

    this.listenTo(this.collection, 'add', this.renderBand);
    this.listenTo(this.collection, 'reset', this.render);
  },

  events: {
    'click #add': 'addBand'
  },

  // render group by rendering each band in its collection
  render: function() {
    this.collection.each(function(item) {
      this.renderBand(item);
    }, this);
  },

  // render a band by creating a BandView and appending the
  // element it renders to the group's element
  renderBand: function(item) {
    var bandView = new app.BandView({
      model: item
    });
    this.$el.append(bandView.render().el);
  },

  addBand: function(e) {
    e.preventDefault();

    var formData = {};

    $('#addBand div').children('input').each(function(i, el) {
      if ($(el).val() !== '') {
        formData[el.id] = $(el).val();
      }
    });
    //this.collection.create(formData);
    this.collection.create(new app.Band(formData));
  }
});