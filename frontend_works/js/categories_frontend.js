
$(function () {
    function showAll(cb) {
        console.log("opop");
        $.get('categories/',{},
            (data) =>{ cb(data);});
        console.log("opop");
    }

    function insertInto(categoryName,cb) {

        $.post('categories/',{

                categoryName:categoryName
            },
            (data) =>{ cb(data);});

        window.location.reload();
    }

    let categoryName = $('#categoryName');
    let addCategory = $('#addCategory');
    // console.log(addCategory);
    let categoryList = $('#categoryList');
    console.log("sdlksdkasjdklasjdlkasjd");

    function displayList(categories){

        categoryList.empty();

        var i=0;

        for(let typeofcategory of categories) {
            let newCategory = $(`<div class="card float-left m-3" style="height: 15rem;">
                <button type="button" class="btn mr-4" data-toggle="modal" data-target="#myModal${i}"></button>

                <div class="modal fade" id="myModal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
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
                                        <label for="categoryName${i}"><h4 align="center">${typeofcategory.categoryName}</h4></label><br>
                                        <input id="categoryName${i}" type="text">
                                    </div>

                                    <button type="button" class="btn btn-primary">Add this one too</button>

                                </form>

                            </div>
                            
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <p class="card-text" align="center">AddNew</p>
                </div>
            </div>`);

            categoryList.append(newCategory);
            i++;
        }
    }

    showAll((categories)=>displayList(categories));
    console.log("sdlksdkasjdklasjdlkasjd3242424");
    document.getElementById('addCategory').onclick=()=>{
        console.log("clicked");
        insertInto(categoryName.val(),(categories) => showAll(categories))
    };
});