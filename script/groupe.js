function getSelectfilier(){
    $.ajax({
        type: "GET",
        url: 'http://localhost/php/manage_etablis/getSelect.php'
    }).done(function (data) {
        var result = $.parseJSON(data);
        let selfil = document.getElementById("selfilier");
        for (const [key, value] of Object.entries(result)) {
            if (key=="section") {
                value.forEach(item => {
                    selfil.innerHTML += `
                    <option value=${item.id} >${item.filiere}-${item.niveau} </option>`
                })
            }
        }
        })

}




function adddatagrp() {
    let groupe = document.getElementById("groupe")
    let filiere = document.getElementById("selfilier")
    let grp = groupe.value
    let fili = filiere.value
    if (grp != "" && filiere.selectedIndex!=0) {
        document.getElementById('err').innerHTML = ""
        $.ajax({
            type: "POST",
            url: "http://localhost/php/manage_etablis/add.php",
            data: {
                grp,
                fili,
                type: 'groupe'
            },
            success: function () {
                groupe.value = "";
                Swal.fire({
                    position: 'top-end',
                    title: 'Groupe ajoutée',
                    showConfirmButton: false,
                    timer: 700
                })
                getdatagrp();
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
    } else {
        document.getElementById('err').innerHTML = "veuillez saisir un groupe"
    }

}


function getdatagrp() {
    let table = document.getElementById("tablegrp")
    $.ajax({
        type: "GET",
        url: 'http://localhost/php/manage_etablis/getdata.php?type=groupe'
    }).done(function (data) {
        var result = $.parseJSON(data);
        let tb = '';
        result.forEach(item => {
            tb += `
            <tr class="border-b border-gray-200 hover:bg-gray-100">
            <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                    <span class="font-medium">${item.nom_grp}</span>
                </div>
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
            <div class="flex items-center">
                    <span class="font-medium">${item.filiere} ${item.niveau}</span>
                </div></td>
            <td class="py-3 px-6 text-center">
                <div class="flex item-center justify-center">
                    <div onclick="afficheElive(${item.id_grp})" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                    <div onclick="editgrp(${item.id_grp},'${item.nom_grp}')" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </div>
                    <div onclick="remove_grp(${item.id_grp})" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                </div>
            </td>
        </tr>`
        })
        table.innerHTML = tb;
    })

}

function deletu(id) {
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
                    type: "dele_etudiant"
                },
                success: function () {
                    Swal.fire({
                        position: 'top-end',
                        title: 'Étudiant supprimé',
                        showConfirmButton: false,
                        timer: 700
                    })
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


function afficheElive(id) {
    let html = ''
    function geteted() {
        $.ajax({
            type: "GET",
            url: `http://localhost/php/manage_etablis/geteleve.php?id=${id}`
        }).done(function (data) {
            var result = $.parseJSON(data);
            result.forEach(item => {
                html += `
        <tbody class="text-gray-600 text-sm font-light">
            <tr class="border-b border-gray-200 hover:bg-gray-100">
                <td class="py-3 px-6 text-left whitespace-nowrap">
                    <div class="flex items-center">
                        <span class="font-medium">${item.nom} ${item.prenom}</span>
                    </div>
                </td>
                <td class="py-3 px-6 text-center">
                    <div class="flex item-center justify-center">
                        <div onclick="deletu(${item.id_et})" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                    </div>
                </td>
            </tr>`
            })
    
        })
    }
    
    geteted();
    setTimeout(() => {
        Swal.fire({
            title: 'Liste des étudiants',
            html: `
            <div class="bg-white shadow-md h-96 rounded my-6 ">
            <table class="min-w-max w-full table-auto">
                <thead>
                <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">Etudiant</th>
            <th class="py-3 px-6 text-center"></th>
        </tr>
    </thead>
                    ${html}
                </tbody>
            </table>
        </div>
        `,
            confirmButtonText: 'Ok',
            focusConfirm: true,
        })
    }, 200);

}

function remove_grp(id) {
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
                    type: "groupe"
                },
                success: function () {
                    getdatagrp();
                    Swal.fire({
                        position: 'top-end',
                        title: 'Cette branche a été supprimée',
                        showConfirmButton: false,
                        timer: 700
                    })
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





function editgrp(id, f) {
    Swal.fire({
        title: 'Edit Section',
        html: `<input
        id="grp"
        type="text"
        name="default"
        value="${f}"
        placeholder="Filière"
        class="px-4  py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
        `,
        confirmButtonText: 'Edit',
        focusConfirm: false,
        preConfirm: () => {
            const grp = Swal.getPopup().querySelector('#grp').value
            if (grp=="") {
                Swal.showValidationMessage(`Please enter nom groupe`)
            }
            return {
                grp: grp,
            }
        }
    }).then((result) => {
        $.ajax({
            type: "POST",
            url: "http://localhost/php/manage_etablis/edit.php",
            data: {
                grp: result.value.grp,
                id: id,
                type: "groupe"
            },
            success: function () {
                Swal.fire({
                    position: 'top-end',
                    title: 'Votre groupe a été modifiée',
                    showConfirmButton: false,
                    timer: 700
                })
                getdatagrp();
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