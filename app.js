
const webCam = document.querySelector("#webCam");
 
webCam.addEventListener('play',()=>{
    const canvas = faceapi.createCanvasFromMedia(webCam);
    document.body.append(canvas)
    const displaySize = { width: webCam.width,height: webCam.height }
    faceapi.matchDimensions(canvas,displaySize)
    setInterval( async () => {
        const detections = await faceapi.detectAllFaces(webCam,
        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
        .withFaceExpressions()
        console.log(detections);
        const resizedDetections = faceapi.resizeResults(detections,displaySize)
        
        canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
        faceapi.draw.drawDetections(canvas,resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas , resizedDetections);
    },500)
    

})
Promise.all([
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startCam)

function startCam() {
    navigator.getUserMedia (
        { video: {} },
        stream => webCam.srcObject = stream,
        err => console.log(err),
        console.log("here")
    )
}
