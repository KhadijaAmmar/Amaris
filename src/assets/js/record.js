function start(){
 
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
     mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
  
      const audioChunks = [];
      console.log("hello1")
      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });
 
      mediaRecorder.addEventListener("stop", () => {
         audioBlob = new Blob(audioChunks);
         audioUrl = window.URL.createObjectURL(audioBlob);
        console.log("enrg");
        audio = new Audio(audioUrl);
        audio.play();   
        var a = document.createElement( 'a' );
        a.download = 'record.wav';
        console.log("save")
        a.href = audioUrl;
        document.body.appendChild( a );
        a.click();           
       });
              
    });
    console.log("hello")
}


function stop () {
    setTimeout(() => {
        mediaRecorder.stop();
        console.log("hellooooo")
        
      }, 3000);

    
    /*
    var a = document.createElement( 'a' );
    a.download = 'record.wav';
    console.log("save")
    a.href = audioUrl;
    document.body.appendChild( a );
    a.click();
        mediaRecorder.stop();
        console.log("hellooooo")
    */


}