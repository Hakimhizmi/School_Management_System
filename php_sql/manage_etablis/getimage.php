<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, Authorization,X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, ADD");
header("Allow: GET, POST, OPTIONS, PUT, ADD");
$con = mysqli_connect("localhost","root","", "manage_etabb");

$id = $_REQUEST['id'];
$type = $_REQUEST['type'];

if ($type == 'etudiant') {
    $sql1 = "SELECT img_et FROM etudiants where id_et=$id";
    $result1 = mysqli_query($con,$sql1);
    $image = mysqli_fetch_assoc($result1);
    echo base64_encode($image['img_et']);
}



?>