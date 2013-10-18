// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var audioContext, frequency;
window.addEventListener('load', init, false);
function init() {
    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        audioContext = new AudioContext();
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser');
    }
    
    var envelope = audioContext.createGain();
    envelope.gain.value = 0;
    
    var sine = audioContext.createOscillator();
    sine.frequency.value = 440;
    
    sine.connect(envelope);
    sine.start(0);
    envelope.connect(audioContext.destination);
    
    var gain = audioContext.createGain();
    gain.gain.value = 6;
    gain.connect(sine.frequency)
    
    var lfo = audioContext.createOscillator();
    lfo.frequency.value = 4;
    lfo.connect(gain);
    lfo.start(0);
    
    console.log(sine);
    console.log(gain);
    console.log(lfo);
    
    document.addEventListener("mousemove", function(e) {
        
        var incidentals = [1, 3, 6, 8, 10],
            majorScale = [0, 2, 4, 5, 7, 9, 11, 12];
        var step, ratio;
        if(e.clientY / window.innerHeight >=0.5) {
            step = Math.round(mapValue(e.clientX, 0, window.innerWidth, 0, majorScale.length -1));
            ratio = Math.pow(2, majorScale[step]/12);
        } else {
            step = Math.round(mapValue(e.clientX, 0, window.innerWidth, 0, incidentals.length -1));
            ratio = Math.pow(2, incidentals[step]/12);
        }
        
        var freq = ratio * 440;
        if(freq != frequency) {
            envelope.gain.value = 1;
            frequency = freq;
        }
        console.log(majorScale[step] + ": " + ratio);
        sine.frequency.value = freq;
        
    });
    
    this.requestAnimFrame(loop);

    function loop() {
        this.requestAnimFrame(loop);
        if(envelope.gain.value > 0) {
            envelope.gain.value -= 0.025;
            console.log(envelope.gain.value);
        } else {
            envelope.gain.value = 0;
        }
    }
}