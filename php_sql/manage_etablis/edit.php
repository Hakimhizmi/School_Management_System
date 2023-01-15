<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, Authorization,X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, ADD");
header("Allow: GET, POST, OPTIONS, PUT, ADD");


$con = mysqli_connect("localhost","root","", "manage_etabb");

echo $_POST['type'] ;
if($_POST['type']=="section") {
    $fil = $_POST['fil'];
    $niv = $_POST['niv'];
    $id = $_POST['id'] ;
    $sql = "UPDATE section SET filiere='$fil' , niveau='$niv'  WHERE id=$id";
}
elseif($_POST['type']=="groupe"){
    $grp = $_POST['grp'];
    $id = $_POST['id'] ;
    $sql = "UPDATE groupe SET nom_grp='$grp' WHERE id_grp=$id";
}
elseif($_POST['type']=="etudiant"){
    $nm = $_POST['nm'];
    $pr = $_POST['pr'];
    $id = $_POST['id'] ;
    $sql = "UPDATE etudiants SET nom='$nm',prenom='$pr' WHERE id_et=$id";
}
elseif($_POST['type']=="salle"){
    $slag = $_POST['slag'];
    $desc = $_POST['desc'];
    $id = $_POST['id'] ;
    $sql = "UPDATE salle SET slag='$slag',description='$desc' WHERE id_sa=$id";
}
elseif($_POST['type']=="formateur"){
    $nom = $_POST['nm'];
    $prenom = $_POST['pr'];
    $mat = $_POST['mat'];
    $dateNiss = $_POST['dateNiss'];
    $dateEm = $_POST['dateEm'];
    $id = $_POST['id'] ;
    $sql = "UPDATE formateur SET matricule=$mat,nom='$nom',prenom='$prenom',date_nis='$dateNiss',date_Em='$dateEm' WHERE id_Forma=$id";
}
elseif($_POST['type']=="timetable"){
    $module = $_POST['mod'];
    $id = $_POST['id'] ;
    $sql = "UPDATE timetable SET title='$module' WHERE id_time=$id";
}










mysqli_query($con, $sql);

mysqli_close($con);


?>