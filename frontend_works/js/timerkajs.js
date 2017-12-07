

$(()=>{

    $.get('/profile',(data)=>{
        let name=data.username;
        let userIMG=$('#userIMG');
        let dashHTML;
        let text;
        if(!name){
            $('#clk-btn').hide();
            $('#logout').hide();
            $('#activityPage').hide();
            $('#profile').hide();
            $('#signIn').show();
            $('#signUp').show();
        }else{
            text=`${name}`;
            let profile = $('#userNAME');
            profile.text(text);
            userIMG.append(`
<img style="height: 100%;width: 100%" class="fa" src="${data.thumbnail}">`);
            $('#profile').show();
            $('#clk-btn').show();
            $('#logout').show();
            $('#activityPage').show();
            $('#signIn').hide();
            $('#signUp').hide();

        }
    });

    let distance = 2700000;
    let x = setInterval(function() {

        distance = distance -1000;
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let popcontent = "Time left : " + minutes + " m " + seconds + "s ";
        let clkBTTN=$('#clk-btn');
        clkBTTN.attr('data-content',popcontent);
        if (distance < 0) {
            clkBTTN.attr('data-content',popcontent);
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

});


