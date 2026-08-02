const body = document.querySelector("body");
body.addEventListener("click", handleClicks);

emailjs?.init("8GnXdQKXCjFBLbOGd"); //public api key

function handleClicks(e){

    //prevent navigating to pages we are already on
    const nav = e.target.closest("nav");
    const navlinks = nav?.querySelector('ul');
    const selectedPage = e.target;

    if (navlinks && navlinks.classList.contains("home") && selectedPage.classList.contains('home'))
        e.preventDefault();
    else if (navlinks && navlinks.classList.contains("about") && selectedPage.classList.contains('about'))
        e.preventDefault();
    else if (navlinks && navlinks.classList.contains("contact") && selectedPage.classList.contains('contact'))
        e.preventDefault();
    else if (navlinks && navlinks.classList.contains("skills") && selectedPage.classList.contains('skills'))
        e.preventDefault();

    //toggle mobile app dropdown menu
    const hamburger = e.target.closest("#hamburger");
    if (hamburger)
        toggleDropdown();
        
    //submit email form
    const submitBtn = e.target.closest('#submit-btn');
    if (submitBtn)
        sendEmail(e, submitBtn);
    
}

const form = document.getElementById('contact-form')
form?.addEventListener('input', clearError);

const emailedCount = 0;

async function sendEmail(e, submitBtn){
    e.preventDefault();

    if (emailedCount > 2){
        alert("In order to prevent automated spam you are limited to two emails.\n\nPlease manually send me an email to continue.")
    }

    const isValid = validateForm();
    if (isValid === false) return;

    submitBtn.disabled = true;

    try {
        await emailjs?.sendForm('service_duf5i55', 'template_nne4c8p', form); //service id, //template id
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



function toggleDropdown(){
    const dropdown = document.getElementById('mobile-dropdown');
    dropdown.classList.toggle('hidden');
}