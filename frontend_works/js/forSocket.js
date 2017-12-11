window.onload = function () {

    let mouse = {
        click: false,
        move: false,
        pos: {x:0, y:0},
        pos_prev: false
    };
    // get canvas element and create context
    let canvas  = document.getElementById('drawing');

    let context = canvas.getContext('2d');
    // let width   = window.innerWidth;
    // let height  = window.innerHeight;
    let socket  = io.connect();

    // set canvas to full browser width/height
    let divCanvas = document.getElementById('divCanvas');

    let divHeight = divCanvas.innerHeight;
    let divWidth = divCanvas.innerWidth;
    canvas.width = divWidth;
    canvas.height = divHeight;

    // canvas.width = width;
    // canvas.height = height;

    // register mouse event handlers
    canvas.onmousedown = function(){ mouse.click = true;};
    canvas.onmouseup = function(){ mouse.click = false;};

    canvas.onmousemove = function(e) {
        // normalize mouse position to range 0.0 - 1.0
        // console.log('onmove normalising');
        mouse.pos.x = e.clientX / divWidth;
        mouse.pos.y = e.clientY / divHeight;
       /* mouse.pos.x = e.clientX;
        mouse.pos.y = e.clientY;*/
        mouse.move = true;
        // console.log('setmove to true');
    };

    // draw line received from server
    socket.on('draw_line', function (data) {
        let line = data.line;
        context.beginPath();
        context.moveTo(line[0].x * divWidth, line[0].y * divHeight);
        context.lineTo(line[1].x * divWidth, line[1].y * divHeight);
        // console.log('storing a line');
/*
        context.moveTo(line[0].x, line[0].y);
        context.lineTo(line[1].x, line[1].y);
*/
        context.stroke();
    });

    // main loop, running every 25ms
    function mainLoop() {
        // check if the user is drawing
        // console.log('inside mainloop');
        if (mouse.click && mouse.move && mouse.pos_prev) {
        //     if (mouse.click && mouse.move) {
        //     if (true) {
            // send line to to the server
            // console.log('inside if condition');

            // console.log('sending line to server');
            socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev ] });
            mouse.move = false;
        }
        mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
        setTimeout(mainLoop, 25);
    }

    // console.log('about to call mainloop');
    mainLoop();
    // console.log('after calling mainloop');
};
