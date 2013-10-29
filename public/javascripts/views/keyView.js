var KeyView = Backbone.View.extend({
    initialize: function() {
        //console.log(this.model.get('noteName') + " is a white note: " + this.model.get('isWhiteNote'));
        this.listenTo(musicEvents, "render", this.render);
    },
    render: function(context) {
        if(this.model.get('isWhiteNote')) {
            context.fillStyle = "#EEEEEE";
        } else {
            context.fillStyle = "#333333";
        }
        context.fillRect(this.model.get('x'), this.model.get('y'), this.model.get('width'), this.model.get('height'));
        context.strokeStyle = "#000000";
        context.rect(this.model.get('x'), this.model.get('y'), this.model.get('width'), this.model.get('height'));
        context.stroke();
    }
});