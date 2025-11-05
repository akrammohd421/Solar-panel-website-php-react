<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$config = require 'config.php';

// Read raw POST data
$data = json_decode(file_get_contents("php://input"), true);

if (
  empty($data['fullName']) ||
  empty($data['phone']) ||
  empty($data['email']) ||
  empty($data['note'])
) {
  echo json_encode(["success" => false, "message" => "All fields are required."]);
  exit();
}

$mail = new PHPMailer(true);

try {
  $mail->isSMTP();
  $mail->Host = $config['smtp_host'];
  $mail->SMTPAuth = true;
  $mail->Username = $config['smtp_user'];
  $mail->Password = $config['smtp_pass'];
  $mail->SMTPSecure = $config['smtp_secure'];
  $mail->Port = $config['smtp_port'];

  $mail->setFrom($config['smtp_user'], 'Website Contact');
  $mail->addAddress($config['receiver_email']);
  $mail->isHTML(true);
  $mail->Subject = "New Contact Message from " . htmlspecialchars($data['fullName']);
  $mail->Body = "
    <h3>Contact Details</h3>
    <p><strong>Name:</strong> {$data['fullName']}</p>
    <p><strong>Phone:</strong> {$data['phone']}</p>
    <p><strong>Email:</strong> {$data['email']}</p>
    <p><strong>Message:</strong><br>{$data['note']}</p>
  ";

  $mail->send();
  echo json_encode(["success" => true, "message" => "Your form has been submitted successfully ✅!"]);
} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => "Mailer Error: " . $mail->ErrorInfo]);
}
