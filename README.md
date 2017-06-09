## Modification of original old version of Video Frame Extractor

This library extracts frames from a video file using ffmpeg and saves the file to disk.

### Dependencies

- Mediainfo
- ffmpeg

### Usage

The output path is the path and the filename where the image should be stored on disk

```bash
npm install --save frame-extractor
```
```js
var frameExtractor = require('frame-extractor');
//frameExtractor.extractFrame(sourceFilePath, numOfFrames, frameNumber, outputPath);
frameExtractor.extractFrame('./public/out.webm', "50",120, './public/images/frame%04d.jpg');

```

### Test

- Edit the test/index.js and set the frameNumber and frames you want


```
node test/index.js
```
