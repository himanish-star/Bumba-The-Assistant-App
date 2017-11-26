$(function () {
    function showAll(cb) {
        $.get('categories/',{},
            (data) =>{ console.log(data);
            cb(data);});
    }

    function insertInto(categoryName,cb) {
        $.post('categories/',{
                categoryName:categoryName
            },
            (data) =>{ cb(data);});
        window.location.reload();
    }

    let categoryName = $('#categoryName');
    let categoryList = $('#categoryList');

    function displayList(categories){
        categoryList.empty();
        var i=0;

        for(let typeofcategory of categories) {
            let newCategory = $(`<div class="card float-left m-3" style="height: 15rem; width:15rem;">
                <button type="button" class="btn btn-success" style="width: 15rem; height: 12rem;" data-toggle="modal" data-target="#myModal${i}"><h1>${typeofcategory.categoryName}</h1></button>

                <div class="modal fade" id="myModal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <p><h4 align="center">${typeofcategory.categoryName}</h4><br>

                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"> &times;</span>
                                </button>
                            </div>
                            
                            <div class="modal-body">

                               <ul>
                                   <li>URL 1</li>
                                   <li>URL 2</li>
                                   
                               </ul>

                                <form class="form">
                                
                                    <div class="form-group">
                                        <input id="categoryName${i}" type="text">
                                    </div>

                                    <button type="button" class="btn btn-primary">Add this one too</button>

                                </form>

                            </div>
                            
                            
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <p class="card-text" align="center"></p>
                </div>
            </div>`);

            categoryList.append(newCategory);
            i++;
        }
    }

    showAll((categories)=>displayList(categories));
    document.getElementById('addCategory').onclick=()=>{
        insertInto(categoryName.val(),(categories) => showAll(categories))
    };
});