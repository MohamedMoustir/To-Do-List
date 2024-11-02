

var tmp = null;
let addTask = document.getElementById("addTask");
let local = JSON.parse(localStorage.getItem("task")) || [];
let description = document.getElementById("description");
let Title = document.getElementById("Title");
let Priority = document.getElementById("Priority");
let Status = document.getElementById("Status");
let date_limite = document.getElementById("date_limite");
let id;
let taskContainer1 = document.getElementById("task1");
let taskContainer2 = document.getElementById("task2");
let taskContainer3 = document.getElementById("task3");
let setdata = [];
let triparP = document.getElementById("p1")
let triparTiter = document.getElementById("triparTiter")
let triparDate_limite = document.getElementById("triparDate_limite")
let more_description = document.getElementById("text")

// rejex
let validTitle = /^\w{1,10}$/;
let validDescription = /^\w+\W?\s?\w+/ig;
let validdetaLimite = /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
// function add task  in local Storge
addTask.addEventListener("click", function () {

  if (!validdetaLimite.test(date_limite.value)) {
    document.getElementById("errorPopup").classList.toggle("hidden")
    
  } else if (!validTitle.test(Title.value)) {
    document.getElementById("errorPopup").classList.toggle("hidden")
  } else if (!validDescription.test(description.value)) {
    document.getElementById("errorPopup").classList.toggle("hidden")

  } else {

    let getDta = {
      id: Math.random() * 100,
      Title: Title.value,
      Priority: Priority.value,
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

  }

})

// colse pop-up rejex
function closePopup(){
  document.getElementById("errorPopup").classList.toggle("hidden")
  
}


// clear data
function clearFormFields() {

  document.getElementById("description").value = '';
  document.getElementById("Title").value = '';
  document.getElementById("Priority").value = '';
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

// divsion colors (p1 p2 p3)
  setdata.forEach(task => {

    let borderColor;
    if (task.Priority === "1") {
      borderColor = "4px solid  #AF1740";
    } else if (task.Priority === "2") {
      borderColor = "4px solid #FD8B51";
    } else if (task.Priority === "3") {
      borderColor = "4px solid #387478";
    }

    // Add task to the correct container based on status
    switch (task.Priority) {
      case '1':
        if (task.Status == "To Do") {

          taskContainer1.innerHTML += ajoute(task, borderColor)
          countToDo++;
        }

        if (task.Status == "In Progess") {

          taskContainer2.innerHTML += ajoute(task, borderColor)
          countDoing++;
        }
        if (task.Status == "Done") {

          taskContainer3.innerHTML += ajoute(task, borderColor)
          countDone++;
        }
        break;
      case '2':
        if (task.Status == "To Do") {

          taskContainer1.innerHTML += ajoute(task, borderColor)
          countToDo++;
        }
        if (task.Status == "In Progess") {

          taskContainer2.innerHTML += ajoute(task, borderColor)
          countDoing++;
        }
        if (task.Status == "Done") {

          taskContainer3.innerHTML += ajoute(task, borderColor)
          countDone++;
        }
        break;
      case '3':
        if (task.Status == "To Do") {

          taskContainer1.innerHTML += ajoute(task, borderColor)
          countToDo++;
        }
        if (task.Status == "In Progess") {
          taskContainer2.innerHTML += ajoute(task, borderColor)
          countDoing++;
        }
        if (task.Status == "Done") {
          taskContainer3.innerHTML += ajoute(task, borderColor)
          countDone++;
        }
        break;
    }
  });

  // add  counts in task
  document.getElementById("countone").innerText = countToDo;
  document.getElementById("counttwe").innerText = countDoing;
  document.getElementById("counttree").innerText = countDone;
}

//function ajoute task
function ajoute(item, borderColor) {
// get date now
  let new_date = new Date();

  let year = new_date.getFullYear();
  let month = new_date.getMonth() + 1;
  let day = new_date.getDate();

  let date = `${year}-${month}-0${day}`;

  let dateUtilse = item.date_limite
// check date
  let color_time;
  let line_through;
  if (dateUtilse < date) {
    color_time = "8px solid red"
    line_through ="line-through"
  } 
// style date 
  const time = item.date_limite.split("-");
  const mounth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let timenwe = new Date(time);
  more_description.innerHTML = item.description;

  let taskHTML = `
  <div class="bg-white bg-opacity-90 backdrop-blur-md  shadow-lg rounded-xl border-l-4 p-4 mb-6 w-72 relative card transition-all duration-200 transform hover:scale-105 hover:shadow-2xl" style="border-left:${borderColor};">
  
  <div class="absolute text-gray-500 text-lg font-bold right-3 top-2 cursor-pointer transition-colors hover:text-gray-700">
    <h1 onclick="openpop_updescription(${item.id})">...</h1>
  </div>
  

  <div class="relative mb-2">
    <h1 class="border-l-4 border-gray-200 rounded-sm px-2 py-1 text-gray-600 text-sm font-medium absolute right-0 top-7 bg-white bg-opacity-80" id="limite" style="border-left:${color_time}; text-decoration-line:${line_through}">
      ${time[1]} ${mounth[Number(time[1]) - 1]}
    </h1>
  </div>


  <h3 class="font-bold text-lg text-gray-900 mb-2">${item.Title}</h3>
  <p class="text-gray-600 text-sm mb-4">${item.description.slice(0,10)}... | <span class="font-semibold text-gray-800">P${item.Priority}</span></p>
  
  <div class="flex justify-between">
    <button onclick="removeTask(${item.id})" class="bg-gradient-to-r text-red-500 to-red-600 hover:from-red-600 hover:to-red-700  font-semibold py-2 px-4 rounded-lg shadow transition-all transform hover:scale-105">
      Remove
    </button>
    <button onclick="UpditeTask(${item.id})" class="bg-gradient-to-r text-green-500 to-green-600 hover:from-green-600 hover:to-green-700  font-semibold py-2 px-4 rounded-lg shadow transition-all transform hover:scale-105">
      Update
    </button>
  </div>
</div>

    `;
  return taskHTML


}




// onload window
window.onload = function () {
  if (localStorage.getItem("task") != null) {
    setdata = JSON.parse(localStorage.getItem("task"));
  }
  setDataInnerHtml();

}




const header = document.querySelector("header");
// function Open choix mun
function OpenMnue() {
  let navbar = document.getElementById("navbar-hamburger")
  navbar.classList.toggle("hidden");
}

// function Open cards Add Tasks and add style in header
let crud_modal = document.getElementById("crud-modal")
function openCardsTasks() {
  crud_modal.classList.toggle("hidden");
   header.style.filter="blur(4px)"

}
//  close cards add tasks
function closeCardsTasks() {
  crud_modal.classList.toggle("hidden");
   header.style.filter="blur(0)"

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
   header.style.filter="blur(4px)"
}


// function Update Task
function UpditeTask(i) {
  crud_modal.classList.toggle("hidden");
  header.classList.toggle('blur-sm');
  addTask.innerHTML = "Update";
 
  tmp = i;

  const task = setdata.find(task => task.id === i);
  if (task) {
    description.value = task.description;
    Title.value = task.Title;
    Priority.value = task.Priority;
    Status.value = task.Status;
    date_limite.value = task.date_limite;
  }
 
}


// function recherche
function recherche(value) {
  let recher = document.getElementById("recher")
  setdata = setdata.filter(filter => filter.Title === recher.value);
  setDataInnerHtml();
if (recher.value='') {
  location.reload()
}
}



// tri par P1
triparP.onclick = function () {
  function compare(a, b) {
    let pA = a.Priority;
    let pB = b.Priority;
    return pA - pB;

  }
  setdata = local.sort(compare);
  setDataInnerHtml();
}

// tri par Title
triparTiter.onclick = function () {
alert("d")
  setdata.sort((a, b) => {
    const TiterA = a.Title.toUpperCase();
    const titerB = b.Title.toUpperCase();

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

// triparDate_limite
triparDate_limite.onclick = function () {
  setdata.sort((a, b) => {
    const TiterA = a.date_limite;
    const titerB = b.date_limite;

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

// function pop_up more description
function openpop_updescription(id) {
  document.getElementById('default-modal').classList.toggle('hidden');
  header.style.filter="blur(4px)"
  const taskk = setdata.find(taskk => taskk.id === id)
  if (taskk) {
    more_description.innerHTML = taskk.description;
  }
}
document.getElementById("button_close_des").onclick =function(){
  document.getElementById('default-modal').classList.toggle('hidden');
   header.style.filter="blur(0)"
}