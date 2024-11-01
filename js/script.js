

var tmp = null;
// let setdata = JSON.parse(localStorage.getItem("task")) || [];


let description = document.getElementById("description");
let Titer = document.getElementById("titer");
let priorite = document.getElementById("priorite");
let Status = document.getElementById("Status");
let date_limite = document.getElementById("date_limite");
let local = JSON.parse(localStorage.getItem("task")) || [];
let id;
let triparP = document.getElementById("p1")
let taskContainer1 = document.getElementById("task1");
let taskContainer2 = document.getElementById("task2");
let taskContainer3 = document.getElementById("task3");
let setdata = [];
let triparTiter =document.getElementById("triparTiter")


// console.log(local);

function addTask() {

  let validTiter = /^[a-zA-Z]{1,6}\s?/ig;
  let validDescription = /^[a-zA-Z0-9]{1,10}\s?/ig;
  if (!validTiter.test(Titer.value)) {
    alert("ccc")

  } else if (!validDescription.test(description.value)) {

    alert("hhhhhhhhhhhhhhhhhhhhhh")

  } else {

    let getDta = {
      id: Math.random() * 100,
      Titer: Titer.value,
      priorite: priorite.value,
      Status: Status.value,
      date_limite: date_limite.value,
      description: description.value,

    }
    // check or find id in this arry or no
    const index = setdata.findIndex(task => task.id === tmp);
    if (index !== -1) {
      setdata[index] = getDta;
    } else {
      setdata.push(getDta);

    }







    localStorage.setItem("task", JSON.stringify(setdata))

    setDataInnerHtml()
    closeCardsTasks()
    clearFormFields()
    location.reload()
    // sortTasksByPriority();
    // triage()
  }


}



// clear data
function clearFormFields() {

  document.getElementById("description").value = '';
  document.getElementById("titer").value = '';
  document.getElementById("priorite").value = '';
  document.getElementById("Status").value = '';
  document.getElementById("date_limite").value = '';

}

// ajout data in html
function setDataInnerHtml() {
  taskContainer1.innerHTML = "";
  taskContainer2.innerHTML = "";
  taskContainer3.innerHTML = "";

  let countToDo = 0;
  let countDoing = 0;
  let countDone = 0;


  setdata.forEach(task => {

    let borderColor
    if (task.priorite === "1") {
      borderColor = "4px solid red";
    } else if (task.priorite === "2") {
      borderColor = "4px solid yellow";
    } else if (task.priorite === "3") {
      borderColor = "4px solid green";
    }

    // Add task to the correct container based on status
    if (task.priorite == "1") {

      if (task.Status == "To Do") {

        taskContainer1.innerHTML += ajoute(task, borderColor)

      }
      if (task.Status == "In Progess") {

        taskContainer2.innerHTML += ajoute(task, borderColor)

      }
      if (task.Status == "Done") {

        taskContainer3.innerHTML += ajoute(task, borderColor)

      }
      countToDo++;
    } else if (task.priorite === "2") {
      if (task.Status == "To Do") {
        taskContainer1.innerHTML += ajoute(task, borderColor)

      }
      if (task.Status == "In Progess") {
        taskContainer2.innerHTML += ajoute(task, borderColor)

      }
      if (task.Status == "Done") {
        taskContainer3.innerHTML += ajoute(task, borderColor)

      }
      countDoing++;
    } else if (task.priorite === "3") {
      if (task.Status == "To Do") {
        taskContainer1.innerHTML += ajoute(task, borderColor)

      }
      if (task.Status == "In Progess") {
        taskContainer2.innerHTML += ajoute(task, borderColor)

      }
      if (task.Status == "Done") {
        taskContainer3.innerHTML += ajoute(task, borderColor)
        countDone++;
      }

    }


  });

  // Update task counts
  document.getElementById("countone").innerText = countToDo;
  document.getElementById("counttwe").innerText = countDoing;
  document.getElementById("counttree").innerText = countDone;
}

function ajoute(item, borderColor) {
  const time = item.date_limite.split("-");
  const mounth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let timenwe = new Date(time);

  // }
  let taskHTML = `
      <div class="bg-white shadow-md border border-l-8 p-4 mb-4 w-64 relative card" style="border-left:${borderColor}">
        <div class="absolute leading-3 font-bold right-2 top-0 size-5">
          <h1 onclick="openChoxtodo()">...</h1>
        </div>
        <div class="relative max-w-sm">
  
          <h1 class="border border-l-8 border-black w-18 absolute right-0 top-7 px-56 text-gray-700" id="limite ">${time[1]} ${mounth[Number(time[1]) - 1]}</h1>
        </div>
        <h3 class="font-bold">${item.Titer}</h3>
        <p class="text-zinc-500 text-xs my-2">${item.description} | <span>P${item.priorite}</span></p>
        <div class="flex justify-between mt-3">
          <button onclick="removeTask(${item.id})" class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-2 py-2">Remove</button>
          <button onclick="UpditeTask(${item.id})" class="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-3">Update</button>
        </div>
      </div>
    `;
  return taskHTML


}




// onload data
window.onload = function () {
  if (localStorage.getItem("task") != null) {
    setdata = JSON.parse(localStorage.getItem("task"));
  }
  setDataInnerHtml();

};




const header = document.querySelector("header");

// function Open mun
function OpenMnue() {
  let navbar = document.getElementById("navbar-hamburger")
  navbar.classList.toggle("hidden");
}

// function Open cards Add Tasks and add style in header
let crud_modal = document.getElementById("crud-modal")

function openCardsTasks() {
  crud_modal.classList.toggle("hidden");
  header.classList.toggle('blur-sm');

}
//  close cards add tasks
function closeCardsTasks() {
  crud_modal.classList.toggle("hidden");
  header.classList.toggle('blur-sm');

}




// function popup Remove
function removeTask(id) {
  // let popup_remove= document.getElementById("popup-remove");
  //  popup_remove.classList.toggle("hidden");
  //  header.classList.toggle('blur-sm');
  setdata = setdata.filter(filter => filter.id !== id);
  localStorage.setItem("task", JSON.stringify(setdata));
  setDataInnerHtml();

}

function closepopupremove() {
  let popup_remove = document.getElementById("popup-remove");
  popup_remove.classList.toggle("hidden");
  header.classList.toggle('blur-sm');
}


// function Update Tasks

function UpditeTask(i) {
  crud_modal.classList.toggle("hidden");
  header.classList.toggle('blur-sm');
  addTasks.innerHTML = "Update";

  tmp = i;

  const task = setdata.find(task => task.id === i);

  if (task) {
    document.getElementById("description").value = task.description;
    document.getElementById("titer").value = task.Titer;
    document.getElementById("priorite").value = task.priorite;
    document.getElementById("Status").value = task.Status;
    document.getElementById("date_limite").value = task.date_limite;
  }
}



function recherche(value) {
  let recher = document.getElementById("recher")
  setdata = setdata.filter(filter => filter.Titer == recher.value);
  setDataInnerHtml();

}




triparP.onclick = function () {
  function compare(a, b) {
    let pA = a.priorite;
    let pB = b.priorite;
    return pA - pB; 

  }
  setdata = local.sort(compare);
  setDataInnerHtml();
}


triparTiter.onclick = function () {
  
setdata.sort((a, b) => {
  const TiterA = a.Titer.toUpperCase();
  const titerB = b.Titer.toUpperCase(); 
  
  if (TiterA < titerB) {
    return -1;
  }
  if (TiterA > titerB) {
    return 1;
  }
  return 0;
});

  setDataInnerHtml();
  
   
}
