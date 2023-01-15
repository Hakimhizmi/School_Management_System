


function adddata() {
    let filiere = document.getElementById("filiere")
    let niveau = document.getElementById("niveau_form")
    let fil = filiere.value
    let niv = niveau.value
    if (fil != "" && niveau.selectedIndex!=0){
        document.getElementById('errsection').innerHTML=""
        $.ajax({
            type: "POST",
            url: "http://localhost/php/manage_etablis/add.php",
            data: {
                fil: fil,
                niv: niv,
                type:'section'
            },
            success: function () {
                filiere.value = "";
                niveau.selectedIndex = 0;
                Swal.fire({
                    position: 'top-end',
                    title: 'Branche ajoutée',
                    showConfirmButton: false,
                    timer: 700
                })
                getdata();
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

    }else{
        document.getElementById('errsection').innerHTML="tous les champ sont obligatoire"
    }
   
}

function getdata() {
    let table = document.getElementById("table")
    $.ajax({
        type: "GET",
        url: 'http://localhost/php/manage_etablis/getdata.php?type=Section'
    }).done(function (data) {
        var result = $.parseJSON(data);
        let tb = '';
        result.forEach(item => {
            tb += `
                <tr>
                <td class="p-2">
                    <div class="font-medium text-gray-800">
                        ${item.filiere}
                    </div>
                </td>
                
                <td class="p-2">
                    <div class="text-left font-medium text-green-500">
                    ${item.niveau}
                    </div>
                </td>
                <td class="py-3 px-6 text-center">
                    <div class="flex item-center justify-center">
                        <a href="#"  class="text-blue-600 dark:text-blue-500 hover:underline" onclick="edit(${item.id},'${item.filiere}','${item.niveau}')">Éditer</a>
                        <a href="#"  class="text-blue-600 ml-5 dark:text-blue-500 hover:underline" onclick="remove(${item.id})">Retirer</a>
                    </div>
                </td>
            </tr>`

        })
        table.innerHTML = tb;
    })

}





function remove(id) {
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
                    id: id ,
                    type: "section"
                },
                success: function () {
                    getdata();
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



function edit(id, f, n) {
    Swal.fire({
        title: 'Edit Section',
        html: `<input
        id="filiere"
        type="text"
        name="default"
        value="${f}"
        placeholder="Filière"
        class="px-4  py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
        <select id="niveau_form" class="border mt-5 border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
          <option value="Technicien">Technicien</option>
          <option value="Qualification">Qualification</option>
          <option value="Spécialisation">Spécialisation</option>
        </select>`,
        confirmButtonText: 'Edit',
        focusConfirm: false,
        preConfirm: () => {
            const filie = Swal.getPopup().querySelector('#filiere').value
            const nivea = Swal.getPopup().querySelector('#niveau_form').value
            if (filie=="" || nivea=="") {
                Swal.showValidationMessage(`Please enter filiere and niveau_form`)
            }
            return {
                fil: filie,
                niv: nivea
            }
        }
    }).then((result) => {
        $.ajax({
            type: "POST",
            url: "http://localhost/php/manage_etablis/edit.php",
            data: {
                fil: result.value.fil,
                niv: result.value.niv,
                id: id ,
                type : "section"
            },
            success: function () {
                Swal.fire({
                    position: 'top-end',
                    title: 'Votre filière a été modifiée',
                    showConfirmButton: false,
                    timer: 700
                })
                getdata();
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