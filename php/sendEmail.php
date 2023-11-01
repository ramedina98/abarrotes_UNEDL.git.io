<!--here we gonna get the information 
from the form and make an email confirmation...-->
<?php
require __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

include('generatePDF.php');

// Buyer's data...
$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$correo = $_POST['correo'];
$cel = $_POST['phone'];
$calle = $_POST['calle'];
$num = $_POST['numero'];
$colonia = $_POST['colonia'];
$cp = $_POST['CP'];
$estado = $_POST['stado'];
$ciudad = $_POST['ciudad'];

// Create the array that will send the info to the function that will create the PDF...
$data = array(
    'nombre' => $nombre,
    'apellidos' => $apellidos,
    'estado' => $estado,
    'ciudad' => $ciudad,
    'calle' => $calle,
    'num' => $num,
    'cp' => $cp
);

// Call the function to generate the PDF...
$pdf = purchaseReceiptGenerator($data);

// Email data...
$destinatario = $correo;
$asunto = 'Compra realizada en Abarrotes UNEDL';

// HTML body of the email...
$cuerpo = '
<!DOCTYPE html>
<html>
<head>
    <title>Abarrotes UNEDL</title>
</head>
<body>
    <h1>Confirmación de envío</h1>
    <p>Estimado/a ' . $nombre . ' ' . $apellidos . ',</p>
    <p>Gracias por tu compra en Abarrotes UNEDL. Valoramos tu preferencia y confianza en nosotros.</p>
    <p>Tu pedido ha sido procesado y está en camino a la siguiente dirección:</p>
    <p>' . $calle . ' ' . $num . '<br>' . $colonia . '<br>' . $cp . '<br>' . $estado . ', ' . $ciudad . '</p>
    <p>Te notificaremos una vez que tu pedido haya sido entregado en la brevedad posible.</p>
    <p>Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactarnos.</p>
    <p>Gracias nuevamente por elegir Abarrotes UNEDL.</p>
    <p>Atentamente,</p>
    <p>Tu equipo de Abarrotes UNEDL</p>
</body>
</html>
';

// Hostinger configuration
$smtpHost = 'smtp.hostinger.com';
$smtpPort = 465;
$smtpUser = $_ENV['CORREO'];
$smtpPassword = $_ENV['PASSWORD'];

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"separador_email\"\r\n";
$headers .= "From: tienda_unedl@abarrotesuniversidad.shop\r\n";

// SMTP configuration for Hostinger
ini_set('SMTP', $smtpHost);
ini_set('smtp_port', $smtpPort);
ini_set('sendmail_from', $smtpUser);

// Prepare email content with attached PDF
$mensaje = "\r\n";
$mensaje .= "Content-Type: text/html; charset=UTF-8\r\n";
$mensaje .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$mensaje .= $cuerpo . "\r\n";

$mensaje .= "\r\n";
$mensaje .= "Content-Type: application/pdf; name=\"comprobante.pdf\"\r\n";
$mensaje .= "Content-Disposition: attachment; filename=\"comprobante.pdf\"\r\n";
$mensaje .= "Content-Transfer-Encoding: base64\r\n\r\n";
$mensaje .= chunk_split(base64_encode($pdf)) . "\r\n";

$mensaje .= "\r\n";

// Send the email
$mailSent = mail($destinatario, $asunto, $mensaje, $headers);

if ($mailSent) {
    echo '
        <html>
        <head>
            <title>Abarrotes UNEDL || Envío exitoso</title>
            <!-- Icono -->
            <link rel="icon" href="../image/logo.ico">
            <!-- CSS -->
            <link rel="stylesheet" href="../style/successfuly.css">
            <link rel="stylesheet" href="../style/responsive.css">
        </head>
        <body>
            <section>
                <div class="title_cont">
                    <h1>Envío exitoso</h1>
                </div>
                <div class="informacion">
                    <p>
                        ¡Gracias por su compra <span>' . $nombre . ' ' . $apellidos . '</span>! Su correo de confirmación ha sido enviado con éxito.
                        Su paquete estará en camino y llegará en unas horas. 
                        Valoramos su preferencia y agradecemos su confianza en Abarrotes UNEDL.
                    </p>
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            </section>
        </body>
    </html>
    ';
    echo '<meta http-equiv="refresh" content="5;url=../index.html">';
} else {
    echo '
        <html>
            <head>
                <title>Abarrotes UNEDL || Error</title>
                <!-- Icono -->
                <link rel="icon" href="../image/logo.ico">
                <!-- CSS -->
                <link rel="stylesheet" href="../style/successfuly.css">
                <link rel="stylesheet" href="../style/responsive.css">
            </head>
            <body>
                <section>
                    <div class "title_cont">
                        <h1>Error al enviar el correo</h1>
                    </div>
                    <div class="informacion">
                        <p>
                            Lamentablemente hubo un error al 
                            momento de mandar el correo de confirmación,
                            lamentamos los inconvenientes, pero tenga por seguro,
                            <span>' . $nombre . ' ' . $apellidos . '</span>, que su paquete va en camino.
                        </p>
                        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                </section>
            </body>
        </html>
    ';
    echo '<meta http-equiv="refresh" content="5;url=../index.html">';
}
?>