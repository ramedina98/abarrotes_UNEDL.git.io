<!--here we gonna get the information 
from the form and make an email confirmation...-->
<?php
require __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
// Buyer's data...
$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$correo = $_POST['correo'];
$cel = $_POST['phone'];

// Email data...
$destinatario = $correo;
$asunto = 'Compra realizada en Abarrotes UNEDL';
$cuerpo = '<p>Hello,</p>';

// Hostinger configuration
$smtpHost = 'smtp.hostinger.com';  // Reemplaza con el servidor SMTP de Hostinger.
$smtpPort = 465;  // Puerto SMTP de Hostinger (465 en este caso).
$smtpUser = $_ENV['CORREO']; // Dirección de correo no-reply en tu dominio de Hostinger.
$smtpPassword = $_ENV['PASSWORD']; // Contraseña de tu cuenta de correo en tu dominio de Hostinger.

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: tienda_unedl@abarrotesuniversidad.shop\r\n";  // Dirección de correo no-reply en tu dominio de Hostinger.

// Configuración para Hostinger
ini_set('SMTP', $smtpHost);
ini_set('smtp_port', $smtpPort);
ini_set('sendmail_from', $smtpUser);

// Envío del correo
$mailSent = mail($destinatario, $asunto, $cuerpo, $headers);

if ($mailSent) {
    echo '
        <html>
        <head>
            <title>Abarrotes UNEDL || Envío exitoso</title>
            <!-- Icono -->
            <link rel="icon" href="image/logo.ico">
            <!-- CSS -->
            <link rel="stylesheet" href="successfuly.css">
            <link rel="stylesheet" href="responsive.css">
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
    echo '<meta http-equiv="refresh" content="5;url=index.html">';
} else {
    echo '
        <html>
            <head>
                <title>Abarrotes UNEDL || Error</title>
                <!-- Icono -->
                <link rel="icon" href="image/logo.ico">
                <!-- CSS -->
                <link rel="stylesheet" href="successfuly.css">
                <link rel="stylesheet" href="responsive.css">
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
    echo '<meta http-equiv="refresh" content="5;url=index.html">';
}
?>