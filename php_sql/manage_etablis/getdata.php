<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, Authorization,X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, ADD");
header("Allow: GET, POST, OPTIONS, PUT, ADD");

$con = mysqli_connect("localhost","root","", "manage_etabb");

if ($_REQUEST['type']=="groupe") {
    $sql = "SELECT id_grp,nom_grp,filiere,niveau FROM groupe INNER JOIN section ON groupe.id = section.id ";
}
elseif($_REQUEST['type']=="Section"){
    $sql = "SELECT * FROM section";
}
elseif($_REQUEST['type']=="etudiant"){
    $sql = "SELECT id_et,nom,prenom,filiere,niveau,nom_grp FROM etudiants INNER JOIN section ON etudiants.id = section.id INNER JOIN groupe ON etudiants.id_grp=groupe.id_grp";
}
elseif($_REQUEST['type']=="salle"){
    $sql = "SELECT * FROM salle";
}
elseif($_REQUEST['type']=="formateur"){
    $sql = "SELECT * FROM formateur";
}
elseif($_REQUEST['type']=="time_table"){
    $formateur = $_REQUEST['forma'];
    $sql = "SELECT id_time,title,day,time_start,time_end,nom_grp,slag FROM timetable INNER JOIN salle ON timetable.id_sa = salle.id_sa INNER JOIN groupe ON timetable.id_grp=groupe.id_grp where id_forma = $formateur";
}elseif($_REQUEST['type']=="time_table1"){
    $formateur = $_REQUEST['forma'];
    $day = $_REQUEST['day'];
    $sql = "SELECT id_time,title,day,time_start,time_end,nom_grp,slag FROM timetable INNER JOIN salle ON timetable.id_sa = salle.id_sa INNER JOIN groupe ON timetable.id_grp=groupe.id_grp where id_forma = $formateur  and day = '$day'";
}



$result = mysqli_query($con,$sql);

$result_array = array();


while($row = mysqli_fetch_assoc($result)) {
    array_push($result_array, $row);
}


echo json_encode($result_array);


?>