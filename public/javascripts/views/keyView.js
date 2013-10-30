var KeyView = Backbone.View.extend({
    initialize: function() {
        this.listenTo(musicEvents, (this.model.get('isWhiteKey') ? "renderWhiteKeys": "renderBlackKeys"), this.render);
    },
    render: function(context) {
        var x = this.model.get('x'),
            y = this.model.get('y'),
            w =this.model.get('width'),
            h = this.model.get('height');
        context.beginPath();
        context.rect(x - w/2, y, w, h);
        context.fill();
        context.strokeStyle = "#000000"
        context.stroke();
        context.closePath();
    }
});