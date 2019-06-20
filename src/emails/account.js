const sgMail=require('@sendgrid/mail')



sgMail.setApiKey(process.env.SENDGRID_KEY_API)

const sendWelcomeEmail=(email,name)=>{

    sgMail.send({
        to:email,
        from:'siddhantgk01@gmail.com',
        subject:'Thanks for signing up',
        text:`Welcome to the app,${name}. Let me know how you get along with the app.`
    
    })


}

const sendCancellationEmail=(email,name)=>{ 
      
    sgMail.send({ 
        to:email,
        from:'siddhantgk01@gmail.com',
        subject:'cancellation of membership',
        text:`sorry for letting you down,${name}. Let us know how can we imporve.`
    })
}


module.exports = { 
    sendWelcomeEmail,
    sendCancellationEmail
}