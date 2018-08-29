
URL = window.URL || window.webkitURL;
 
var gumStream; //stream from getUserMedia()
var rec; //Recorder.js object
var input; //MediaStreamAudioSourceNode we'll be recording
 
// shim for AudioContext when it's not avb. 


function testR() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext;
    console.log("recordButton clicked");
 
    /*
    Simple constraints object, for more advanced audio features see
    <div class="video-container"><blockquote class="wp-embedded-content" data-secret="vNsz0nPBL4" style="display: none;"><a href="https://addpipe.com/blog/audio-constraints-getusermedia/">Supported Audio Constraints in getUserMedia()</a></blockquote><iframe class="wp-embedded-content" sandbox="allow-scripts" security="restricted" src="https://addpipe.com/blog/audio-constraints-getusermedia/embed/#?secret=vNsz0nPBL4" data-secret="vNsz0nPBL4" width="600" height="478" title="“Supported Audio Constraints in getUserMedia()” — Pipe Blog" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe></div>
    */
 
    var constraints = { audio: true, video:false }
 
 
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

        input = audioContext.createMediaStreamSource(stream);
        console.log(input)
        /* 
        Create the Recorder object and configure to record mono sound (1 channel)
        Recording 2 channels  will double the file size
        */
        rec = new Recorder(input,{numChannels:1})
        console.log('test')
        //start the recording process
        rec.record()
       
        console.log("Recording started");
        gumStream = stream;
        
        
        
        console.log("stop")
        
        
         
           
    }).catch(function(err) {
    
    });
}

function stopR() {
    console.log("stopButton clicked");
    rec.stop();
    gumStream.getAudioTracks()[0].stop();
    rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {
 
    var url = URL.createObjectURL(blob);
    //var au = document.createElement('audio');
    //var li = document.createElement('li');
    var link = document.createElement('a');
 
    //add controls to the <audio> element
    //au.controls = true;
    //au.src = url;
 
    //link the a element to the blob
    link.href = url;
    link.download = new Date().toISOString() + '.wav';
    //link.innerHTML = link.download;
    console.log("I m here")
    //add the new audio and a elements to the li element
    document.body.appendChild( link );
    link.click();
}

    
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



