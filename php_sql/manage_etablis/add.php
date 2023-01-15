<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, Authorization,X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, ADD");
header("Allow: GET, POST, OPTIONS, PUT, ADD");


$con = mysqli_connect("localhost","root","", "manage_etabb");
echo $_POST['type'] ;
if ($_POST['type']=="groupe") {
    $grp = $_POST['grp'];
    $id = $_POST['fili'];
    $sql = "INSERT INTO groupe (nom_grp,id)
    VALUES ('$grp',$id)";
}
elseif($_POST['type']=="section"){
    $fil = $_POST['fil'];
    $niv = $_POST['niv'];
    $sql = "INSERT INTO section (filiere,niveau)
    VALUES ('$fil', '$niv' )";
}
elseif($_POST['type']=="etudiant"){
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $filiere = $_POST['filiere'];
    $groupe = $_POST['groupe'];
    $filedata = addslashes(file_get_contents($_FILES['image']["tmp_name"]));
    $sql = "INSERT INTO etudiants (nom,prenom,img_et,id,id_grp)
    VALUES ('$nom', '$prenom','$filedata',$filiere,$groupe)";
}
elseif($_POST['type']=="salle"){
    $slag = $_POST['slag'];
    $desc = $_POST['desc'];
    $sql = "INSERT INTO salle (slag,description)
    VALUES ('$slag', '$desc' )";
}
elseif($_POST['type']=="formateur"){
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $date_niss = $_POST['date_nis'];
    $date_Em = $_POST['date_Em'];
    $matricule = $_POST['matricule'];
    $sql = "INSERT INTO formateur (matricule,nom,prenom,date_nis,date_Em) 
    VALUES ($matricule, '$nom', '$prenom', '$date_niss', '$date_Em')";
}
elseif($_POST['type']=="emp_temp"){
    $module = $_POST['module'];
    $day = $_POST['day'];
    $start = $_POST['start'];
    $end = $_POST['end'];
    $groupe = $_POST['groupe'];
    $formateur = $_POST['formateur'];
    $salle = $_POST['salle'];
    $sql = "INSERT INTO timetable (title,day,time_start,time_end,id_forma,id_grp,id_sa) 
    VALUES ('$module','$day','$start', '$end',$formateur,$groupe,$salle)";
}




mysqli_query($con, $sql);

mysqli_close($con);


?>