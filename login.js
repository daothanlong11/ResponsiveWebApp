function Validator(options) {


    function validate(inputElement,rule)
    {
        var errorElement = inputElement.parentElement.querySelector(options.errorMessage);
        var errorMessage = rule.test(inputElement.value);
        

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid');
        }
    }
   
   var formElement = document.querySelector(options.form)
   
   if (formElement) {
       options.rules.forEach(function (rule) {
           var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {

                //process when user move mouse outside form's input
                inputElement.onblur = function () {
                    validate(inputElement,rule);
                }

                //process when user input changes
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorMessage);
                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid');
                }

            }
          
       })
   }
}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value){
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            if (!value.trim()){return 'Please fill the email field!!!'}
            else {return regex.test(value) ? undefined : 'Please input right email!!!'}
            
        }
    }
}


Validator.minLength = function(selector,min) {
    return {
        selector: selector,
        test: function(value){
            if (value.length < min) return 'Please input with 6 characters minimum!!!'
            
            return value.trim() ? undefined : 'Please fill the password field!!!'
        }
    }
}

