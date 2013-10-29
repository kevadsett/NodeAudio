var KeyModel = Backbone.Model.extend({
    defaults: {
        noteNumber: 0,
        width: 15
    },
    initialize: function() {
        this.set('frequency', this.getFreq());
        this.set('noteName', this.getNoteName());
        this.set('isWhiteNote', _.contains(whiteNotes, this.get('noteName')));
        this.set({height: this.get('isWhiteNote') ? 70 : 50});
                  //width: this.get('isWhiteNote') ? 15 : 10});
        this.set({x: (this.get('noteNumber') - this.get('offset')) * this.get('width'),//(this.get('isWhiteNote') ? 15 : 10), 
                  y: this.get('isWhiteNote') ? 2 : 0});
    },
    getFreq: function() {
        var bottomC = 8.1757989156;
        return Math.pow(2, this.get('noteNumber')/12) * bottomC;
    },
    getNoteName: function() {
        var noteNum = this.get('noteNumber') % 12;
        switch(noteNum) {
            case 0: 
                return "C";
            case 1:
                return "C#";
            case 2:
                return "D";
            case 3:
                return "D#";
            case 4:
                return "E";
            case 5:
                return "F";
            case 6:
                return "F#";
            case 7:
                return "G";
            case 8:
                return "G#";
            case 9:
                return "A";
            case 10:
                return "A#";
            case 11:
                return "B";
        }
    }
});


function keyModel(noteNumber) {
    this.noteNumber = noteNumber;
    this.frequency = getFreqFromNoteNumber(noteNumber);
}