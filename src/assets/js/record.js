function test(testStop){
    if( testStop == false) {}
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
  
      const audioChunks = [];
      console.log("hello1")
      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log("enrg")
              const audio = new Audio(audioUrl);
      audio.play();
      var a = document.createElement( 'a' );
      a.download = 'record.wav';
      console.log("save")
      a.href = audioUrl;
      document.body.appendChild( a );
      a.click();
      });

      setTimeout(() => {
        mediaRecorder.stop();
        console.log("hellooooo")
      }, 3000);
    });
    console.log("hello")
}