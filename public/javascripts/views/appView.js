var AppView = Backbone.View.extend({
    el: 'body',
    initialize: function() {
        try {
            // Fix up for prefixing
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            audioContext = new AudioContext();
        }
        catch(e) {
            alert('Web Audio API is not supported in this browser');
        }
        
        var keyModels = [],
            offset = 24,
            numKeys = 49;
        for(var i = offset; i < offset + numKeys; i++) {
            keyModels.push(new KeyModel({noteNumber: i, offset: offset}));
        }
        var keyboard = new Keyboard(keyModels);
        var whiteKeyWidth = keyboard.at(0).get('width');
        var xOffset = whiteKeyWidth * 1.5;
        _.each(keyboard.getWhiteNotes().models, function(keyModel, index) {
            keyModel.set('x', (whiteKeyWidth * index) + xOffset);
        }, this);
        
        var lastPosition = whiteKeyWidth/2 + xOffset;
        _.each(keyboard.getBlackNotes().models, function(keyModel, index) {
            keyModel.set('x', lastPosition);
            lastPosition = keyModel.get('x') + whiteKeyWidth;
            
            if (/[DA]\#/.test(keyModel.get('noteName'))) {
                lastPosition += whiteKeyWidth;
            }
        }, this);
        
        var keyboardView = new KeyboardView({collection: keyboard});
        
        var keyboardEl = keyboardView.el//render();
        keyboardEl.height = 600;
        keyboardEl.width = 800;
        this.$el.append(keyboardView.render());
    }
});