{
    //post comment using ajax
    
    let createComment=function() {

        console.log("I AM i coming inside");
        let newcommentform=$('#new-comment-form');
        newcommentform.submit(function(e){
            e.preventDefault();
            
            $.ajax({
                type:'post',
                url:'/comments/create',
                data:newcommentform.serialize(),
                success:function(data)
                {
                    console.log(data);
                    let newcommetdom=newCommentDom(data.data.comment);
                    $('.comments-container>ul').prepend(newcommetdom);
                    let deleteLink=$(" .delete-comment-button",newcommetdom);
                    deleteComment(deleteLink);
                },
                error:function(err){
                    console.log(err.responseText);
                }
            })

        })
    }

    let newCommentDom = function (comment) {
        return $(`<li id="comments-${comment._id}">
        <p><small>
        
            <a class="delete-comment-button" href="/comments/deleteComment/${comment._id}">X</a>
        
        </small>
            commented by:${ comment.user.name}&nbsp;Date:${comment.updatedAt}</br>
        ${comment.content}</p>
    </li>`)

    }

    let deleteComment=function(deleteLink)
    {
        console.log($(deleteLink).prop('href'));
        deleteLink.click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data)
                {
                    console.log(data);
                    // $(`#comments-${data.data.comment_id}`).remove();
                    $(`#comments-${data.data.comment_id}`).remove();
                  
    
                },
                error:function(err)
                {
                    console.log(err.responseText);
                }
                
            })
    
        })
    }

        


        
    createComment();

}