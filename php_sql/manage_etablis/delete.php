<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, Authorization,X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, ADD");
header("Allow: GET, POST, OPTIONS, PUT, ADD");

$id = $_POST['id'];
$con = mysqli_connect("localhost","root","", "manage_etabb");


if ($_POST['type']=="groupe") {
    $sql = "DELETE FROM groupe WHERE id_grp=$id";
}
elseif($_POST['type']=="section"){
    $sql = "DELETE FROM section WHERE id=$id";
}
elseif($_POST['type']=="etudiant"){
    $sql = "DELETE FROM etudiants WHERE id_et=$id";
}
elseif ($_POST['type']=="dele_etudiant") {
    $sql = "DELETE FROM etudiants WHERE id_et=$id";
}
elseif ($_POST['type']=="delete_salle") {
    $sql = "DELETE FROM salle WHERE id_sa=$id";
}
elseif ($_POST['type']=="formateur") {
    $sql = "DELETE FROM formateur WHERE id_forma=$id";
}
elseif ($_POST['type']=="delete_timetable") {
    $sql = "DELETE FROM timetable WHERE id_time=$id";
}










mysqli_query($con, $sql);

mysqli_close($con);


?>