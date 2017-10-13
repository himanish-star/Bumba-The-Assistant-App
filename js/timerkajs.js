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

    // Display the result in the element with id="demo"
    let popcontent = minutes + " m " + seconds + "s ";

    // var alph = document.getElementById('clk-btn');
    // alph.('data-content',popcontent);
    $("#clk-btn").attr('data-content',popcontent);
    // $('#clk-btn').onclick.text(popcontent.toString());


    // If the count down is finished, write some text
    if (distance    < 0) {
        $('#clk-btn').attr('data-content',popcontent);
        document.getElementById("demo").innerHTML = "go take a walk";
        setTimeout(function(){
            document.getElementById("demo").innerHTML = "starting again in a while";
            distance = 2700000},5000);
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
// };
/*let k=1;
let clock = document.getElementById("clk-btn");
// timer.setAttribute('data-content',k2);
clock.onclick = function () {
>>>>>>> bd041d3968dabe3a3d6df20cd80486085ee659ae

    // $("#demo").attr("display","block");
    let timer = document.getElementById("demo");
    if(k%2)
        timer.style.display = 'block';
    else
        timer.style.display = 'none';
    k++;
    // console.log(k);

};*/
    // console.log(k);
// =======
// window.onload=()=> {
//
//     let distance = 2700000;
//     let minutes, seconds;
//     let k2 = 0;
//     let clock = document.getElementById("clk-btn");
// // Update the count down every 1 second
//     let x = setInterval(function () {
//
//         // Get todays date and time
//         // let now = new Date().getTime();
//
//         // Find the distance between now an the count down date
//         distance = distance - 1000;
//
//
//         // Time calculations for days, hours, minutes and seconds
//         // let days = Math.floor(distance / (1000 * 60 * 60 * 24));
//         // let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         seconds = Math.floor((distance % (1000 * 60)) / 1000);
//
//         // Display the result in the element with id="demo"
//
//         document.getElementById("clk-btn").setAttribute('data-content',' minutes + " m " + seconds +  " s "' );
//
//         // document.getElementById("demo").innerHTML = minutes + " m " + seconds +  " s ";
//         k2 = minutes;
//         // document.getElementById("clk-btn").setAttribute('data-content', k2.toString());
//         // If the count down is finished, write some text
//         if (distance < 0) {
//
//             document.getElementById("demo").innerHTML = "go take a walk";
//             setTimeout(function () {
//                 document.getElementById("demo").innerHTML = "starting again in a while";
//                 distance = 2700000
//             }, 5000);
//         }
//     }, 1000);
//
//     let k = 1;
//     clock.onclick = function () {
//
//         // $("#demo").attr("display","block");
//         let timer = document.getElementById("demo");
//         if (k % 2)
//             timer.style.display = 'block';
//         else
//             timer.style.display = 'none';
//         k++;
//         // console.log(k);
//
//     };
//     let read_more = document.getElementById("read_more");
//     let t = 1;
//     read_more.onclick = function () {
//
//         // $("#demo").attr("display","block");
//         read_more.style.display = 'none';
//         let more_text = document.getElementById("more_text");
//         if (t % 2)
//             more_text.style.display = 'block';
//         else
//             more_text.style.display = 'none';
//         t++;
//         // console.log(k);
//
//     };
// };
//
//
//
