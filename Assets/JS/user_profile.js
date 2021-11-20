{
   function getImagePre(event){
       //console.log(event.target.files[0]);
       var image=URL.createObjectURL(event.target.files[0]);

       var imgdiv=document.getElementById("preview-profile");
       var newImg=document.createElement('img');
       imgdiv.innerHTML="";
       newImg.src=image;
       newImg.width="100";
       imgdiv.append(newImg);
   }

}