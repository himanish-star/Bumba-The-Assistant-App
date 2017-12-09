// const lineHistory = require('server').line_history;

window.onload = function () {
    // console.log('socket js loaded');

    let mouse = {
        click: false,
        move: false,
        pos: {x:0, y:0},
        pos_prev: false
    };
    // get canvas element and create context
    let canvas  = document.getElementById('drawing');
    // console.log($('#main_about').position());
    let context = canvas.getContext('2d');
    let width   = window.innerWidth;
    let height  = window.innerHeight;
    let socket  = io.connect();

    // set canvas to full browser width/height

    // let divHeight = $('#divCanvas').innerHeight;
    // let divWidth = $('#divCanvas').innerWidth;
    // canvas.width = divWidth;
    // canvas.height = divHeight;

    // canvas.width = width;
    // canvas.height = height;

    // register mouse event handlers
    canvas.onmousedown = function(){ mouse.click = true; console.log('mousedown') };
    canvas.onmouseup = function(){ mouse.click = false; };

    canvas.onmousemove = function(e) {
        // normalize mouse position to range 0.0 - 1.0
        mouse.pos.x = e.clientX / width;
        mouse.pos.y = e.clientY / height;
       /* mouse.pos.x = e.clientX;
        mouse.pos.y = e.clientY;*/
        mouse.move = true;
    };

    // draw line received from server
    socket.on('draw_line', function (data) {
        let line = data.line;
        context.beginPath();
        context.moveTo(line[0].x * width, line[0].y * height);
        context.lineTo(line[1].x * width, line[1].y * height);
        console.log('storing a line');
/*
        context.moveTo(line[0].x, line[0].y);
        context.lineTo(line[1].x, line[1].y);
*/
        context.stroke();
    });

    // main loop, running every 25ms
    function mainLoop() {
        // check if the user is drawing
        if (mouse.click && mouse.move && mouse.pos_prev) {
            // send line to to the server
            socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev ] });
            mouse.move = false;
        }
        mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
        setTimeout(mainLoop, 25);
    }
    mainLoop();



};
