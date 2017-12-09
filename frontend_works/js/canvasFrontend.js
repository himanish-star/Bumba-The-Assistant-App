$(function () {

    let saveCanvas = document.getElementById('saveCanvas');
    let canvasNameList = $('#canvasNameList');

    saveCanvas.onclick = function () {
        // console.log('frontendCanvas Insert mein hu ');
        let alpha = $('#canvasName');
        // let canvasName =
        insertCanvas( alpha.val());
    };

    function insertCanvas(cName) {

        $.post('/canvas/', {
                canName: cName
                // lines:null
            }, (data) =>{displaySaved(data);});
        // window.location.reload();

    }

    $.get('/canvas/', {},
        (data) =>
            displaySaved(data)
    );

    function displaySaved(canvasList) {

        for ( let i = 0 ;i < canvasList.length ;i++) {
            let nameAppend = canvasList[i].canvasName;
            let canvasOne = $(`<div> ${nameAppend}
                                         </div>`);
            // console.log('before appending ' + nameAppend);
            canvasNameList.append(canvasOne,'<br>');
            // console.log('after appending ');

        }
    }

});
