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
                    <div  class="modal-dialog modal-lg" role="document">
                        <div style="height: 80vh" class="modal-content ">
                            <div class="modal-header">
                                <p><h4 align="center">${typeofcategory.categoryName}</h4><br>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            
                            <div style="overflow-y: scroll" class="modal-body">
                            <!--<h2>${typeofcategory.categoryName}</h2>-->
                                <!--list of urls under this category-->
                                <form class="form">
                                
                                    <div class="form-group" text-align="center">
                                        <label for="categoryName${i}"><h4 align="center">URL</h4></label><br>
                                        <input id="categoryName${i}" class="categoryNameClass" ondrop="${dropIt}" onDragOver="${dragOver}" ondragenter="${onDragEnter}" type="text">
                                    </div>
                                    
                                </form>
                                <div style="display: none" id="loadingMSG${typeofcategory.categoryName.split(" ").join("")}">loading ...
                                </div>
<ul id="${typeofcategory.categoryName.split(' ').join('')}">
                               </ul>
                            </div>
                
                            <div class="modal-footer">  
                                <button id='${i}' type="button" align="center" class="btn btn-primary">ADD URL TO THE LIST</button>
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
        urlAppenderToModal(urls);
    }

    function urlAppenderToModal(urls) {
        let i=0;
        for(let url of urls){
            i++;
            console.log(i);
            let cname=url.categoryName.split(' ').join('');
            let element=$(`#${cname}`);
            let loadingMSG = $(`#loadingMSG${cname}`);
            loadingMSG.css('display','block');
            let imgData=localStorage.getItem(url.urlName);
            if(imgData){
                loadingMSG.css('display','none');
                element.prepend(`<li>
<img src="data:image/png;base64,${imgData}" style="height: 10vh;width: 10vw">
<br>
<a href="${url.urlName}" target="_blank">${url.urlName}</a>
<i id="${url.urlName}" class="fa fa-times"></i>
</li>`);
                $(`#${url.urlName}`).click(()=>{
                    console.log("deleting");
                    document.getElementById(`${url.urlName}`).parentNode.style.display='none';
                    localStorage.removeItem(url.urlName);
                    $.post('/categories/urls/delete',
                        {
                            urlName:url.urlName
                        }
                    );
                });
            }else{
                $.get('/webshot',{url:url.urlName},(specificData)=>{
                    localStorage.setItem(url.urlName,specificData);
                    loadingMSG.hide();
                    element.prepend(`<li>
<img src="data:image/png;base64,${specificData}" style="height: 10vh;width: 10vw">
<br>
<a href="${url.urlName}" target="_blank">${url.urlName}</a>
<i id="${url.urlName}" class="fa fa-times"></i>
</li>`);
                    $(`#${url.urlName}`).click(()=>{
                        document.getElementById(`${url.urlName}`).parentNode.style.display='none';
                        localStorage.removeItem(url.urlName);
                        $.post('/categories/urls/delete',
                            {
                                urlName:url.urlName
                            }
                        );
                    });
                });
            }
        }

    }

    function dropIt (event) {
        event.preventDefault();
        let url = event.dataTransfer.getData("text");
        event.target.val = "";
        event.target.val = document.getElementById(url);
    }

    function dragOver (event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    function onDragEnter(event) {
        event.target.placeholder = 'Bring it here ...'
    }

    showAll((categories)=>displayList(categories));

    function urlAppender(event){
        let ip=event.target.getAttribute('id');

        $.post('/categories/urls',{
            categoryName:categoriesList[ip].categoryName,
            urlName:document.getElementById(`categoryName${ip}`).value
        });

        let url=[{
            categoryName:categoriesList[ip].categoryName,
            urlName:document.getElementById(`categoryName${ip}`).value
        }];
        urlAppenderToModal(url);
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
