


function getSelection(){
    $.ajax({
        type: "GET",
        url: 'http://localhost/php/manage_etablis/getSelect.php'
    }).done(function (data) {
        var result = $.parseJSON(data);
        let selfil = document.getElementById("selfil");
        let selgrp = document.getElementById("selgrp");
        for (const [key, value] of Object.entries(result)) {
            if (key=="section") {
                value.forEach(item => {
                    selfil.innerHTML += `
                    <option value=${item.id} >${item.filiere}-${item.niveau} </option>`
                })
            }else if(key=="groupe"){
                value.forEach(item => {
                    selgrp.innerHTML += `
                    <option value=${item.id_grp} >${item.nom_grp}</option>`
                })
            }
        }
        
        })

}


function addEtudiant() {
    let nom = document.getElementById("nom")
    let prenom = document.getElementById("prenom")
    let filiere = document.getElementById("selfil")
    let groupe = document.getElementById("selgrp")
    var fileInput = document.getElementById('fileimg');

    var formData = new FormData();
	formData.append("image", fileInput.files[0]);
    formData.append("nom", nom.value);
    formData.append("prenom", prenom.value);
    formData.append("filiere", parseInt(filiere.value));
    formData.append("groupe", parseInt(groupe.value));
    formData.append("type","etudiant");
    
    

    if (nom.value!=""&&prenom.value!=""&&filiere.selectedIndex!=0&&groupe.selectedIndex!=0&&fileInput.value != "") {
        document.getElementById('erretudiant').innerHTML=""
        $.ajax({
            type: "POST",
            url: "http://localhost/php/manage_etablis/add.php",
            data: formData,
            cache:false,
            contentType: false,
            processData: false,
            success: function () {
                nom.value=prenom.value=""
                filiere.selectedIndex=groupe.selectedIndex=0
                var image = document.getElementById('output')
                image.src = "https://cdn.pixabay.com/photo/2016/04/22/04/57/graduation-1345143__340.png"
                fileInput.value = ""
                Swal.fire({
                    position: 'top-end',
                    title: 'Etudiant ajoutée',
                    showConfirmButton: false,
                    timer: 700
                })
                getdataEtu();
                
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
        document.getElementById('erretudiant').innerHTML="tous les champ sont obligatoire"
    }
    
}


function getdataEtu() {
    let table = document.getElementById("tableEtudiant")
    let tb = '';
    $.ajax({
        type: "GET",
        url: 'http://localhost/php/manage_etablis/getdata.php?type=etudiant'
    }).done(function (data) {
        console.log(data)
        var result = JSON.parse(data);
        
        result.forEach(item => {
            $.ajax({
                type: "GET",
                url: `http://localhost/php/manage_etablis/getimage.php?id=${item.id_et}&type=etudiant`
            }).done(function (data1) { 
                tb += `
                <tr class="border-b border-gray-200 hover:bg-gray-100">
                <td class="py-3 px-6 text-left">
                    <div class="flex items-center">
                        <div class="mr-2">
                            <img class="w-6 h-6 rounded-full" src="data:image/png;base64,${data1}" />
                        </div>
                        <span>${item.nom} ${item.prenom}</span>
                    </div>
                </td>
                <td class="py-3 px-6 text-left">
                    <div class="flex items-center">
                        <span>${item.filiere}s</span>
                    </div>
                </td>
                <td class="py-3 px-6 text-left">
                    <div class="flex items-center">
                        <span>${item.niveau}</span>
                    </div>
                </td>
                <td class="py-3 px-6 text-left">
                    <div class="flex items-center">
                        <span>${item.nom_grp}</span>
                    </div>
                </td>
                <td class="py-3 px-6 text-center">
                    <div class="flex item-center justify-center">
                        <div onclick="edit_etudiant(${item.id_et},'${item.nom}','${item.prenom}')" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                        <div onclick="remove_etudiant(${item.id_et})" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
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
            
        })
        
        
        
    })
    setTimeout(() => {
        table.innerHTML=tb  
    }, 500);

}




function remove_etudiant(id) {
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
                    type: "etudiant"
                },
                success: function () {
                    getdataEtu();
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


function edit_etudiant(id,n,p) {
    Swal.fire({
        title: 'Edit Section',
        html: `<input id="nom_edit" type="text" value="${n}"
        class="w-full bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-blue-500"
        placeholder="Nom">
    <input id="prenom_edit" type="text" value="${p}"
        class="w-full mt-5 bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-blue-500"
        placeholder="Prenom">
        `,
        confirmButtonText: 'Edit',
        focusConfirm: false,
        preConfirm: () => {
            const nm = Swal.getPopup().querySelector('#nom_edit').value
            const pr = Swal.getPopup().querySelector('#prenom_edit').value
            if (nm==""||pr=="") {
                Swal.showValidationMessage(`Please enter nom groupe`)
            }
            return {
                nm: nm,
                pr: pr
            }
        }
    }).then((result) => {
        $.ajax({
            type: "POST",
            url: "http://localhost/php/manage_etablis/edit.php",
            data: {
                nm: result.value.nm,
                pr: result.value.pr,
                id: id ,
                type : "etudiant"
            },
            success: function () {
                Swal.fire({
                    position: 'top-end',
                    title: 'Les informations sur létudiant ont été modifiées',
                    showConfirmButton: false,
                    timer: 700
                })
                getdataEtu()
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