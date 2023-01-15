<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, Authorization,X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, ADD");
header("Allow: GET, POST, OPTIONS, PUT, ADD");

$con = mysqli_connect("localhost","root","", "manage_etabb");
$id=$_REQUEST['id'];
$sql = "SELECT id_et,nom,prenom from etudiants where id_grp=$id";

$result = mysqli_query($con,$sql);

$result_array = array();


while($row = mysqli_fetch_assoc($result)) {
    array_push($result_array, $row);
}


echo json_encode($result_array);
?>