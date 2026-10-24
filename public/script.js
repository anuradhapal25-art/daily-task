async function addTask() {

  const studentName =
    document.getElementById("studentName").value;

  const title =
    document.getElementById("title").value;

  const date =
    document.getElementById("date").value;

  const year =
    document.getElementById("year").value;


  if (studentName === "" || title === "") {

    alert("Please enter student name and goal");

    return;
  }


  await fetch("/tasks", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({

      studentName: studentName,

      title: title,

      date: date,

      year: year

    })

  });


  document.getElementById("studentName").value = "";

  document.getElementById("title").value = "";

  document.getElementById("date").value = "";

  document.getElementById("year").value = "";


  showTasks();
}



async function showTasks() {

  const response = await fetch("/tasks");

  const tasks = await response.json();


  const taskList =
    document.getElementById("taskList");


  taskList.innerHTML = "";


  tasks.forEach(function(task) {

    let button = "";


    if (task.status === "pending") {

      button = `
        <button
          class="complete-btn"
          onclick="completeTask('${task._id}')"
        >
          Complete Goal
        </button>
      `;

    } else {

      button = `
        <p class="completed-text">
          Completed ✅
        </p>
      `;

    }


    taskList.innerHTML += `

      <div class="task">

        <div class="task-info">

          <h3>${task.title}</h3>

          <p>
            Student: ${task.studentName}
          </p>

          <p>
            Status: ${task.status}
          </p>

          <p>
            Date: ${task.date}
          </p>

          <p>
            Year: ${task.year}
          </p>


          ${
            task.status === "completed"
            ? `<p>
                Reflection: ${task.reflection}
               </p>`
            : ""
          }

        </div>


        <div>

          ${button}


          <button
            class="delete-btn"
            onclick="deleteTask('${task._id}')"
          >
            Delete
          </button>

        </div>

      </div>

    `;

  });

}



// Complete goal

async function completeTask(id) {

  const reflection = prompt(
    "Write your reflection for this goal:"
  );


  if (reflection === null) {

    return;

  }


  if (reflection.trim() === "") {

    alert("Please write a reflection");

    return;

  }


  await fetch("/tasks/" + id, {

    method: "PUT",

    headers: {

      "Content-Type": "application/json"

    },

    body: JSON.stringify({

      reflection: reflection

    })

  });


  showTasks();

}



// Delete goal

async function deleteTask(id) {

  await fetch("/tasks/" + id, {

    method: "DELETE"

  });


  showTasks();

}


showTasks();