const queue=require('../config/kue');
//comments needs to go inside your queue

const commentMailer=require('../mailers/comments_mailer');

//every worker has a process function which tells the worker whenever new task is addedd into queue
//worker need to run the code insode the perocess function

queue.process('emails',function(job,done){

    console.log('emails worker processing a job',job.data);
    commentMailer.newComment(job.data);

})

//go to controller and call email worker after adding a comment

