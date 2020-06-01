<?php
if ((isset($_POST['name'])) && (strlen(trim($_POST['name'])) > 0))
	$name = stripslashes(strip_tags($_POST['name']));
else
	$name = 'No name entered';

if ((isset($_POST['email'])) && (strlen(trim($_POST['email'])) > 0))
	$emailFrom = stripslashes(strip_tags($_POST['email']));
else
	$email = 'No email entered';

if ((isset($_POST['message'])) && (strlen(trim($_POST['message'])) > 0))
	$message = stripslashes(strip_tags($_POST['message']));
else
	$message = 'No message entered';

$body = '
	This e-mail is from: <strong>' . $name . '</strong><br />
	with email: <strong>'.$emailFrom . '</strong><br />
	'.$name. ' wrote:'.'<br />
	<p>'.$message.'</p>';

$name = "=?UTF-8?B?" . base64_encode($name) . "?=";

require_once('class.phpmailer.php');

$mail  = new PHPMailer(); // defaults to using php "mail()"

$mail->AddReplyTo($emailFrom, $name);

$mail->SetFrom($emailFrom, $name);

$address = "info@paramana.com";
$mail->AddAddress($address, "paramana.com");

$mail->Subject    = "People Contacting";

$mail->MsgHTML($body);

if(!$mail->Send()) {
  $recipient = 'info@paramana.com';
	$subject = 'People Contacting';
	$content = $body;
	mail($recipient, $subject, $content, "From: $emailFrom\r\nReply-To: $emailFrom\r\nX-Mailer: DT_formmail");
	exit;
}
else
  echo "1";
?>
