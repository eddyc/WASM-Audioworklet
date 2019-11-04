import raw from "raw.macro";

const worklet = raw("./Sine.js");

export default class Audio {
    constructor() {
        this.initialise();
    }

    initialise = async () => {
        this.actx = new (window.AudioContext || window.webkitAudioContext)();
        const blob = new Blob([worklet], { type: "text/javascript" });
        const url = URL.createObjectURL(blob);
        await this.actx.audioWorklet.addModule(url);
        this.noiseGen = new AudioWorkletNode(this.actx, "noise-generator");
    };

    play = () => {
        this.noiseGen.connect(this.actx.destination);
        this.actx.resume();
    };
}
