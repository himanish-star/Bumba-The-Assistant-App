let distance = 2700000;
// Update the count down every 1 second
//  $('#clk-btn').onclick = function(){

let x = setInterval(function() {

    // Get todays date and time
    // let now = new Date().getTime();
    // Find the distance between now an the count down date
    distance = distance -1000;
    // Time calculations for days, hours, minutes and seconds
    // let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let popcontent = minutes + " m " + seconds + "s ";

    // var alph = document.getElementById('clk-btn');
    // alph.('data-content',popcontent);
        $('#clk-btn').attr('data-content',popcontent);

    if (distance < 0) {
        $('#clk-btn').attr('data-content',popcontent);


        setTimeout(function(){
            document.getElementById("clk-btn").innerHTML = "go take a walk";},0);

        setTimeout(function(){
            document.getElementById("clk-btn").innerHTML = "starting again in a while";
           },5000);
        setTimeout(function(){
            document.getElementById("clk-btn").innerHTML =  "<i class=\"fa fa-clock-o\">";
            distance = 2700000},6000);
    }
}, 1000);
    let read_more = document.getElementById("read_more");
    read_more.onclick = function () {
        // $("#demo").attr("display","block");
        read_more.style.display = 'none';
        let more_text = document.getElementById("more_text");
        let read_less = document.createElement('a');
        read_less.setAttribute("href", "#less_text");
        read_less.setAttribute('id', 'read_less');
        read_less.innerHTML = "Read Less";
        document.getElementById("readmore").appendChild(read_less);
        more_text.style.display = 'block';
        // console.log(k);
        read_less.onclick = function () {
            more_text.style.display = 'none';
            document.getElementById("readmore").removeChild(read_less);
            read_more.style.display = 'block';
        }
    };
