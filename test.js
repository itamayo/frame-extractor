var mediaInfo = require('mediainfo-parser');
mediaInfo.exec('/var/www/html/24fps.mp4', function(err, info) {
      if(err) console.log("erro",err);

      console.log(info);
    });

