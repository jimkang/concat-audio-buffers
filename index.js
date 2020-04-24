var ContextKeeper = require('audio-context-singleton');
var oknok = require('oknok');

function concatAudioBuffers(buffers, desiredNumberOfChannels, done) {
  var contextKeeper = ContextKeeper();
  contextKeeper.getNewContext(oknok({ ok: actuallyConcat, nok: done }));

  function actuallyConcat(audioContext) {
    let combinedBufferLength = buffers
      .map(b => b.length)
      .reduce((s, l) => s + l);
    let combinedBuffer = audioContext.createBuffer(
      desiredNumberOfChannels,
      combinedBufferLength,
      buffers[0].sampleRate
    );
    let index = 0;
    for (let i = 0; i < buffers.length; ++i) {
      copyBufferToBuffer({
        srcBuffer: buffers[i],
        destBuffer: combinedBuffer,
        srcOffset: 0,
        destOffset: index,
        desiredNumberOfChannels
      });
      index += buffers[i].length;
    }
    done(null, combinedBuffer);
  }
}

function copyBufferToBuffer({
  srcBuffer,
  destBuffer,
  srcOffset,
  destOffset,
  desiredNumberOfChannels
}) {
  var totalFrames = srcBuffer.length;

  var array0 = new Float32Array(totalFrames);
  var array1 = new Float32Array(totalFrames);
  if (typeof srcBuffer.copyFromChannel === 'function') {
    srcBuffer.copyFromChannel(array0, 0, srcOffset);
    if (desiredNumberOfChannels === 2) {
      if (srcBuffer.numberOfChannels > 1) {
        srcBuffer.copyFromChannel(array1, 1, srcOffset);
      } else {
        // Just copy the first channel as the second channel.
        srcBuffer.copyFromChannel(array1, 0, srcOffset);
      }
    }
  } else {
    throw new Error('TODO: copyFromChannel polyfill');
  }

  if (typeof destBuffer.copyToChannel === 'function') {
    destBuffer.copyToChannel(array0, 0, destOffset);
    if (desiredNumberOfChannels === 2) {
      destBuffer.copyToChannel(array1, 1, destOffset);
    }
  } else {
    throw new Error('TODO: copyToChannel polyfill');
  }
}

module.exports = concatAudioBuffers;
