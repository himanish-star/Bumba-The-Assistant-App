function showAll(cb) {

    $.get('/categories/',(data) =>{ cb(data);})
}

function insertInto(categoryName,cb) {

    $.post('/categories/',{categoryName:categoryName},(data) =>{ cb(data);})
}

window.onload = function () {

    let categoryName = $('#categoryName');
    let addCategory = $('#addCategory');
    let categoryList = $('#categoryList');

    function displayList(categories){

        categoryList.empty();

        for(category of categories)
        {
            let newCategory = $(`<div class="card float-left m-3" style="height: 15rem;">
                <button type="button" class="btn mr-4" data-toggle="modal" data-target="#myModal2">
                    <!--&lt;!&ndash;<img class="card-img-top" src="css/images/cat%20green.jpg" alt="Card image cap">&ndash;&gt;-->
                </button>

                <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">Here's Your List </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"> &times;</span>
                                </button>
                            </div>
                            <div class="modal-body">

                               <ul>
                                   <li>URL 1</li>
                                   <li>URL 2</li>
                                   <li>URL 3</li>
                                   <li>URL 4</li>
                                   <li>URL 5</li>
                               </ul>

                                <form class="form">
                                    <div class="form-group">
                                        <label for="name"><h4 align="center">Category Name</h4></label><br>
                                        <input id="categoryName" type="text">
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

        }


        showAll((categories)=>displayList(categories));

        addCategory.click(()=>{
            insertInto(categoryName.val(),(categories)=>displayList(categories))
        });

    }





};