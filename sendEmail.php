<!--here we gonna get the information 
from the form and make an email confirmation...-->
<?php
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
    $smtpHost = 'smtp.yourhostingerdomain.com';  // Replace with the Hostinger SMTP server.
    $smtpPort = 587;  // Hostinger SMTP port (may vary, check the settings).
    $smtpUser = 'noreply@yourhostingerdomain.com'; // no-reply email address in your Hostinger domain.
    $smtpPassword = 'yourpassword'; // Password for your email account in your Hostinger domain.

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: no-reply@yourhostingerdomain.com\r\n";  // no-reply email address in your Hostinger domain.

    // Configuration for Hostinger
    ini_set('SMTP', $smtpHost);
    ini_set('smtp_port', $smtpPort);
    ini_set('sendmail_from', $smtpUser);

    // Sending the email
    $mailSent = mail($destinatario, $asunto, $cuerpo, $headers);

    if ($mailSent) {
        echo '
            <html>
            <head>
                <title>Abarrotes UNEDL || Envio existoso</title>
                <!--icon-->
                <link rel="icon" href="image/logo.ico">
                <!--css-->
                <link rel="stylesheet" href="successfuly.css">
                <link rel="stylesheet" href="responsive.css">
            </head>
            <body>
                <section>
                    <div class="title_cont">
                        <h1>Envio exitoso</h1>
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
                    <!--icon-->
                    <link rel="icon" href="image/logo.ico">
                    <!--css-->
                    <link rel="stylesheet" href="successfuly.css">
                    <link rel="stylesheet" href="responsive.css">
                </head>
                <body>
                    <section>
                        <div class="title_cont">
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
