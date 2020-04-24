concat-audio-buffers
==================

A basic audio buffer concatenator that will work with Rollup.

Installation
------------

    npm install concat-audio-buffers

Usage
-----

    import concatAudioBuffers from 'concat-audio-buffers';
    import toWav from 'audiobuffer-to-wav';

    concatAudioBuffers(
      buffers, // AudioBuffers
      2, // Desired number of channels, converts to stereo if input is mono and this value is 2
      useBuffer
    );

    function useBuffer(error, combinedBuffer) {
      if (error) {
        console.log(error);
      } else {
        let blob = new Blob([toWav(combinedBuffer)], { type: 'audio/wav' }));
        // Then, make this blob downloadable or make it
        // the src for an <audio> element or whatever you want.
      }
    }

License
-------

The MIT License (MIT)

Copyright (c) 2020 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
