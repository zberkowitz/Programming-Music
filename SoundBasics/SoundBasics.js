var myOscilloscope1 = new WavyJones(Tone.context, 'oscilloscope1');
var myOscilloscope2 = new WavyJones(Tone.context, 'oscilloscope2');
var myOscilloscope3 = new WavyJones(Tone.context, 'oscilloscope3');

myOscilloscope1.connect(Tone.Master);
myOscilloscope2.connect(Tone.Master);
myOscilloscope3.connect(Tone.Master);

myOscilloscope1.lineColor = "#FFFF00";
myOscilloscope2.lineColor = "#FFFF00";
myOscilloscope3.lineColor = "#FFFF00";

var sineOsc = new Tone.Oscillator({
	frequency: 440, 
	type: "sine",
	volume: -12
}).connect(myOscilloscope1);

var sawOsc = new Tone.Oscillator({
	frequency: 440,
	volume: -12
}).connect(myOscilloscope2);

var phaseOsc1 = new Tone.Oscillator({
	frequency: 440,
	type: "sine",
	volume: -12
}).connect(myOscilloscope3);

var phaseOsc2 = new Tone.Oscillator({
	frequency: 440,
	type: "sine",
	volume: -12
}).connect(myOscilloscope3);

nx.onload = function(){
	nx.sendsTo("js");
	
	nx.colorize("fill", "#B4AEA2");
	nx.colorize("accent", "#fccf22");
	
	sineFreq.hslider = true;
	sineFreq.draw();
	
	sawPartial.options = ['1', '2', '3', '4', '5', '6', '7', '8'];
	sawPartial.init();
	
	phaseShift.hslider = true;
	phaseShift.draw();
	
	phaseToggle.options = ['Off', 'Sine', 'Tri'];
	phaseToggle.init();
	
	sineFreq.set({
		value: 0.330
	}, true);
	
	sineVol.set({
		value: 0.8
	}, true)
	
	phaseShift.set({
		value: 0
	}, true);
	
	sineToggle.on('*', function(data){
		if (data.value == 1){
			sineOsc.start();
		}else if (data.value == 0){
			sineOsc.stop();
		}
	});
	
	sineFreq.on('*', function(data){
		var frequency = data.value * 1000 + 100;
		sineOsc.frequency.value = frequency;
		document.getElementById("freqLabel").innerHTML = "Frequency: " + frequency + "Hz";
	});
	
	sineVol.on('*', function(data){
		var volume = Math.ceil((data.value * -1 + 1) * -60);
		sineOsc.volume.value = volume;
		document.getElementById("volLabel").innerHTML = "Level: " + volume + " dB";
	});
	
	sawToggle.on('*', function(data){
		if (data.value == 1){
			sawOsc.start();			
		}else if (data.value == 0){
			sawOsc.stop();
		}
	});
	
	sawPartial.on('*', function(data){
		sawOsc.type = "sawtooth" + (data.index + 2);
	});
	
	phaseToggle.on('*', function(data){
		if (data.index == 0){
			phaseOsc1.stop();
			phaseOsc2.stop();
		}else if (data.index == 1){
			phaseOsc1.type = "sine";
			phaseOsc2.type = "sine";
			if (phaseOsc1.state == "stopped"){
				phaseOsc1.start();
				phaseOsc2.start();
			}
		}else if (data.index == 2){
			phaseOsc1.type = "triangle";
			phaseOsc2.type = "triangle";
			if (phaseOsc1.state == "stopped"){
				phaseOsc1.start();
				phaseOsc2.start();
			}
		}
	});
	
	phaseShift.on('*', function(data){
		var phase = Math.ceil(data.value * 180);
		phaseOsc2.phase = phase;
		document.getElementById("phaseLabel").innerHTML = phase + "&deg; Out of Phase";
	})
}