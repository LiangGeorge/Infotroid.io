let video = document.getElementById('videoInput');
    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    let cap = new cv.VideoCapture(video);

    const FPS = 5;
    function processVideo() {
      try {
          if (!streaming) {
              // clean and stop.
              src.delete();
              dst.delete();
              return;
          }
          let begin = Date.now();
          // start processing.
          cap.read(src);
          cv.cvtColor(src, dst, cv.COLOR_RGB2HSV);
          let kernel = cv.getStructuringElement(cv.MORPH_RECT,new cv.Size(5,5))
          cv.erode(dst,dst,kernel)
          cv.medianBlur(dst,dst,5)
          cv.GaussianBlur(dst,dst,new cv.Size(7,7),5,5)
          let channels = new cv.MatVector()
          cv.split(dst,channels)

          var minHSlider = document.getElementById("minHue");
          var minHOutput = document.getElementById("MinH");
          minHOutput.innerHTML = minHSlider.value;
          minHSlider.oninput = function(){
            minHOutput.innerHTML = this.value;
          }

          var maxHSlider = document.getElementById("maxHue");
          var maxHOutput = document.getElementById("MaxH");
          maxHOutput.innerHTML = maxHSlider.value;
          maxHSlider.oninput = function(){
            maxHOutput.innerHTML = this.value;
          }

          var minSSlider = document.getElementById("minSat");
          var minSOutput = document.getElementById("MinS");
          minSOutput.innerHTML = minSSlider.value;
          minSSlider.oninput = function(){
            output.innerHTML = this.value;
          }

          var maxSSlider = document.getElementById("maxSat");
          var maxSOutput = document.getElementById("MaxS");
          maxSOutput.innerHTML = maxSSlider.value;
          maxSSlider.oninput = function(){
            output.innerHTML = this.value;
          }

          var minVSlider = document.getElementById("minVal");
          var minVOutput = document.getElementById("MinV");
          minVOutput.innerHTML = minVSlider.value;
          minVSlider.oninput = function(){
            minVOutput.innerHTML = this.value;
          }

          var maxVSlider = document.getElementById("maxVal");
          var maxVOutput = document.getElementById("MaxV");
          maxVOutput.innerHTML = maxVSlider.value;
          maxVSlider.oninput = function(){
            maxVOutput.innerHTML = this.value;
          }

          let minHue = new cv.Mat(video.height, video.width, channels.get(0).type(),[Number(minHSlider.value),Number(minHSlider.value),Number(minHSlider.value),Number(minHSlider.value)])
          let maxHue = new cv.Mat(video.height, video.width, channels.get(0).type(),[Number(maxHSlider.value),Number(maxHSlider.value),Number(maxHSlider.value),Number(maxHSlider.value)])


          let minSat = new cv.Mat(channels.get(1).rows,channels.get(1).cols, channels.get(1).type(),[Number(minSSlider.value),Number(minSSlider.value),Number(minSSlider.value),Number(minSSlider.value)])
          let maxSat = new cv.Mat(channels.get(1).rows,channels.get(1).cols, channels.get(1).type(),[Number(maxSSlider.value),Number(maxSSlider.value),Number(maxSSlider.value),Number(maxSSlider.value)])
          let minVal = new cv.Mat(channels.get(2).rows,channels.get(2).cols, channels.get(2).type(),[Number(minVSlider.value),Number(minVSlider.value),Number(minVSlider.value),Number(minVSlider.value)])
          let maxVal = new cv.Mat(channels.get(2).rows,channels.get(2).cols, channels.get(2).type(),[Number(maxVSlider.value),Number(maxVSlider.value),Number(maxVSlider.value),Number(maxVSlider.value)])

          cv.inRange(channels.get(0),minHue,maxHue,channels.get(0))
          cv.inRange(channels.get(1),minSat,maxSat,channels.get(1))
          cv.inRange(channels.get(2),minVal,maxVal,channels.get(2))
          let hs = new cv.Mat()
          let combined = new cv.Mat()
          cv.bitwise_and(channels.get(0),channels.get(1),hs)
          cv.bitwise_and(channels.get(2),hs,combined)
          var contours = new cv.MatVector()
          let hierarchy = new cv.Mat()
          cv.findContours(combined, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
          cv.imshow('Hue_Filter',channels.get(0))
          cv.imshow('Saturation_Filter',channels.get(1))
          cv.imshow('Value_Filter',channels.get(2))
          cv.imshow('Combined_Filter',combined)
          channels.get(0).delete()
          channels.get(1).delete()
          channels.get(2).delete()
          hs.delete()
          combined.delete()
           for (let i = 0; i < contours.size(); i++){
               let cnt = contours.get(i)
               let rotatedRect = cv.minAreaRect(cnt)
               let area = rotatedRect.size.width * rotatedRect.size.height
               console.log(cv)
               let vertices = cv.RotatedRect.points(rotatedRect)
               let contoursColor = new cv.Scalar(0,255,0,255)
               let rectangleColor = new cv.Scalar(0,255,0,255)
               //console.log(point.x)
               //cv.drawContours(src,contours,i,contoursColor,1,8,hierarchy,100)
               // draw rotatedRect
               if (area < 2200 && area > 600){
                 for (let i = 0; i < 4; i++) {
                      cv.line(src, vertices[i], vertices[(i + 1) % 4], rectangleColor, 2, cv.LINE_AA, 0);
                  }
                  let point = rotatedRect.center
                  console.log("Center X:" + String(point.x))
                  console.log("Center Y:" + String(point.y))
                    //console.log(vertices[0].x)
                }
           }

          //cv.imshow('canvasOutput', dst);
          cv.imshow('canvasOutput',src)
          // schedule the next one.
          let delay = 1000/FPS - (Date.now() - begin);
          setTimeout(processVideo, delay);
      } catch (err) {
          utils.printError(err);
        }
    };

    setTimeout(processVideo, 0);