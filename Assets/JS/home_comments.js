class Postcomments{

    constructor()
    {
        // this.postId=postId;
       this.createComment();
    }


     createComment() {
        let parentSelf=this;
        let newcommentform=$('#new-comment-form');
        newcommentform.submit(function(e){
            
            e.preventDefault();
            // let postId=document.getElementById("postId").value;
            // console.log(postId);
            
            $.ajax({
                type:'post',
                url:'/comments/create',
                data:newcommentform.serialize(),
                success:function(data)
                {
                    //console.log("8888888888888888888888888888");
                    console.log(data);
                    let newcommetdom=parentSelf.newCommentDom(data.data.comment);
                    console.log(newcommetdom);
                    console.log('.comments-container-'+data.data.comment.post+'>ul');
                    $('.comments-container-'+data.data.comment.post+'>ul').prepend(newcommetdom);
                    parentSelf.notifypost("Comment added");
                    let deleteLink=$(" .delete-comment-button",newcommetdom);
                    parentSelf.deleteComment(deleteLink);
                },
                error:function(err){
                    console.log(err.responseText);
                    parentSelf.notifyPosterror("Unable to add comment");

                }
            })

        })
    }

     newCommentDom(comment) {
        console.log("I AM i coming inside create comment");
        return $(`<li id="comments-${comment._id}">
        <p><small>
        
            <a class="delete-comment-button" href="/comments/deleteComment/${comment._id}">X</a>
        
        </small>
            commented by:${ comment.user.name}&nbsp;Date:${comment.updatedAt}</br>
        ${comment.content}</p>
    </li>`)

    }

     deleteComment(deleteLink)
    {
        
        console.log($(deleteLink).prop('href'));
        $(deleteLink).click(function(e){
            console.log("Not sure coming or not");
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data)
                {
                    console.log(data);
                    // $(`#comments-${data.data.comment_id}`).remove();
                    $(`#comments-${data.data.comment_id}`).remove();
                    notifypost("Comment delted");
                },
                error:function(err)
                {
                    console.log(err.responseText);
                    notifyPosterror("Unable to deleted post");
                }
                
            })
    
        })
    }
   // createComment();
     delcom(){
        let findcommets=$('.delete-comment-button');
        //this.deleteComment(findcommets);
        for(var i=0;i<findcommets.length;i++)
        {
            this.deleteComment(findcommets[i]);
        }
        // console.log(findpost);
        // deletPost(findpost);
    }
    
  



    notifypost(msg)
    {

        new Noty({
            theme: 'relax',
            text: msg ,
            type: 'success',
            layout: 'topRight',
            timeout: 1500
        }).show(); 
    }
     notifyPosterror(msg)
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

let postObj=new Postcomments();
postObj.delcom();




    //post comment using ajax
    
   

