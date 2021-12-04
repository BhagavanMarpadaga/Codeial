
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
                    //console.log(data.data.user);
                    let newpost=newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newpost);
                    notifypost("post Created");
                    new Postcomments();
                    let deletelink= $(' .delete-post-button',newpost);
                    deletPost(deletelink);
                   
                },
                error:function(err){
                    console.log(err.responseText);
                    notifyPosterror("unable to add your post");
                }
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
                    <div class="comments-container-${post._id}">
                        <ul>
                        <div class="post-comments">
                                <form action="/comments/create" method="POST" id="new-comment-form">
                                    <input type="text" name="content" placeholder="Enter comments here">
                                    <input type="hidden" name="postId" value="${post._id}">
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
                   // console.log(deleteLink);
                  //  console.log(data);
                    $(`#post-${data.data.post_id}`).remove();
                    notifypost("post Deleted");
                },
                error: function (err) {
                    console.log(err.responseText);

                }
            })

        })
    }
    let deletepost=function(){
        let findpost=$('.delete-post-button');
        for(var i=0;i<findpost.length;i++)
        {
            deletPost(findpost[i]);
        }
        // console.log(findpost);
        // deletPost(findpost);

    }
    deletepost();


    function notifypost(msg)
    {

        new Noty({
            theme: 'relax',
            text: msg ,
            type: 'success',
            layout: 'topRight',
            timeout: 1500
        }).show(); 
    }
    function notifyPosterror(msg)
    {
        new Noty({
            theme: 'relax',
            text: '<%= flash.error%>',
            type: 'error',
            layout: 'topRight',
            timeout: 1500
        }).show(); 
    }
}