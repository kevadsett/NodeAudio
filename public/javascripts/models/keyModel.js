var KeyModel = Backbone.Model.extend({
    defaults: {
        noteNumber: 0
    },
    initialize: function() {
        this.set('frequency', this.getFreq());
        this.set('noteName', this.getNoteName());
        this.set('isWhiteKey', _.contains(whiteNotes, this.get('noteName').replace(/\d/g, "")));
        this.set({height: this.get('isWhiteKey') ? 120 : 70,
                  width: this.get('isWhiteKey') ? 25 : 20});
        this.set({y: this.get('isWhiteKey') ? 2 : 0});
    },
    getFreq: function() {
        var bottomC = 8.1757989156;
        return Math.pow(2, this.get('noteNumber')/12) * bottomC;
    },
    getNoteName: function() {
        var noteNum = this.get('noteNumber') % 12;
        var noteName = "";
        switch(noteNum) {
            case 0: 
                noteName = "C";
                break;
            case 1:
                noteName = "C#";
                break;
            case 2:
                noteName = "D";
                break;
            case 3:
                noteName = "D#";
                break;
            case 4:
                noteName = "E";
                break;
            case 5:
                noteName = "F";
                break;
            case 6:
                noteName = "F#";
                break;
            case 7:
                noteName = "G";
                break;
            case 8:
                noteName = "G#";
                break;
            case 9:
                noteName = "A";
                break;
            case 10:
                noteName = "A#";
                break;
            case 11:
                noteName = "B";
                break;
        }
        noteName += Math.floor(this.get('noteNumber') / 12);
        return noteName;
    },
    positionIsWithinBounds: function(position) {
        return (position.x > this.get('x') - this.get('width') / 2 &&
            position.x < this.get('x') + this.get('width') / 2 &&
            position.y > this.get('y') &&
            position.y < this.get('y') + this.get('height'));
    }
});