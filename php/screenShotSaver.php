<?php 
    //
    $payload = json_decode(file_get_contents("php://input"));
    if(!$payload){
        exit("No");
    }
    //
    $screenShot = $payload->screenShot;
    $name = $payload->name;
    //
    $cleenImg = str_replace("data:image/png;base64,","",urldecode($screenShot));
    //
    $decodedImg = base64_decode($cleenImg);
    //
    $savedImgName = "totalPurchase/screen_".$name."_".uniqid().".png";
    //
    file_put_contents($savedImgName, $decodedImg);
    //
    echo $savedImgName;
?>