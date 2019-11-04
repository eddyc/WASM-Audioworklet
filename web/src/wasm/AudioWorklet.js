class NoiseGenerator extends AudioWorkletProcessor {
    constructor() {
        super();
        this.isPlaying = true;
        this.port.onmessage = this.onmessage.bind(this);
    }
    static get parameterDescriptors() {
        return [
            { name: "amplitude", defaultValue: 0.25, minValue: 0, maxValue: 1 }
        ];
    }

    onmessage(event) {
        const { data } = event;
        this.isPlaying = data;
    }

    process(inputs, outputs, parameters) {
        const output = outputs[0];
        const amplitude = parameters.amplitude;
        const isAmplitudeConstant = amplitude.length === 1;

        for (let channel = 0; channel < output.length; ++channel) {
            const outputChannel = output[channel];
            for (let i = 0; i < outputChannel.length; ++i) {
                // This loop can branch out based on AudioParam array length, but
                // here we took a simple approach for the demonstration purpose.
                outputChannel[i] =
                    2 *
                    (Math.random() - 0.5) *
                    (isAmplitudeConstant ? amplitude[0] : amplitude[i]);
            }
        }

        return this.isPlaying;
    }
}

registerProcessor("noise-generator", NoiseGenerator);
