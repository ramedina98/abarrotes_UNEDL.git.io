<?php
    require('fpdf/fpdf.php');
    //what is needed to create a qr...
    include('phpqrcode/qrlib.php');

    //the function that creates the qrl...
    function generarQR($codeContents) {
        // how to save PNG codes to server
        $tempDir = 'qrcodes/';
        // we need to generate filename somehow, 
        // with md5 or with database ID used to obtains $codeContents...
        $fileName = '005_file_'.md5($codeContents).'.png';
        
        $pngAbsoluteFilePath = $tempDir.$fileName;
        $urlRelativeFilePath = $tempDir.$fileName;
        
        // generating
        if (!file_exists($pngAbsoluteFilePath)) {
            QRcode::png($codeContents, $pngAbsoluteFilePath);
            return $urlRelativeFilePath;
        } else {
            return $urlRelativeFilePath;
        }
    }

    //here we start to create the PDF...9
    function purchaseReceiptGenerator($data){
        // to use the function and display the image...
        $codeContents = 'QR';
        // call the function and get the path...
        $rutaImagenQR = generarQR($codeContents);

        //The constructor...
        $pdf = new FPDF('P', 'mm', "A4");
        //we add the page...
        $pdf->AddPage();
        //before printing text we must choose a font...
        $pdf->SetFont('Arial', 'B', 20);

        //This is the title of the PDF...
        $pdf->Cell(71,10,'',0,0);
        $pdf->Cell(59,5,'Abarrotes UNEDL',0,0, 'C');
        $pdf->Cell(59,10,'',0,1);
        
        //here are the details of the purchase, img...
        $anchoPagina = $pdf->GetPageWidth();//we check the width of the page...
        $posicionX = ($anchoPagina - 180) / 2;/*we get what is the center 
        for the img...*/
        //route of the img...
        $route = 'totalPurchase/ricardo_medina.png';
        //width of the img...
        $infoImg = getimagesize($route);
        $heightImg =$infoImg[1];
        $posicionY = $heightImg / 4;/*I divide the heigth of the image
        to obtain a quarter of its height...*/

        //and then we put everything in place...
        $pdf->Image($route, $posicionX, 30, 180, 0);

        /*shipping address and buyer's details information
        headings...*/
        $pdf->SetFont('Arial', 'B', 15);
        $pdf->SetY($posicionY);
        $pdf->Cell(71, 10, 'Direccion de envio', 0,0);
        $pdf->Cell(59, 10, '', 0,0);
        $pdf->Cell(59, 10, 'Detalles', 0,1);

        //relevant information...
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(130, 5, $data['calle'].' '.$data['num'], 0,0); 
        $pdf->Cell(31, 5, 'Numero de cliente:', 0,0);
        $pdf->Cell(34, 5, '0012', 0,1);

        $pdf->Cell(130, 5, $data['ciudad'] .', '. $data['estado'] .', '. $data['cp'], 0,0);
        $pdf->Cell(30, 5, 'Fecha de compra: ', 0, 0);
        date_default_timezone_set('America/Mexico_City');
        $fecha = date('d/m/Y');
        $pdf->Cell(35, 5, $fecha, 0, 1);

        $pdf->Cell(130, 5, '', 0,0);
        $pdf->Cell(22, 5, 'No. Compra:', 0,0);
        $pdf->Cell(34, 5, 'ORD0001', 0, 1);

        $pdf->SetFont('Arial', 'B', 15);
        $pdf->Cell(71, 10, 'Envio para', 0,0);
        $pdf->Cell(59, 10, '', 0,0);
        $pdf->Cell(59, 10, '', 0,1);

        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(130, 5, $data['nombre'].' '.$data['apellidos'], 0,0);

        $posicionX = ($anchoPagina - 160) / 2;
        $pdf->Image($rutaImagenQR, $posicionX, 55, 160, 0);

        //the output... 
        return $pdf->Output('S');
    }
?>