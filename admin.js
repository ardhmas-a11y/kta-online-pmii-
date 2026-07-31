//==========================================
// LOGIN ADMIN
//==========================================

const USERNAME = "Admin@pmiipacitan";
const PASSWORD = "pmii2026!";

function login(){

const user=document.getElementById("username").value;
const pass=document.getElementById("password").value;

if(user===USERNAME && pass===PASSWORD){

localStorage.setItem("adminLogin","true");

document.getElementById("loginPage").style.display="none";
document.getElementById("dashboard").style.display="block";

loadData();

}else{

document.getElementById("pesan").innerHTML="Username atau Password salah.";

}

}

function logout(){

localStorage.removeItem("adminLogin");

location.reload();

}

window.onload=function(){

if(localStorage.getItem("adminLogin")=="true"){

document.getElementById("loginPage").style.display="none";
document.getElementById("dashboard").style.display="block";

loadData();

}

}

//==========================================
// URL APPS SCRIPT
//==========================================

const URL="https://script.google.com/macros/s/AKfycbzP1H0VR5OqU2BALAJt6z7sGH1FCXQ44-MQixQe3S9E4JC0NhxRQ9O3wfT18bQVMqtNqA/exec?action=list";

//==========================================
// LOAD DATA
//==========================================

function loadData(){

fetch(URL)

.then(r=>r.json())

.then(res=>{

let html="";

res.data.forEach(item=>{

html+=`
<tr>

<td>${item.registrasi}</td>

<td>${item.nama}</td>

<td>${item.nomorKTA||"-"}</td>

<td>${item.status}</td>

<td>

<button class="btn btn-success btn-sm">

Verifikasi

</button>

</td>

</tr>
`;

});

document.getElementById("data").innerHTML=html;

});

}
