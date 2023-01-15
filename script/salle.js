
function adddataSalle() {
    let sla = document.getElementById("slugSalle")
    let des = document.getElementById("desSalle")
    
    if (sla.value != "" && des.value != "" ) {
        document.getElementById('errsalle').innerHTML = ""
        $.ajax({
            type: "POST",
            url: "http://localhost/php/manage_etablis/add.php",
            data: {
                slag: sla.value,
                desc: des.value ,
                type: 'salle'
            },
            success: function () {
                sla.value = "";
                des.value = "";
                Swal.fire({
                    position: 'top-end',
                    title: 'Salle ajoutée',
                    showConfirmButton: false,
                    timer: 700
                })
                getdatasalle();
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
        document.getElementById('errsalle').innerHTML = "tous les champs sont obligatoire"
    }

}

function getdatasalle() {
    let table = document.getElementById("tableSalle")
    $.ajax({
        type: "GET",
        url: 'http://localhost/php/manage_etablis/getdata.php?type=salle'
    }).done(function (data) {
        var result = $.parseJSON(data);
        let tb = '';
        result.forEach(item => {
            tb += `
            <tr class="border-b border-gray-200 hover:bg-gray-100">
            <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                    <span class="font-medium">${item.id_sa}</span>
                </div>
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                    <span class="font-medium">${item.slag}</span>
                </div>
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                    <span class="font-medium">${item.description}</span>
                </div>
            </td>
            <td class="py-3 px-6 text-center">
                <div class="flex item-center justify-center">
                    <div onclick="editsalle(${item.id_sa},'${item.slag}','${item.description}')" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </div>
                    <div onclick="deletsale(${item.id_sa})" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
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


function deletsale(id) {
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
                    type: "delete_salle"
                },
                success: function () {
                    getdatasalle();
                    Swal.fire({
                        position: 'top-end',
                        title: 'Salle supprimé',
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



function editsalle(id, s , d) {
    Swal.fire({
        title: 'Edit information de Salle',
        html: `<input
        id="slag_edit"
        type="text"
        name="default"
        value="${s}"
        placeholder="Slug"
        class="px-4  py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
      /><input
      id="des_edit"
      type="text"
      name="default"
      value="${d}"
      placeholder="description"
      class="px-4  py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
    />
        `,
        confirmButtonText: 'Edit',
        focusConfirm: false,
        preConfirm: () => {
            const slag = Swal.getPopup().querySelector('#slag_edit').value
            const desc = Swal.getPopup().querySelector('#des_edit').value
            if (slag=="" || desc=="") {
                Swal.showValidationMessage(`Please enter slag et description salle`)
            }
            return {
                slag,
                desc
            }
        }
    }).then((result) => {
        $.ajax({
            type: "POST",
            url: "http://localhost/php/manage_etablis/edit.php",
            data: {
                slag: result.value.slag,
                desc: result.value.desc,
                id: id,
                type: "salle"
            },
            success: function () {
                Swal.fire({
                    position: 'top-end',
                    title: 'Votre salle a été modifiée',
                    showConfirmButton: false,
                    timer: 700
                })
                getdatasalle();
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