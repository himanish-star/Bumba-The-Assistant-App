
$(()=>{
    let emailList= $('#emailList');
    let fetchedEmails=[];
    $.get('/gmail/mails',(mails)=>{
        let fetchedEmails=mails;
        // let fetchedLabels=labelIds;
        gmailAppender(fetchedEmails);
    });

    function gmailAppender(fetchedEmails) {
        for(let i=0 ;i<fetchedEmails.length;i++){


                let snippet=$('<div></div>');


           /* snippet.innerHTML+=`<div class="col-2 forBorder">
                                                      ${fetchedEmails[i]}
                                                    </div>
                                                    <div align="left" class="col-10 mb-2">
                                                       ${fetchedEmails[++i]}
                                                    </div>`;*/

            snippet.css({
                'color':'darkblue',
                "background-color":'lightgrey',
                "text-align" : 'justify'
            });
            snippet.text(fetchedEmails[i] + '     ' + fetchedEmails[++i] +' ..read more');
            emailList.append(snippet,'<br><br>');
        }
    }
});