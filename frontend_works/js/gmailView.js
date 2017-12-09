
$(()=>{
    let emailList= $('#emailList');
    let fetchedEmails=[];
    $.get('/gmail/mails',(mails)=>{
         fetchedEmails=mails;
        // let fetchedLabels=labelIds;
        gmailAppender(fetchedEmails);
    });

    function gmailAppender(fetchedEmails) {
        for(let i=0 ;i<fetchedEmails.length;i++){


                // let snippet=$(`<div>`);
            for(let j=0 ; j<fetchedEmails[i].length;j++)
            {
                switch(fetchedEmails[i][j])
                {
                    case 'UNREAD': fetchedEmails[i][j]=`<i class="fa fa-circle-thin"></i>&nbsp;`;
                        break;
                    case 'IMPORTANT': fetchedEmails[i][j]=`<i class="fa fa-circle" style="color: blue"></i>&nbsp;`;
                        break;
                    case 'CATEGORY_PRIMARY' : fetchedEmails[i][j]=`<i class="fa fa-circle" style="color: red"></i>&nbsp;`;
                        break;
                    case 'CATEGORY_UPDATES' : fetchedEmails[i][j]=`<i class="fa fa-circle" style="color: yellow"></i>&nbsp;`;
                        break;
                    case 'CATEGORY_PROMOTIONS' : fetchedEmails[i][j]=`<i class="fa fa-circle" style="color: green"></i>&nbsp;`;
                        break;
                    case 'CATEGORY_SOCIAL' : fetchedEmails[i][j]=`<i class="fa fa-circle" style="color: lightblue"></i> &nbsp;`;
                        break;
                    case 'CATEGORY_FORUMS' : fetchedEmails[i][j]=`<i class="fa fa-circle" style="color: purple"></i>&nbsp;`;
                        break;
                    case 'INBOX' : fetchedEmails[i][j]=`<i class="fa fa-circle" style="color: black"></i>&nbsp;`;
                        break;
                    case 'CATEGORY_PERSONAL' : fetchedEmails[i][j]=`<i class="fa fa-circle" style="color: #FE4B74"></i>&nbsp;`;
                        break;
                    case 'SENT' : fetchedEmails[i][j]=`<i class="fa fa-circle" style="color: lightgreen"></i>&nbsp;`;
                        break;

                }
            }

            let snippet=$(`<div class ="row">
                                <div class="col-1 forBorder" align="center">
                                   ${fetchedEmails[i].toString().split(',').join('  ')}
                                </div>
                                <div class="col-11 mb-2" >
                                   ${fetchedEmails[++i]}
                                </div>
                            </div>`);

            snippet.css({

                "background-color":'lightgrey',
                "overflow-wrap": 'break-word',
                "word-wrap": 'break-word'
            });
            // snippet.innerText=(fetchedEmails[i] + '     ' + fetchedEmails[++i] +' ..read more');
            emailList.append(snippet,'<br>');
        }
    }
});
