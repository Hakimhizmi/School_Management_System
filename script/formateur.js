function GetTableFromExcel(data) {
    var workbook = XLSX.read(data, {
        type: 'binary'
    });
    var Sheet = workbook.SheetNames[0];
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
    excelRows.forEach(item =>{
        $.ajax({
            type: "POST",
            url: "http://localhost/php/manage_etablis/add.php",
            data: {
                nom: item.nom,
                prenom: item.prenom,
                matricule: item.matricule,
                date_nis: item.date_naissance,
                date_Em: item.date_embauche,
                type: 'formateur'
            },
            success: function () {
                document.getElementById('file_input').value = ""
                Swal.fire({
                    position: 'top-end',
                    title: 'list des formateur ajoutée',
                    showConfirmButton: false,
                    timer: 700
                })
                getFormateur();

            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error(xhr.responseText
                    );
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
                  
            }
        });
    })
};


function addFormateur() {
    var fileUpload = document.getElementById('file_input')
    if (fileUpload.files[0] != undefined) {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        GetTableFromExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                }
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Veuillez télécharger un fichier Excel valide.!',
              })
        }
    } else {
        let nom = document.getElementById("nom_for")
        let prenom = document.getElementById("prenom_form")
        let matricule = document.getElementById("matr")
        let date_nis = document.getElementById("dateNis")
        let date_Em = document.getElementById('dateEm')
        if (nom.value != "" && prenom.value != "" && matricule.value != "" && date_nis.value != "" && date_Em.value != "") {
            document.getElementById('errforma').innerHTML = ""
            $.ajax({
                type: "POST",
                url: "http://localhost/php/manage_etablis/add.php",
                data: {
                    nom: nom.value,
                    prenom: prenom.value,
                    matricule: parseInt(matricule.value),
                    date_nis: date_nis.value,
                    date_Em: date_Em.value,
                    type: 'formateur'
                },
                success: function () {
                    nom.value = prenom.value = date_Em.value = date_nis.value = matricule.value = "";
                    Swal.fire({
                        position: 'top-end',
                        title: 'formateur ajoutée',
                        showConfirmButton: false,
                        timer: 700
                    })
                    getFormateur();

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
            document.getElementById('errforma').innerHTML = "tous les champs sont obligatoire"
        }

    }

}





function getFormateur() {
    let table = document.getElementById("tableformateur")
    let tb = '';
    $.ajax({
        type: "GET",
        url: 'http://localhost/php/manage_etablis/getdata.php?type=formateur'
    }).done(function (data) {
        var result = JSON.parse(data);
        result.forEach(item => {
            tb += `
                <tr class="border-b border-gray-200 hover:bg-gray-100">
                <td class="py-3 px-6 text-left">
                    <div class="flex items-center">
                        <span>${item.matricule}</span>
                    </div>
                </td>
                <td class="py-3 px-6 text-left">
                    <div class="flex items-center">
                        <span>${item.nom}</span>
                    </div>
                </td>
                <td class="py-3 px-6 text-left">
                    <div class="flex items-center">
                        <span>${item.prenom}</span>
                    </div>
                </td>
                <td class="py-3 px-6 text-left">
                    <div class="flex items-center">
                        <span>${item.date_nis}</span>
                    </div>
                </td>
                <td class="py-3 px-6 text-left">
                    <div class="flex items-center">
                        <span>${item.date_Em}</span>
                    </div>
                </td>
                <td class="py-3 px-6 text-center">
                    <div class="flex item-center justify-center">
                        <div onclick="edit_formateur(${item.id_forma},'${item.nom}','${item.prenom}',${item.matricule},'${item.date_nis}','${item.date_Em}')" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                        <div onclick="remove_formateur(${item.id_forma})" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                    </div>
                </td>
            </tr>
                `
        })
        table.innerHTML = tb
    })


}






function remove_formateur(id) {
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
                    type: "formateur"
                },
                success: function () {
                    Swal.fire({
                        position: 'top-end',
                        title: 'Formateur est supprimé',
                        showConfirmButton: false,
                        timer: 700
                    })
                    getFormateur();
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


function edit_formateur(id, n, p, m, dn, de) {
    Swal.fire({
        title: 'Edit Formateur',
        html: `<div class="flex justify-between items-center">
        <input id="nom_edit" required type="text" value="${n}"
            class="w-full bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-blue-500"
            placeholder="Nom">
        <input id="prenom_edit" required type="text" value="${p}"
            class="w-full bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-blue-500"
            placeholder="Prenom">
        <input id="matr_edit" type="number" required type="text" value="${m}"
            class="w-full bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-blue-500"
            placeholder="matricule ">
    </div>
    <div class="flex justify-between items-center mt-2">
        <label for="dateNis" class="font-bold mb-1 text-gray-700 block">Date Nissance</label>
        <input id="dateNis_edit" type="date" required type="text" value="${dn}"
            class="w-full ml-4 bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-blue-500">
    </div><div class="flex justify-between items-center mt-2">
    <label for="dateEm" class="font-bold mb-1 text-gray-700 block">Date Embauche</label>
    <input id="dateEm_edit" type="date" required type="text" value="${de}"
        class="w-full ml-4 bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-blue-500"></div>
        `,
        confirmButtonText: 'Edit',
        focusConfirm: false,
        preConfirm: () => {
            const nm = Swal.getPopup().querySelector('#nom_edit').value
            const pr = Swal.getPopup().querySelector('#prenom_edit').value
            const mat = Swal.getPopup().querySelector('#matr_edit').value
            const dateNiss = Swal.getPopup().querySelector('#dateNis_edit').value
            const dateEm = Swal.getPopup().querySelector('#dateEm_edit').value

            console.log(mat)
            if (nm == "" || pr == "" || mat == "" || dateEm == "" || dateNiss == "") {
                Swal.showValidationMessage(`Please enter nom groupe`)
            }
            return {
                nm,
                pr,
                mat,
                dateNiss,
                dateEm,
            }
        }
    }).then((result) => {
        $.ajax({
            type: "POST",
            url: "http://localhost/php/manage_etablis/edit.php",
            data: {
                nm: result.value.nm,
                pr: result.value.pr,
                mat: result.value.mat,
                dateNiss: result.value.dateNiss,
                dateEm: result.value.dateEm,
                id: id,
                type: "formateur"
            },
            success: function () {
                Swal.fire({
                    position: 'top-end',
                    title: 'Les informations de Formateur ont été modifiées',
                    showConfirmButton: false,
                    timer: 700
                })
                getFormateur();
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