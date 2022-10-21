
// Pre loader 
let loader = document.getElementById('loading');

function myLoadFunc() {
  loader.style.display = "none";
}



  //////  Projects mixitup

  let mixerfood = mixitup('.menuboxes', {
    selectors: {
        target: '.foodmenu'
    },
    animation: {
        duration: 300
    }
});


let  menuitem = document.querySelectorAll('menuitem');

menuitem.forEach(item => {
    item.addEventListener('click', () => {
        menuitem.forEach(project => {
            project.classList.remove('activeselect');
        })

        item.classList.add('activeselect');
    })
})



// Initialize  Carousel

 
$(document).ready(function(){
    $('.carousel').carousel({
        padding: 200,   
        indicators: true
    });;
    
    autoplay();
    function autoplay(){
        $('.carousel').carousel('next');
        setTimeout(autoplay,4500);

    }

  });


  
let showup = document.querySelector("#showup");

window.addEventListener("scroll", () => {
    window.scrollY >= 350 ? showup.classList.add("scrollup") : showup.classList.remove("scrollup")
});



 ///// Modalbox 

 let modaltoggle1 = document.querySelector('.modaltoggle1')
 let  signupmodal1 = document.querySelector('.signupmodal1')
 let modalclose1 = document.querySelector('.modalclose1')


 modaltoggle1.addEventListener('click', () => {

    signupmodal1.classList.add('showmodal');

 });

 modalclose1.addEventListener('click', () => {

    signupmodal1.classList.remove('showmodal');

 });



 let modaltoggle2 = document.querySelector('.modaltoggle2')
 let   loginmodal = document.querySelector('.loginmodal')
 let modalclose2 = document.querySelector('.modalclose2')


 modaltoggle2.addEventListener('click', () => {

    loginmodal.classList.add('showmodal');

 });

 modalclose2.addEventListener('click', () => {

    loginmodal.classList.remove('showmodal');

 });


let loginsystem = () => {
    
    loginmodal.classList.remove('showmodal');    
    signupmodal1.classList.add('showmodal');

}

let signupsystem = () => {
    
    signupmodal1.classList.remove('showmodal');
    loginmodal.classList.add('showmodal');    

}



let  searchmenu = document.querySelectorAll(".searchmenu");
const searchFunc = () => {
    let mysearch = document.getElementById("mysearch").value.toUpperCase();
    for (var a = 0; a <  searchmenu.length; a++)   searchmenu[a] && (( searchmenu[a].textContent ||  searchmenu[a].innerHTML).toUpperCase().indexOf(mysearch) > -1 ?  searchmenu[a].style.display = "flex" :  searchmenu[a].style.display = "none")
};

document.body.addEventListener("click", () => {
    searchmenu.forEach(a => {
        a.style.display = "none"
    })
});




window.addEventListener('scroll', () => {

    document.querySelector('#navbar').classList.toggle('navstick', window.scrollY > 0);

})




// Your web app's Firebase configuration
   // Your web app's Firebase configuration
   const firebaseConfig = {
    apiKey: "AIzaSyAfgYZbKvTTlcaQBXsjcNt7zzWahoy9yyI",
    authDomain: "authentication-18ab3.firebaseapp.com",
    databaseURL: "https://authentication-18ab3-default-rtdb.firebaseio.com",
    projectId: "authentication-18ab3",
    storageBucket: "authentication-18ab3.appspot.com",
    messagingSenderId: "868849845414",
    appId: "1:868849845414:web:6b89c16c0a03debef5a067"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()


  
  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    username = document.getElementById('username').value  
    checkbox = document.getElementById('checkbox');
    popup  = document.querySelector('.popup');
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        popup.innerHTML = "Email or Password is Outta Line!!";
        popup.style.top = "3rem";
        setTimeout(() => {
        popup.style.top = "-100%";            
        }, 2000);  
      return
      // Don't continue running the code
    }
    if (validate_field(username) == false ) {

        popup.innerHTML = "One or more filed is Outta Line!!"
        popup.style.top = "3rem";
        setTimeout(() => {
        popup.style.top = "-100%";            
        }, 2000);  
      return
    }
    if(!checkbox.checked)
    {
        popup.innerHTML = "You must agree to the terms first."
        popup.style.top = "3rem";
        setTimeout(() => {
        popup.style.top = "-100%";            
        }, 2000); 
        return false;
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        username :  username, 
        email : email,
        password  : password,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne 
      
      popup.innerHTML = "User Created Sucessfully!"
      popup.style.top = "3rem";
      setTimeout(() => {
      popup.style.top = "-100%";            
      }, 2000);  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message      
      
      popup.innerHTML = error_message;
      popup.style.top = "3rem";
      setTimeout(() => {
      popup.style.top = "-100%";            
      }, 2000);  
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('logemail').value
    password = document.getElementById('logpassword').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        
        popup.innerHTML = "Email or Password is Outta Line!!"
        popup.style.top = "3rem";
        setTimeout(() => {
        popup.style.top = "-100%";            
        }, 2000);  
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne      
      popup.innerHTML = "Logged In Sucessfully!";
      popup.style.top = "3rem";
      setTimeout(() => {
      popup.style.top = "-100%";            
      }, 2000);  
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
     
      popup.innerHTML = error_message;
      popup.style.top = "3rem";
      setTimeout(() => {
      popup.style.top = "-100%";            
      }, 2000);  
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }
  

  let hamburgermenu = document.querySelector('.hamburgermenu'); 
  let  navul = document.querySelector('#navul');
  let  loginsys = document.querySelector('.loginsys');
  
  hamburgermenu.addEventListener('click', () => {

    navul.classList.toggle('displaymenu'); 
    loginsys.classList.toggle('displaymenu');      

  })
 
