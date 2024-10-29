


const header = document.querySelector("header");

// function Open mun
let navbar = document.getElementById("navbar-hamburger")


function OpenMnue() {
  navbar.classList.toggle("hidden");
}

// function Open cards Add Tasks and add style in header
let crud_modal = document.getElementById("crud-modal")
function openCardsTasks() {
  crud_modal.classList.toggle("hidden");
  header.classList.toggle('blur-sm');

}
// function close cards add tasks and remove style
function closeCardsTasks() {
  crud_modal.classList.toggle("hidden");
  header.classList.toggle('blur-sm');


}



// function popup Remove
function openpopUpremove(){
  let popup_remove= document.getElementById("popup-remove");
  popup_remove.classList.toggle("hidden");
  header.classList.toggle('blur-sm');
}
function closepopupremove(){
  let popup_remove= document.getElementById("popup-remove");
 popup_remove.classList.toggle("hidden");
  header.classList.toggle('blur-sm');
}


// get data in html
const addTasks = document.getElementById("addTasks");
addTasks.addEventListener('click', function () {
  let description = document.getElementById("description");
  let Titer = document.getElementById("titer");
  let priorite = document.getElementById("priorite");
  let Status = document.getElementById("Status");
  let date_limite = document.getElementById("date_limite");

  let setdata;

  if (localStorage.getItem("task") != null) {
     setdata = JSON.parse(localStorage.getItem("task"))
  } else {
    setdata = [];
  }


  let getDta = {

    Titer: Titer.value,
    priorite: priorite.value,
    Status: Status.value,
    date_limite: date_limite.value,
    description: description.value,

  }

  setdata.push(getDta)

  localStorage.setItem("task", JSON.stringify(setdata))



})
