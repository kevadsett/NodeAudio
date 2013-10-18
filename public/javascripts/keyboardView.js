var KeyboardView = function(model) {
    this.model = model;
    events.on('render', this.render, this);
}

KeyboardView.prototype = {
    render: function() {
        //rendering
    }
}