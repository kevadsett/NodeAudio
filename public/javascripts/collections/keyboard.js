var Keyboard = Backbone.Collection.extend({
    model:KeyModel,
    getWhiteNotes: function() {
        return new Keyboard(this.where({isWhiteKey: true}));
    },
    getBlackNotes: function() {
        return new Keyboard(this.where({isWhiteKey: false}));
    }
});