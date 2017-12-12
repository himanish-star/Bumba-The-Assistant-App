$(function () {
    function showAll(cb) {
        $.get('/categories/',{},
            (data) =>{cb(data);});
    }

    function insertInto(categoryName,cb) {
        $.post('/categories/',{
                categoryName:categoryName,
            },
            (data) =>{cb(data);});
        window.location.reload();
    }

    function deleteFrom(cName,cb){
        $.post('/categories/delete',{
                cName : cName,
            },
            (data)=>{cb(data)});
        window.location.reload();
    }

    let categoriesList = null;
    let categoryName = $('#categoryName');
    let addCategory = $('#addCategory');
    let categoryList = $('#categoryList');
    let globalURLS=[];
    let totalCategories=0;

    function displayList(categories){

        let urls=categories.urlData;
        categories=categories.categoryData;
        categoriesList=categories;
        categoryList.empty();

        let i=0;

        for(let typeofcategory of categories) {
            let newCategory = $(`<div class="card float-left m-3 cardSize">
                <div><i class="fa fa-5x fa-star"></i></div>
                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal${i}"><i class="fa fa-folder"></i> ${typeofcategory.categoryName}</button>
                <div class="modal fade" id="myModal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div style="position:absolute;left: 10vw;" class="modal-dialog modal-lg" role="document">
                        <div style="height: 80vh;width: 80vw;" class="modal-content ">
                            <div class="modal-header">
                                <p><h4 align="center">${typeofcategory.categoryName}</h4><br>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            
                            <div style="overflow-y: scroll" class="modal-body">
                            <!--<h2>${typeofcategory.categoryName}</h2>-->
                                <!--list of urls under this category-->
                                <div style="display: none" id="loadingMSG${typeofcategory.categoryName.split(" ").join("")}">
                               
<div class="card" style="width: 20%;">
  <!--<div class="card-header"><i id="urlID${i}" class="fa fa-times"></i></div>-->
  <img class="card-img-top" alt="Loading">
  <div class="card-footer">
  loading
  </div>
</div>
                                </div>
                                <div id="${typeofcategory.categoryName.split(' ').join('')}">
                               </div>
                            </div>
                
                            <div class="d-flex justify-content-around modal-footer"> 
                                <div style="width: 80%">
                                        <input id="categoryName${i}" class="categoryNameClass" type="text">
                                </div> 
                                <div class='d-flex flex-wrap' style="margin:0;padding:0;width: 15%">
                                <button id='${i}' style="width: 80%" type="button" class="btn btn-primary">ADD URL</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-text" align="center"><button class="btn btn-danger" id="delBtn${i}"> Delete </button></p>
                </div>
            </div>`);

            categoryList.append(newCategory);
            document.getElementById(i).onclick=urlAppender;
            document.getElementById('delBtn'+i).onclick=categoryDelete;

            i++;
        }
        totalCategories=i;
        globalURLS=urls;
        urlAppenderToModal(urls);
    }

    function urlAppenderToModal(urls) {
        let i=0;
        for(let j=0;j<categoriesList.length;j++){
            let cname=categoriesList[j].categoryName.split(' ').join('');
            let element=$(`#${cname}`);
            element.html("");
            if(j===totalCategories-1)
                callback();
        }
        function callback() {
            for (let url of urls) {
                i++;
                console.log(i);
                let cname = url.categoryName.split(' ').join('');
                let element = $(`#${cname}`);
                let loadingMSG = $(`#loadingMSG${cname}`);
                loadingMSG.css('display', 'block');
                let imgData = localStorage.getItem(url.urlName);
                if (imgData) {
                    loadingMSG.css('display', 'none');
                    element.prepend(`<div>
<div class="card" style="height: 100%;width: 20%;">
  <div style="height: 20%" class="card-header"><i id="urlID${i}" class="fa fa-times"></i></div>
  <img style="height: 60%" class="card-img-top" src="data:image/png;base64,${imgData}" alt="Card image cap">
  <div style="height: 20%" class="card-footer">
  <a href="${url.urlName}" target="_blank">${url.urlName}</a>
  </div>
</div>
</div>`);
                    theFinalCall();
                } else {
                    $.get('/webshot', {url: url.urlName}, (specificData) => {
                        localStorage.setItem(url.urlName, specificData);
                        loadingMSG.hide();
                        element.prepend(`<div>
<div class="card" style="height:100%;width: 20%;">
  <div style="height: 20%" class="card-header"><i id="urlID${i}" class="fa fa-times"></i></div>
  <img style="height: 60%" class="card-img-top" src="data:image/png;base64,${specificData}" alt="Card image cap">
  <div style="height: 20%" class="card-footer">
  <a href="${url.urlName}" target="_blank">${url.urlName}</a>
  </div>
</div>
</div>`);
                       theFinalCall();
                    });
                }
                function theFinalCall() {
                    if(i===urls.length)
                        onclickAppender();
                }
            }
            function onclickAppender() {
                console.log("isdaasas",i);
                let temp=[];
                let o=0;
                for(let k=1;k<=i;k++)
                $(`#urlID${k}`).click(() => {
                    localStorage.removeItem(urls[k-1].urlName);
                    $.post('/categories/urls/delete',
                        {
                            urlName: urls[k-1].urlName
                        }
                    ,(data)=>{
                        console.log(data);
                            for(let m=0;m<urls.length;m++){
                                if(urls[m]===urls[k-1]){

                                }else{
                                    temp[o++]=urls[m];
                                }
                                if(m===urls.length-1) {
                                    urls=temp;
                                    globalURLS=urls;
                                    urlAppenderToModal(urls);
                                }
                            }
                    });
                });
            }
        }
    }

    showAll((categories)=>displayList(categories));

    function urlAppender(event){
        let ip=event.target.getAttribute('id');

        $.post('/categories/urls',{
            categoryName:categoriesList[ip].categoryName,
            urlName:document.getElementById(`categoryName${ip}`).value
        });

        let url={
            categoryName:categoriesList[ip].categoryName,
            urlName:document.getElementById(`categoryName${ip}`).value
        };
        globalURLS.push(url);
        urlAppenderToModal(globalURLS);
    }

    function categoryDelete(event) {
        let idI = event.target.getAttribute('id').split('n')[1];
        let cName = categoriesList[idI].categoryName;
        deleteFrom(cName,(categories) => showAll(categories))

    }

    addCategory.click(()=>{
        insertInto(categoryName.val(),(categories) => showAll(categories))
    });
});
