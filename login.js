let l_user=document.getElementById('lname');
let l_pass=document.getElementById('lpass');
let lfrm=document.getElementById("lfrm");

lfrm.addEventListener('submit',(e)=>{

  let stdusername= l_user.value;
  let stdpassword= l_pass.value;

  e.preventDefault();
  if(localStorage.getItem(stdusername)=== stdpassword){
    window.location.href="home.html";
  }
  else{
    window.alert("Wrong password");
  }
},false);

 