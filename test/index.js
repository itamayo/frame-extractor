var frameExtractor = require('../index');
frameExtractor.extractFrame('/var/www/html/24fps.mp4', 5 , 1, 'frame%04d.jpg');
