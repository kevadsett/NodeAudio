var Keyboard = Backbone.Collection.extend({
    model:keyModel,
    getWhiteNotes: function() {
        return new Keyboard(this.where({isWhiteNote: true}));
    },
    getBlackNotes: function() {
        return new Keyboard(this.where({isWhiteNote: false}));
    }
});