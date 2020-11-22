<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$emailBuilder = new \SSPickup\models\EmailBuilder($data);
$mail = new PHPMailer(true);

try {
	//Server settings
	$mail->SMTPDebug = SMTP::DEBUG_OFF;
	$mail->isSMTP();
	$mail->Host       = 'smtp.gmail.com';
	$mail->SMTPAuth   = true;
	$mail->Username   = 'kbleeberson@gmail.com';
	$mail->Password   = 'rRAkFwrF9dDTAkZGioyBDJTLZoeiNbjdekZVAtrRRYWsRPeH9MbpUxJgvhHVGvya';
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
	$mail->Port       = 587;
	$mail->CharSet = 'UTF-8';

	//Recipients
	$mail->setFrom('kbleeberson@gmail.com', 'Mailer');
	$mail->addAddress($data->order->email, $data->order->name);     // Add a recipient
	$mail->addReplyTo('kbleeberson@gmail.com', 'Info');
	if ($env !== 'dev') {
		$mail->addCC($data->order->location->email);
	}
	//$mail->addBCC('');

	// Content
	$mail->isHTML(true);                                  // Set email format to HTML
	$mail->Subject = 'Pickup Order Confirmation';
	$mail->Body    = $emailBuilder->getBody();

	$mail->send();
	$response['success'] = true;
} catch (Exception $e) {
	$response['message'] =  "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}