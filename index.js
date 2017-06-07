var exec = require('child_process').exec,
    Promise = require('bluebird'),
    _ = require('lodash'),
    mediainfo = require('mediainfo-parser');

function getMediaInfo(filePath) {
  return new Promise(function(resolve, reject) {
    mediainfo.exec(filePath, function(err, info) {
      if(err) return reject(err);
      return resolve(info);
    });
  });
}

function parseTimecode(time) {
  var hhmmss = time.split(':');
  
  return {
    hours: hhmmss[0],
    minutes: hhmmss[1],
    seconds: hhmmss[2]
  };
}

function calculateFrame(frameRate, startTime, time, frameNumber) {
  var hours, minutes, seconds, startSeconds, parsedTime, parsedStartTime, frame, realSeconds;

  parsedTime = parseTimecode(time);
  parsedStartTime = parseTimecode(startTime);
 
  seconds = (+parsedTime.hours) * 60 * 60 + (+parsedTime.minutes) * 60 + (+parsedTime.seconds); 
  startSeconds = (+parsedStartTime.hours) * 60 * 60 + (+parsedStartTime.minutes) * 60 + (+parsedStartTime.seconds); 
  
  realSeconds = seconds - startSeconds;

  frame = (realSeconds * Math.ceil(frameRate)) + frameNumber

  return frame;
}

module.exports =  {
  extractFrame: function(filePath, numOfFrames, frameNumber, outputPath) {
    console.log(frameNumber);
    return new Promise(function(resolve, reject) {
      var frame, command, videoTrack, timecodeTrack, startTimecode, fileName;
   
      getMediaInfo(filePath).then(function(info) {
	info = info.file;
        videoTrack = info.track.filter(function(track) { return track._type === "Video"; })[0];
	console.log(videoTrack.frameRate);
        frame =  parseInt(frameNumber);

        command  = 'ffmpeg -loglevel panic -i ' + filePath +' -s 800x600 -qscale 28 -vf "select=gte(n\\, ' + frame + ')" -vframes '+numOfFrames+' -start_number '+frame+' -threads 10 ' + outputPath + ' -y';
        child = exec(command, function (error, stdout, stderr) {
          if (error !== null) {
            console.log('exec error: ' + error);
          }

          return resolve();
        });
      });
    });
  }
};
