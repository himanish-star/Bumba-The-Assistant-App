// let countDownDate = new Date("Jan 5, 2018 15:37:25").getTime();
let distance = 2700000;
let k2=0;
// Update the count down every 1 second
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

    // Display the result in the element with id="demo"
    document.getElementById("demo").innerHTML = "<i class=\"fa fa-clock-o btn btn-primary\"></i>     " +
    minutes + "m " + seconds + "s ";
    // If the count down is finished, write some text
    if (distance < 0) {

        document.getElementById("demo").innerHTML = "go take a walk";
        setTimeout(function(){
            document.getElementById("demo").innerHTML = "starting again in a while";
            distance = 2700000},5000);
    }
}, 1000);   



let k=1;
let clock = document.getElementById("clk-btn");
timer.setAttribute('data-content',k2);
clock.onclick = function () {

    // $("#demo").attr("display","block");
    let timer = document.getElementById("demo");
    if(k%2)
        timer.style.display = 'block';
    else
        timer.style.display = 'none';
    k++;
    // console.log(k);

};
let read_more= document.getElementById("read_more");
let t=1;
read_more.onclick = function () {

    // $("#demo").attr("display","block");
    read_more.style.display = 'none';
    let more_text = document.getElementById("more_text");
    if(t%2)
        more_text.style.display = 'block';
    else
        more_text.style.display = 'none';
    t++;
    // console.log(k);

};




