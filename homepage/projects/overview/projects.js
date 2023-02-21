import './style.css';
 

//Intilasing open webgl and canvas
    console.log('Working FIne!');

    var canvas = document.querySelector(".webgl")
    var gl = canvas.getContext("webgl");

    if(!gl) {
        console.log('experimental-webgl');
        gl = canvas.getContext('experimental-webgl');
    }
    
    if(!gl) {
        alert("Your browser does not Support WebGL");
    }

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


