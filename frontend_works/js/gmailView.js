$(()=>{
    let emailList= $('#emailList');
    let fetchedEmails=[];
    let percentComplete = $('#percentComplete');
    $.get('/gmail/mails',(mails)=>{
        fetchedEmails=mails;
        emailList.hide();
        percentComplete.css('width','100%');
        gmailAppender(fetchedEmails);
    });

    function gmailAppender(fetchedEmails) {
        let totalMails=fetchedEmails.length;
        for(let i=0 ;i<totalMails;i++){
                // let snippet=$(`<div>`);
            percentComplete.css('width',`${((i+2)*100)/totalMails}%`);
            for(let j=0 ; j<fetchedEmails[i].length;j++)
            {
                switch(fetchedEmails[i][j])
                {
                    case 'UNREAD': fetchedEmails[i][j]=`<i class="material-icons">panorama_fish_eye</i>&nbsp;`;
                        break;
                    case 'IMPORTANT': fetchedEmails[i][j]=`<i class="material-icons" style="color: blue">lens</i>&nbsp;`;
                        break;
                    case 'CATEGORY_PRIMARY' : fetchedEmails[i][j]=`<i class="material-icons" style="color: red">lens</i>&nbsp;`;
                        break;
                    case 'CATEGORY_UPDATES' : fetchedEmails[i][j]=`<i class="material-icons" style="color: yellow">lens</i>&nbsp;`;
                        break;
                    case 'CATEGORY_PROMOTIONS' : fetchedEmails[i][j]=`<i class="material-icons" style="color: green">lens</i>&nbsp;`;
                        break;
                    case 'CATEGORY_SOCIAL' : fetchedEmails[i][j]=`<i class="material-icons" style="color: lightblue">lens</i> &nbsp;`;
                        break;
                    case 'CATEGORY_FORUMS' : fetchedEmails[i][j]=`<i class="material-icons" style="color: purple">lens</i>&nbsp;`;
                        break;
                    case 'INBOX' : fetchedEmails[i][j]=`<i class="material-icons" style="color: black">lens</i>&nbsp;`;
                        break;
                    case 'CATEGORY_PERSONAL' : fetchedEmails[i][j]=`<i class="material-icons" style="color: #FE4B74">lens</i>&nbsp;`;
                        break;
                    case 'SENT' : fetchedEmails[i][j]=`<i class="material-icons" style="color: lightgreen">lens</i>&nbsp;`;
                        break;

                }
            }

            let snippet=$(`<div class ="row">
                                    <div class="col-offset-1 forBorder" align="center">
                                   ${fetchedEmails[i].toString().split(',').join('  ')}
                                </div>
                                <div class=" col-10" >
                                   ${fetchedEmails[++i]}
                                </div>
                            </div>`);

            snippet.css({


                "overflow-wrap": 'break-word',
                "word-wrap": 'break-word'
            });
            // snippet.innerText=(fetchedEmails[i] + '     ' + fetchedEmails[++i] +' ..read more');
            emailList.append(snippet,'<br>');
            if(i===49){
                setTimeout(()=>{
                    $('#preLoaderForMails').hide();
                    emailList.show();
                },1000);
            }
        }
    }
});
