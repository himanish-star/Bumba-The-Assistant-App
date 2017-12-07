

$(()=>{
    let emailList= $('#emailList');
    let fetchedEmails=[];
    $.get('/gmail/mails',(mails)=>{
        fetchedEmails=mails;
        gmailAppender(fetchedEmails);
    });

    function gmailAppender(fetchedEmails) {
        for(let fetchedEmail of fetchedEmails){
            let snippet=$('<div></div>');
            snippet.css({
                'color':'darkblue',
                "background-color":'lightgrey'
            });
            snippet.text(fetchedEmail+' ..read more');
            emailList.append(snippet,'<br>');
        }
    }


});