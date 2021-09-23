var frameExtractor = require('../index');
frameExtractor.extractFrame('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 5 , 1, 'frame%04d.jpg');
