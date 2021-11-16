
{
    //post & comment data using ajax
    let createPost=function(){

        let newpostform=$('#new-post-form');
        newpostform.submit(function(e){
            console.log("I am coming inside comments ajax")
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/post/create',
                data:newpostform.serialize(),
                success:function(data){
                    console.log(data);
                    let newpost=newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newpost);
                    let deletelink= $(' .delete-post-button',newpost);
                    deletPost(deletelink);
                },
                error:function(err){console.log(err.responseText);}
            })
            
        })
            
    }
    createPost();

    let newPostDom=function(post){

        return $(`<li id="post-${post._id}">
        <p>
                <a class="delete-post-button" href="/post/deletePost/${post._id}">X</a>
               
                    <small>Posted by:${post.user.name}</small>
                    <small>
                       ${post.content}
                    </small>
                    <h3>Comments</h3>
                    <div>
                        <ul>
                        <div class="post-comments">
                                <form action="/comments/create" method="POST">
                                    <input type="text" name="content" placeholder="Enter comments here">
                                    <input type="hidden" name="postId" value="${post.id}">
                                    <input type="submit" value="Submit">
                                </form> 
                        </div>
                        </ul>
    
                    </div>
        </p>

    </li>`)
    }

    //method to delete post from dom
    let deletPost = function (deleteLink) {


        $(deleteLink).click(function (e) {  
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    console.log(deleteLink);
                    console.log(data);
                    $(`#post-${data.data.post_id}`).remove();

                },
                error: function (err) {
                    console.log(err.responseText);

                }
            })

        })
    }
}