var KeyboardView = Backbone.View.extend({
    tagName:'canvas',
    initialize: function() {
        this.context = this.el.getContext("2d");
        _.each(this.collection.models, function(model) {
            new KeyView({model: model});
        }, this);
    },
    render: function() {
        this.context.clearRect(0, 0, this.el.width, this.el.height);
        musicEvents.trigger("render", this.context);
        return this.el;
    }
});