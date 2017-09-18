// Grab elements, create settings, etc.
var video = document.getElementById('video');

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
}

//Legacy code below: getUserMedia 
else if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia({ video: true }, function(stream) {
        video.src = stream;
        video.play();
        console.log("Stream1: " + stream);
    }, errBack);
} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia({ video: true }, function(stream){
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
        console.log("Stream2: " + stream);
    }, errBack);
} else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
    navigator.mozGetUserMedia({ video: true }, function(stream){
        video.src = window.URL.createObjectURL(stream);
        video.play();
        console.log("Stream3: " + stream);
    }, errBack);
}


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


document.getElementById("snap").addEventListener("click", function(snapShot) {
  context.drawImage(video, 0, 0, 640, 480);
  console.log(snapShot);
  convertCanvasToImage(canvas);

});


function convertCanvasToImage(canvas) {
    var image = new Image();
    var imageSrc = canvas.toDataURL("image/png");
    console.log(imageSrc);
    image.src = imageSrc;   
    console.log(image)
    return image;
    document.querySelector("body").appendChild(image)
    // faceRecognition(imageSrc)
}
