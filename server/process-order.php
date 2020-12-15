<?php
$env = 'dev';
header('Access-Control-Allow-Origin: *'); // change to "https://pickup.seoulspice.com"
header('Access-Control-Allow-Headers: *');

if ($_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
  require_once('vendor/autoload.php');
  include('./_inc/_logger.php');
  require_once('models/EmailBuilder.php');
  require_once('models/OrderBuilder.php');
  require_once('models/OrderItem.php');
  
  $response = ['success' => false, 'message' => ''];
  $formData = file_get_contents( 'php://input' );
  $data = json_decode( $formData, false); // false is "associative" array argument
  
  include('./_inc/config.php');
  include('./_inc/_create-order.php');
  include('./_inc/_process-payment.php');
  // include('./_inc/_send-email.php');
  
  echo json_encode( $response );

}




