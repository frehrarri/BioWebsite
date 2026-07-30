emailjs.init("8GnXdQKXCjFBLbOGd"); //public api key

const form = document.getElementById('contact-form')
form.addEventListener('submit', sendEmail); 
form.addEventListener('input', clearError);

const submitBtn = document.getElementById('submit-btn');

var emailedCount = 0;

async function sendEmail(e){
    e.preventDefault();

    if (emailedCount > 2){
        alert("In order to prevent automated spam you are limited to two emails.\n\nPlease manually send me an email to continue.")
    }

    const isValid = validateForm();
    if (isValid === false) return;

    submitBtn.disabled = true;

    try {
        await emailjs.sendForm('service_duf5i55', 'template_nne4c8p', form); //service id, //template id
        alert('Message sent successfully!');
        form.reset();
        emailedCount++;
    } catch (error) {
        alert('Failed to send message. Please try again.');
        console.error('EmailJS error:', error);
    } finally {
        submitBtn.disabled = false;
    }
}

function validateForm(){
    let isValid = true;

    const email = form[0].value;
    if (!email){
        form[0].classList.add("error-input");
        document.getElementById("email-error").classList.remove("hidden");
        isValid = false;
    }

    const subject = form[1].value;
    if (!subject){
        form[1].classList.add("error-input");
        document.getElementById("subject-error").classList.remove("hidden");
        isValid = false;
    }

    const message = form[2].value;
    if (!message){
        form[2].classList.add("error-input");
        document.getElementById("message-error").classList.remove("hidden");
        isValid = false;
    }

    return isValid;
}

function clearError(e){
    const input = e.target.id;

    if (input === "email"){
        const email = form[0];
        email.classList.remove("error-input");
        document.getElementById("email-error").classList.add("hidden");
    }
    else if (input === "subject"){
        const subject = form[1];
        subject.classList.remove("error-input");
        document.getElementById("subject-error").classList.add("hidden");
    }
    else if (input === "message"){
        const message = form[2];
        message.classList.remove("error-input");
        document.getElementById("message-error").classList.add("hidden");
    }
}
