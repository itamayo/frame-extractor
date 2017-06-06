var videoFrameExtractor = require('../index'),
    findRemoveSync = require('find-remove');


var result = findRemoveSync('/tmp/images', {extensions: ['.png']});

videoFrameExtractor.extractFrame('/var/www/html/24fps.mp4', '00:00:00:04', 1, '1.png');
