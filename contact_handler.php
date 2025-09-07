<?php
// Настройки для отправки email
$to_email = "todavchych1989@gmail.com";
$subject_prefix = "HANDYVLAD - Новая заявка с сайта";

// Проверяем, что запрос пришел методом POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Получаем данные из формы и очищаем их
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $service = isset($_POST['service']) ? trim($_POST['service']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    
    // Проверяем обязательные поля
    if (empty($name) || empty($phone)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Пожалуйста, заполните имя и телефон']);
        exit;
    }
    
    // Валидация email (если указан)
    if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Пожалуйста, введите корректный email']);
        exit;
    }
    
    // Формируем тему письма
    $subject = $subject_prefix;
    if (!empty($service)) {
        $services = [
            'painting' => 'Покраска',
            'handyman' => 'Услуги мастера',
            'renovation' => 'Ремонт дома',
            'other' => 'Другое'
        ];
        $service_name = isset($services[$service]) ? $services[$service] : $service;
        $subject .= " - " . $service_name;
    }
    
    // Формируем тело письма
    $email_body = "Новая заявка с сайта HANDYVLAD\n\n";
    $email_body .= "Имя: " . $name . "\n";
    $email_body .= "Телефон: " . $phone . "\n";
    
    if (!empty($email)) {
        $email_body .= "Email: " . $email . "\n";
    }
    
    if (!empty($service)) {
        $email_body .= "Услуга: " . $service_name . "\n";
    }
    
    if (!empty($message)) {
        $email_body .= "Сообщение: " . $message . "\n";
    }
    
    $email_body .= "\n---\n";
    $email_body .= "Дата: " . date('d.m.Y H:i:s') . "\n";
    $email_body .= "IP адрес: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    // Настройки заголовков письма
    $headers = "From: noreply@handyvlad.com\r\n";
    $headers .= "Reply-To: " . (!empty($email) ? $email : $phone) . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Отправляем письмо
    if (mail($to_email, $subject, $email_body, $headers)) {
        // Успешная отправка
        http_response_code(200);
        echo json_encode([
            'status' => 'success', 
            'message' => 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.'
        ]);
    } else {
        // Ошибка отправки
        http_response_code(500);
        echo json_encode([
            'status' => 'error', 
            'message' => 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.'
        ]);
    }
    
} else {
    // Неправильный метод запроса
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Метод не разрешен']);
}
?>

