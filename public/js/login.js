//function validate(){

    // var mailField = document.getElementById("inputEmail4").value;
    // var phonefield = document.getElementById("phoneno").value;
    // var pwdField = document.getElementById("psw-input").value;
    // var emailerr = document.getElementById("emailerror");
    // var phonenoerr = document.getElementById("phonenoerror");
    // var pwderr = document.getElementById("pwderror");
    //var result = validateEmail(emailField)
    var result1;
    var result2;
    var result3;

    function validateEmail(emailField){
      var emailerr = document.getElementById("emailerror");
        //var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var reg = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9\-]+).([a-z]{2,3})(.[a-z]{2,3})?$/;
        if (reg.test(emailField.value) == false) 
        {
            //alert('Invalid Email Address');
            emailerr.innerHTML = "Invalid";
            emailerr.style.color = "Red";
            result1 = false;
            return false;
        }
        emailerr.innerHTML = "Valid";
        emailerr.style.color = "Green";
        result1 = true;
        return true;

    }


    function phonenumber(inputtxt)
    {
      
      var phonenoerr = document.getElementById("phonenoerror");
      var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if(inputtxt.value.match(phoneno))
         {
            phonenoerr.innerHTML = "Valid";
            phonenoerr.style.color = "Green";
            result2 = true;
           return true;      
         }
       else
         {
           //alert("Not a valid Phone Number");
           phonenoerr.innerHTML = "Invalid";
           phonenoerr.style.color = "Red";
           result2 = false;
           return false;
         }
    }

    function validatePassword(pwd){
      var pwderr = document.getElementById("pwderror");
      if(pwd == ""){
        pwderr.innerHTML = "Invalid";
        pwderr.style.color = "Red";
        result3 = false;
        console.log("result3:"+result3);
        return false;
      }
      else{
        pwderr.innerHTML = "Valid";
        pwderr.style.color = "Green";
        result3 = true;
        console.log("result3:"+result3);
        return true;
      }
    }
//}

function validateSignup(){ 
  var mailField = document.getElementById("inputEmail4").value;
  var phonefield = document.getElementById("phoneno").value;
  var pwdField = document.getElementById("psw-input").value;
  //var phonenoerr = document.getElementById("phonenoerror");
  //console.log("result1:"+result1);
  //console.log("result2:"+result2);
  //console.log("result3:"+result3);
  //var fresult1 = result1 && result2 && result3;
  var fresult1 = result1 && result2;
  if(mailField == ""||phonefield == ""||pwdField == ""){
    alert("Fields cannot be blank");
    return false;
  }
  else{
    //console.log("fresult1:"+fresult1);
  return fresult1;
  }
  
}

function validateLogin(){ 
  var mailField = document.getElementById("inputEmail4").value;
  var pwdField = document.getElementById("psw-input").value;
  // console.log("result1:"+result1);
  // console.log("result3:"+result3);
   var fresult2 = result1 && result3;
  // console.log("fresult2:"+fresult2);
  // return fresult2;
  if(mailField == ""||pwdField == ""){
    alert("Fields cannot be blank");
    return false;
  }
  else{
    //return true;
    return fresult2;
  }
}











