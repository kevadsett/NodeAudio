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
            numKeys = 61;
        for(var i = offset; i < offset + numKeys; i++) {
            keyModels.push(new KeyModel({noteNumber: i, offset: offset}));
        }
        var keyboard = new Keyboard(keyModels);
        console.log(keyboard.getWhiteNotes());
        var keyboardView = new KeyboardView({collection: keyboard});
        
        var keyboardEl = keyboardView.render();
        keyboardEl.height = 600;
        keyboardEl.width = 800;
        this.$el.append(keyboardView.render());
    }
});