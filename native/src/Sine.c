#include "Sine.h"
#include "math.h"
#include "stdio.h"
#include "stdlib.h"
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
Sine* Sine_new(int samplerate, int framesize)
{
    Sine* self = (Sine*)calloc(1, sizeof(Sine));
    self->samplerate = samplerate;
    self->frameSize = framesize;
    self->timeDelta = 1 / samplerate;
    self->time = 0;
    return self;
}

EMSCRIPTEN_KEEPALIVE
void Sine_delete(Sine** self)
{
    free(*self);
}

EMSCRIPTEN_KEEPALIVE
void Sine_process(Sine* self, float* output, float cps)
{
    for (int i = 0; i < self->frameSize; ++i) {
        output[i] = sin(2 * M_PI * self->time * cps);
        self->time += self->timeDelta;
        self->time = fmodf(self->time, 1);
    }
}
