function select_formateur() {
  $.ajax({
    type: "GET",
    url: "http://localhost/php/manage_etablis/getSelect.php",
  }).done(function (data) {
    var result = $.parseJSON(data);
    let selform = document.getElementById("getformateur");
    for (const [key, value] of Object.entries(result)) {
      if (key == "formateur") {
        value.forEach((item) => {
          selform.innerHTML += `
                    <option value=${item.id_forma} >${item.nom} ${item.prenom}</option>`;
        });
      }
    }
  });
}

function getSelection_1() {
  $.ajax({
    type: "GET",
    url: "http://localhost/php/manage_etablis/getSelect.php",
  }).done(function (data) {
    var result = $.parseJSON(data);
    let selsalle = document.getElementById("selectsalle");
    let selgrp = document.getElementById("selectgrp");
    for (const [key, value] of Object.entries(result)) {
      if (key == "salle") {
        value.forEach((item) => {
          selsalle.innerHTML += `
                    <option value=${item.id_sa} >${item.slag} </option>`;
        });
      } else if (key == "groupe") {
        value.forEach((item) => {
          selgrp.innerHTML += `
                    <option value=${item.id_grp} >${item.nom_grp}</option>`;
        });
      }
    }
  });
  const day = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const selcday = document.getElementById("selectday");
  day.forEach((item) => {
    selcday.innerHTML += `
<option value=${item} >${item}</option>`;
  });
}

function check(d) {
  let formateur = document.getElementById("getformateur");
  if (formateur.selectedIndex == 0) {
    document.getElementById("err_add").innerHTML =
      "veuillez sélectionner un formateur";
  } else {
    if (d == "add") {
      addnew();
      document.getElementById("err_add").innerHTML = "";
    } else {
      affmodule();
      document.getElementById("err_add").innerHTML = "";
    }
  }
}
function addnew() {
  document.querySelector(".timetable").innerHTML = `
    <div class="col-span-1  " style="margin-left: 10%;">
    <h1 class="text-3xl line-through  font-bold text-center text-gray-800  lg:text-4xl">Add new time</h1>
        <input id="module" type="text"
            class="w-full mt-8 bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-blue-500"
            placeholder="Module">
            <div class="flex justify-between items-center mt-8">

        <label for="dateNis" class="font-bold mb-1 text-gray-700 block">Début des modules</label>
        <input id="start" type="text" value="08:30"
            class="w-full ml-4 bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-blue-500">
        <label for="dateEm" class="font-bold mb-1 text-gray-700 block">Fin du module</label>
        <input id="end" type="text" value="18:30"
            class="w-full ml-4 bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-blue-500">
            
            
            </div>
            <select  id="selectday"
            class="w-full mt-8 bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-blue-500 focus:outline-none appearance-none">
            <option disabled selected>choisit le jour </option>
        </select>
        <select  id="selectsalle"
            class="w-full mt-8 bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-blue-500 focus:outline-none appearance-none">
            <option disabled selected>Choisissez salle </option>
        </select>
        <select id="selectgrp"
            class="w-full mt-8 bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-blue-500 focus:outline-none appearance-none">
            <option disabled selected>Choisissez Groupe</option>
        </select>

        <div class="flex justify-between items-center mt-8">
        <button onclick="add_emptemps()" type="button"
        class="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
        Ajouter
    </button>
    <button onclick="getdata_timetable()" type="button"
        class="text-gray-900 w-full ml-4 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        annuler
    </button>
    </div>

    <p class="text-red-500 text-xs mt-2 italic text-center" id="err_time"></p>
    
    </div>`;
  getSelection_1();
}

function add_emptemps() {
  let groupe = document.getElementById("selectgrp");
  let formateur = document.getElementById("getformateur");
  let salle = document.getElementById("selectsalle");
  let module = document.getElementById("module");
  let start = document.getElementById("start");
  let end = document.getElementById("end");
  let day = document.getElementById("selectday");


  inpstart = parseFloat((start.value).replace(':','.'))
  inpend = parseFloat((end.value).replace(':','.'))

  if (
    module.value != "" &&
    start.value != "" &&
    end.value != "" &&
    groupe.selectedIndex != 0 &&
    salle.selectedIndex != 0 &&
    formateur.selectedIndex != 0 &&
    day.selectedIndex != 0 &&
    inpstart < inpend
  ) {
    $.ajax({
        type: "GET",
        url: `http://localhost/php/manage_etablis/getdata.php?type=time_table1&forma=${parseInt(
          formateur.value
        )}&day=${day.value}`,
      }).done(function (data4) {
        var result4 = JSON.parse(data4);
        if (result4.length>0) {
          result4.forEach((item) => {
            tempstart = parseFloat((item.time_start).replace(':','.'))
            tempend = parseFloat((item.time_end).replace(':','.'))
                if (tempstart<=inpstart && inpstart<tempend || tempstart<inpend && inpend<=tempend || result4.length > 1 ) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "the place is already taken !",
                      });
                }
                else{
                    document.getElementById("err_time").innerHTML = "";
                    $.ajax({
                      type: "POST",
                      url: "http://localhost/php/manage_etablis/add.php",
                      data: {
                        groupe: parseInt(groupe.value),
                        formateur: parseInt(formateur.value),
                        salle: parseInt(salle.value),
                        module: module.value,
                        day: day.value,
                        start: start.value,
                        end: end.value,
                        type: "emp_temp",
                      },
                      success: function () {
                        Swal.fire({
                          position: "top-end",
                          title: "a été ajouté",
                          showConfirmButton: false,
                          timer: 700,
                        });
                        getdata_timetable();
                      },
                      error: function (error) {
                        console.error(error);
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "Something went wrong!",
                        });
                      },
                    });
                }
            }
      )
        }else{
          console.log('ggggggggg')
          document.getElementById("err_time").innerHTML = "";
                    $.ajax({
                      type: "POST",
                      url: "http://localhost/php/manage_etablis/add.php",
                      data: {
                        groupe: parseInt(groupe.value),
                        formateur: parseInt(formateur.value),
                        salle: parseInt(salle.value),
                        module: module.value,
                        day: day.value,
                        start: start.value,
                        end: end.value,
                        type: "emp_temp",
                      },
                      success: function () {
                        Swal.fire({
                          position: "top-end",
                          title: "a été ajouté",
                          showConfirmButton: false,
                          timer: 700,
                        });
                        getdata_timetable();
                      },
                      error: function (error) {
                        console.error(error);
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "Something went wrong!",
                        });
                      },
                    });
        }

        })

    
  } else {
    document.getElementById("err_time").innerHTML = "veuillez saisir un groupe";
  }
}

function getdata_timetable() {
  let formateur = document.getElementById("getformateur").value;
  $.ajax({
    type: "GET",
    url: `http://localhost/php/manage_etablis/getdata.php?type=time_table&forma=${parseInt(
      formateur
    )}`,
  }).done(function (data) {
    var result = JSON.parse(data);
    var timetable = new Timetable();
    timetable.setScope(8, 19);
    timetable.addLocations([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]);
    result.forEach((item) => {
      timetable.addEvent(
        `${item.title} | salle: ${item.slag} | groupe : ${item.nom_grp} `,
        item.day,
        new Date(0000,0,00,item.time_start.slice(0, 2),item.time_start.slice(3, 5)),
        new Date(0000,0,00,item.time_end.slice(0, 2),item.time_end.slice(3, 5))
      );
    });
    var renderer = new Timetable.Renderer(timetable);
    renderer.draw(".timetable");
  });
}

function affmodule() {
  let formateur = document.getElementById("getformateur").value;
  var html = '';
  $.ajax({
    type: "GET",
    url: `http://localhost/php/manage_etablis/getdata.php?type=time_table&forma=${parseInt(
      formateur
    )}`,
  }).done(function (data) {
    var result = JSON.parse(data);
    result.forEach((item) => {
        html+=`
      <tbody class="text-gray-600 text-sm font-light">
        <tr class="border-b border-gray-200 hover:bg-gray-100">
          <td class="py-3 px-6 text-left whitespace-nowrap">
            <div class="flex items-center">
              <span class="font-medium">${item.title}</span>
            </div>
          </td>
          <td class="py-3 px-6 text-left whitespace-nowrap">
            <div class="flex items-center">
              <span class="font-medium">${item.day}</span>
            </div>
          </td>
          <td class="py-3 px-6 text-left whitespace-nowrap">
            <div class="flex items-center">
              <span class="font-medium">
                ${item.time_start}->${item.time_end}
              </span>
            </div>
          </td>
          <td class="py-3 px-6 text-center">
            <div class="flex item-center justify-center">
              <div
                onclick="delete_timetable(${item.id_time})"
                class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <div
                onclick="edit_field(${item.id_time},'${item.title}')"
                class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
            

              </div>
            </div>
          </td>
        </tr>
      </tbody>;
      `
    });
  });
  setTimeout(() => {
    Swal.fire({
        title: "Liste des étudiants",
        html: `
            <div class="bg-white shadow-md h-96 rounded my-6">
            <table class="min-w-max w-full table-auto">
                <thead>
            <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">module</th>
            <th class="py-3 px-6 text-left">day</th>
            <th class="py-3 px-6 text-left">time</th>
            <th class="py-3 px-6 text-center"></th>
        </tr>
    </thead>
    ${html}
    </table>
    </div>
    `,
        confirmButtonText: "Ok",
        focusConfirm: true,
      });
  }, 500);
}


function delete_timetable(id) {
  Swal.fire({
    title: 'Êtes-vous sûr?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimez-le!'
}).then((result) => {
    if (!result.dismiss) {
        $.ajax({
            type: "POST",
            url: "http://localhost/php/manage_etablis/delete.php",
            data: {
                id: id,
                type: "delete_timetable"
            },
            success: function () {
                Swal.fire({
                    position: 'top-end',
                    title: 'Étudiant supprimé',
                    showConfirmButton: false,
                    timer: 700
                })
                getdata_timetable();
                document.getElementById('edittimetable').click();
            },
            error: function (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
            }
        });

    }
})
}






function edit_field(id,module) {
  Swal.fire({
      title: 'Edit Module',
      html: `<input
      id="module_value"
      type="text"
      name="default"
      value="${module}"
      placeholder="Module"
      class="px-4  py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
    />
      `,
      confirmButtonText: 'Edit',
      focusConfirm: false,
      preConfirm: () => {
          const mod = Swal.getPopup().querySelector('#module_value').value
          if (mod=="") {
              Swal.showValidationMessage(`Please enter nom groupe`)
          }
          return {
            mod,
          }
      }
  }).then((result) => {
      $.ajax({
          type: "POST",
          url: "http://localhost/php/manage_etablis/edit.php",
          data: {
              mod: result.value.mod,
              id: id,
              type: "timetable"
          },
          success: function () {
              Swal.fire({
                  position: 'top-end',
                  title: 'Votre groupe a été modifiée',
                  showConfirmButton: false,
                  timer: 700
              })
              getdata_timetable();
              document.getElementById('edittimetable').click();
          },
          error: function (error) {
              console.error(error);
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                })
          }
      });

  })

}