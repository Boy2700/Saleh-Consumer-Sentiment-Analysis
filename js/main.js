(function($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function() {
        $(this).on('blur', function() {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            } else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function() {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function() {
        $(this).focus(function() {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function() {
        if (showPass == 0) {
            $(this).next('input').attr('type', 'text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        } else {
            $(this).next('input').attr('type', 'password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }

    });
})(jQuery);

function analyzeSentiment(event) {
    event.preventDefault();
    const apiKey = "5ee387c588b59c2cf2a1ee9448d54628";
    const text = document.getElementById("content").value;

    if (text.trim() === '') {
        alert("Please enter some text in the box to detect.");
        return; // Stop further execution
    }

    const url =
        `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&txt=${encodeURIComponent( 
        text 
    )}&lang=en`;

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Request failed");
            }
        })
        .then((data) => {
            const sentiment = data.score_tag;
            // console.log(`Text: ${text}`); 
            // console.log(`Sentiment: ${sentiment}`); 
            if (sentiment == "P+") {
                document.getElementById("result").innerHTML = "The Consumer review is extremely positive and highly enthusiastic!" + "<br><br>" +
                    "This is absolutely wonderful feedback! It's so uplifting to see such positive reactions from a Consumers. " +
                    "This review is a testament to the hard work, dedication, and quality of the product/service. " +
                    "Moments like these remind is an incredible impact on Consumers' lives !. ";
            }
            if (sentiment == "P") {

                document.getElementById("result").innerHTML = "The Consumer review is positive!" + "<br><br>" +
                    "The analysis reveals a positive sentiment in the Consumer review, indicating satisfaction and a favorable experience with the product/service. " +
                    "This positive feedback suggests that the Consumer finds the product/service offerings to be of good quality and value. ";
            }
            if (sentiment == "NEU") {
                document.getElementById("result").innerHTML = "The Consumer review is neutral!" + "<br><br>" +
                    "The analysis indicates a neutral sentiment in the Consumer review, suggesting a moderate level of satisfaction. " +
                    "This classification means that the Consumer found the experience neither particularly positive nor negative. " +
                    "This suggest that continue improving of the  product/service is neccssary.";
            }
            if (sentiment == "N") {
                document.getElementById("result").innerHTML = "The Consumer review is negative!" + "<br><br>" +
                    "The analysis indicates a negative sentiment in the Consumer review, suggesting dissatisfaction or issues with the product/service. " +
                    "This Consumer deserved an Apology for any inconvenience caused and take this feedback seriously!  ";
            }
            if (sentiment == "N+") {
                document.getElementById("result").innerHTML = "The Consumer review is very negative!" + "<br><br>" +
                    "This feedback is deeply concerning and indicates a highly unsatisfactory experience with the product/service. " +
                    "A committed resolving any issues and improving the  offerings is neccesaary. " +
                    " and Please reach out to the Consumer immediately to address the concerns comprehensively.";
            }
            if (sentiment == "NONE") {
                document.getElementById("result").innerHTML = "No clear sentiment detected in the review!" + "<br><br>" +
                    "In such cases, further investigation or contextual understanding may be necessary to determine the true nature of the Consumer's experience!";
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function clearScreen() {
    document.getElementById('content').value = ''; // Clear the textarea
    document.getElementById('resultStyle').innerHTML = ''; // Clear the result
    alert("You have cleared the screen");
}

function logOut() {
    // Redirect to the login page or do any other logout actions
    alert("You have succesfully log out!")
    window.location.href = "index.html"; // Change the URL as needed
}

// Add event listener to the logout button
document.getElementById("logoutBtn").addEventListener("click", logout);