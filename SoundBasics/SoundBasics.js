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
	volume: -12
}).connect(myOscilloscope3);

var phaseOsc2 = new Tone.Oscillator({
	frequency: 440,
	volume: -12
}).connect(myOscilloscope3);

nx.onload = function(){
	nx.sendsTo("js");
	
	nx.colorize("fill", "#B4AEA2");
	nx.colorize("accent", "#fccf22");
	
	sineFreqSlider.hslider = true;
	sineFreqSlider.draw();
	
	sawPartialNumber.decimalPlaces = 0;
	
	phaseSlider.hslider = true;
	phaseSlider.draw();
	
	sineFreqSlider.set({
		value: 0.330
	}, true);
	
	sineVolSlider.set({
		value: 0.8
	}, true)
	
	sawPartialNumber.set({
		value: 1
	}, true);
	
	phaseSlider.set({
		value: 0
	}, true);
	
	sineToggle.on('*', function(data){
		if (data.value == 1){
			sineOsc.start();
		}else if (data.value == 0){
			sineOsc.stop();
		}
	});
	
	sineFreqSlider.on('*', function(data){
		var frequency = data.value * 1000 + 100;
		sineOsc.frequency.value = frequency;
		document.getElementById("freqLabel").innerHTML = "Frequency: " + frequency + "Hz";
	});
	
	sineVolSlider.on('*', function(data){
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
	
	sawPartialNumber.on('*', function(data){
		if (data.value >= 1){
			sawOsc.type = "sawtooth" + (data.value + 1);
		}
	});
	
	phaseSineToggle.on('*', function(data){
		if (data.value == 1){
			phaseOsc1.type = "sine";
			phaseOsc2.type = "sine";
			phaseOsc1.start();
			phaseOsc2.start();
			phaseTriToggle.set({
				value: 0
			}, false);
		}else if (data.value == 0){
			phaseOsc1.stop();
			phaseOsc2.stop();
		}
	});
	
	phaseTriToggle.on('*', function(data){
		if (data.value == 1){
			phaseOsc1.type = "triangle";
			phaseOsc2.type = "triangle";
			phaseOsc1.start();
			phaseOsc2.start();
			phaseSineToggle.set({
				value: 0
			}, false);
		}else if (data.value == 0){
			phaseOsc1.stop();
			phaseOsc2.stop();
		}
	});

	
	phaseSlider.on('*', function(data){
		var phase = Math.ceil(data.value * 180);
		phaseOsc2.phase = phase;
		document.getElementById("phaseLabel").innerHTML = phase + "&deg; Out of Phase";
	})
}