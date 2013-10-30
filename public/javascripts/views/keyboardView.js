var KeyboardView = Backbone.View.extend({
    tagName:'canvas',
    events: {
        'click': "onCanvasClicked"
    },
    initialize: function() {
        this.context = this.el.getContext("2d");
        _.each(this.collection.models, function(model) {
            new KeyView({model: model});
        }, this);
    },
    render: function() {
        this.context.clearRect(0, 0, this.el.width, this.el.height);
        this.context.fillStyle = "#eeeeee";
        musicEvents.trigger("renderWhiteKeys", this.context);
        this.context.fillStyle = "#333333";
        musicEvents.trigger("renderBlackKeys", this.context);
        musicEvents.trigger("render", this.context);
        return this.el;
    },
    onCanvasClicked: function(event) {
        var keysClicked = [];
        this.collection.each(function(keyModel, index) {
            if(keyModel.positionIsWithinBounds({x: event.offsetX, y: event.offsetY})) {
                if(keyModel.get('isWhiteKey')) {
                    keysClicked.push(keyModel);
                } else {
                    keysClicked.splice(keysClicked.length - 2, 0, keyModel);
                }
            }
        }, this);
        
        var actualClickedNotes = [];
        _.each(keysClicked, function(keyModel, index) {
            clickedNote = this.determineNoteClicked(keyModel, keysClicked).get('noteName');
//            console.log(keyModel.get('noteName'));
        }, this);
        musicEvents.trigger('keyClicked', keysClicked);
    },
    determineNoteClicked: function(keyModel, triggeredNotes) {
        console.log(triggeredNotes);
        if(keyModel.get('isWhiteKey')) {
            var keyIndex = _.indexOf(triggeredNotes, keyModel),
                previousNote = triggeredNotes[keyIndex - 1],
                nextNote = triggeredNotes[keyIndex + 1];
            
            if(previousNote && Math.abs(previousNote.get('noteNumber') - keyModel.get('noteNumber')) <= 1) {
                return previousNote;
            } else if (nextNote && Math.abs(nextNote.get('noteNumber') - keyModel.get('noteNumber')) <= 1) {
                return nextNote;
            }
        }
        return keyModel;
    }
});