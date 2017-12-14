$(()=>{
    init();

    //insertion , searching and deletion yet to be done . .. . . . .. . . .

    $('#saveBtn').click(()=>{save()});
    $('#clrBtn').click(()=>{erase()});
    let imgList=$('#imgList');
    let listOfCanvasURLS=[];

    $.get('/canvas',(datas)=>{
        for(let data of datas){
            listOfCanvasURLS.push(data.canvasURL);
        }
        displayCanvasList();
    });

    var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

    var x = "black",
        y = 2;

    function init() {
        canvas = document.getElementById('can');
        ctx = canvas.getContext("2d");
        w = canvas.width;
        h = canvas.height;

        canvas.addEventListener("mousemove", function (e) {
            findxy('move', e)
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            findxy('down', e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy('up', e)
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            findxy('out', e)
        }, false);
    }

    function draw() {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = x;
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();
    }

    function erase() {
        ctx.clearRect(0, 0, w, h);
    }

    function displayCanvasList() {
        imgList.empty();
        for(let urlID=0;urlID<listOfCanvasURLS.length;urlID++){
            imgList.append(`<div>
<img src="${listOfCanvasURLS[urlID]}" style="border:solid;height: 30vh;width: 20vw">
<button id="canvasDelete${urlID}">delete</button>
</div>`);
            if(urlID+1===listOfCanvasURLS.length){
                appenderDeleteButtons();
            }
        }
    }

    function appenderDeleteButtons() {
        for(let urlID in listOfCanvasURLS){
            $(`#canvasDelete${urlID}`).click(()=>{
                let tempLIST=[];
                $.post('/canvas/delete',{
                    canvasURL:listOfCanvasURLS[urlID]
                },(data)=>{
                    for(let urlIDC=0;urlIDC<listOfCanvasURLS.length;urlIDC++){
                        if(listOfCanvasURLS[urlIDC]!==listOfCanvasURLS[urlID]){
                            tempLIST.push(listOfCanvasURLS[urlIDC]);
                        }
                        if(urlIDC===listOfCanvasURLS.length-1){
                            listOfCanvasURLS=tempLIST;
                            displayCanvasList();
                        }
                    }
                });
            });
        }
    }

    function save() {
        var dataURL = canvas.toDataURL();
        listOfCanvasURLS.push(dataURL);
        $.post('/canvas/insert',{
            canvasURL:dataURL
        },(data)=>{
            displayCanvasList();
        });
    }

    function findxy(res, e) {
        if (res == 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;

            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.fillRect(currX, currY, 2, 2);
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res == 'up' || res == "out") {
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                draw();
            }
        }
    }
});