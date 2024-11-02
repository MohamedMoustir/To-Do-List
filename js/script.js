

var tmp = null;

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
let triparTiter =document.getElementById("triparTiter")
let triparDate_limite =document.getElementById("triparDate_limite")
let more_description =document.getElementById("text")

// rejex

function addTask() {

  let validTitle = /^[a-zA-Z]{5}\s?/ig;
  let validDescription = /^[a-zA-Z0-9]{1,}\s?/ig;
  if (!validTitle.test(Title.value)) {
    alert("ccc")

  } else if (!validDescription.test(description.value)) {

    alert("hhhhhhhhhhhhhhhhhhhhhh")

  } else {

    let getDta = {
      id: Math.random() * 100,
      Title: Title.value,
      Priority:Priority.value,
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


  setdata.forEach(task => {

    let borderColor;
    if (task.Priority === "1") {
      borderColor = "4px solid red";
    } else if (task.Priority === "2") {
      borderColor = "4px solid yellow";
    } else if (task.Priority === "3") {
      borderColor = "4px solid green";
    }

    // Add task to the correct container based on status
    switch (task.Priority) {
      case '1':
        if (task.Status == "To Do") {
        
          taskContainer1.innerHTML += ajoute(task, borderColor)
        }
        
      if (task.Status == "In Progess") {
      
        taskContainer2.innerHTML += ajoute(task, borderColor)

      }
      if (task.Status == "Done") {
      
        taskContainer3.innerHTML += ajoute(task, borderColor)

      }
        break;
     case '2':
      if (task.Status == "To Do") {
      
        taskContainer1.innerHTML += ajoute(task, borderColor)

      }
      if (task.Status == "In Progess") {
      
        taskContainer2.innerHTML += ajoute(task, borderColor)

      }
      if (task.Status == "Done") {
      
        taskContainer3.innerHTML += ajoute(task, borderColor)

      }
        break;
        case '3':
          if (task.Status == "To Do") {
            
            taskContainer1.innerHTML += ajoute(task, borderColor)
    
          }
          if (task.Status == "In Progess") {
            taskContainer2.innerHTML += ajoute(task, borderColor)
    
          }
          if (task.Status == "Done") {
            taskContainer3.innerHTML += ajoute(task, borderColor)
    
          }
          break;
          countDone++;
          countToDo++;
          countDone++;
      
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

  // 
  more_description.innerHTML=item.description;

  let taskHTML = `
      <div class="bg-white shadow-md border border-l-8 p-4 mb-4 w-64 relative card" style="border-left:${borderColor}">
        <div class="absolute leading-3 font-bold right-2 top-0 size-5">
          <h1  onclick="openpop_updescription(${item.id})">...</h1>
        </div>
        <div class="relative max-w-sm">
  
          <h1 class="border border-l-8 border-black w-18 absolute right-0 top-7 px-56 text-gray-700" id="limite ">${time[1]} ${mounth[Number(time[1]) - 1]}</h1>
        </div>
        <h3 class="font-bold">${item.Titer}</h3>
        <p class="text-zinc-500 text-xs my-2">${item.description.slice(0, 5) + "..."} | <span>P${item.Priority}</span></p>
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
    document.getElementById("Title").value = task.Titer;
    document.getElementById("Priority").value = task.Priority;
    document.getElementById("Status").value = task.Status;
    document.getElementById("date_limite").value = task.date_limite;
  }
}


// function recherche
function recherche(value) {
  let recher = document.getElementById("recher")
  setdata = setdata.filter(filter => filter.Titer == recher.value);
  setDataInnerHtml();

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
  const TiterA = a.date_limite.toUpperCase();
  const titerB = b.date_limite.toUpperCase(); 
  
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


function openpop_updescription(id){
  document.getElementById('default-modal').classList.toggle('hidden');
  const taskk = setdata.find(taskk=> taskk.id === id)
  if(taskk){
    more_description.innerHTML=taskk.description;
  }
}