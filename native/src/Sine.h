

typedef struct Sine {
    float timeDelta;
    float time;
    float samplerate;
    int frameSize;
} Sine;

Sine* Sine_new(int samplerate, int frameSize);
void Sine_delete(Sine** self);
void Sine_process(Sine* self, float* output, float cps);