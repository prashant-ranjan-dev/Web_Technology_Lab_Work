<?php
declare(strict_types=1);
session_start();
header('Content-Type: application/json');

$supabaseUrl = getenv('SUPABASE_URL') ?: 'https://jpalpbejjjburbisawka.supabase.co';
$supabaseKey = getenv('SUPABASE_SERVICE_ROLE_KEY') ?: '';
$action = $_GET['action'] ?? '';
$input = json_decode(file_get_contents('php://input'), true) ?: [];

function respond(bool $success, string $message = '', array $data = [], int $status = 200): never {
	http_response_code($status);
	echo json_encode(array_merge(['success' => $success, 'message' => $message], $data));
	exit;
}

function supabaseRequest(string $method, string $path, array $body = []): array {
	global $supabaseUrl, $supabaseKey;
	if ($supabaseKey === '') respond(false, 'SUPABASE_SERVICE_ROLE_KEY is not configured on the server.', [], 500);
	$curl = curl_init($supabaseUrl . '/rest/v1/' . $path);
	curl_setopt_array($curl, [
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_CUSTOMREQUEST => $method,
		CURLOPT_HTTPHEADER => ['apikey: ' . $supabaseKey, 'Authorization: Bearer ' . $supabaseKey, 'Content-Type: application/json', 'Prefer: return=representation'],
		CURLOPT_POSTFIELDS => $body ? json_encode($body) : null
	]);
	$response = curl_exec($curl);
	$curlError = curl_error($curl);
	$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	curl_close($curl);
	if ($response === false) respond(false, 'Supabase connection failed: ' . $curlError, [], 502);
	$decoded = json_decode((string) $response, true);
	if ($status >= 400) {
		$message = is_array($decoded) && isset($decoded['message']) ? (string) $decoded['message'] : 'Database request failed.';
		respond(false, $message, [], 502);
	}
	if (!is_array($decoded)) respond(false, 'Supabase returned an invalid response.', [], 502);
	return $decoded;
}

if ($action === 'register') {
	$name = trim((string) ($input['name'] ?? ''));
	$email = strtolower(trim((string) ($input['email'] ?? '')));
	$role = $input['role'] ?? 'employee';
	$password = (string) ($input['password'] ?? '');
	if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || !in_array($role, ['employee', 'admin'], true) || strlen($password) < 8) respond(false, 'Enter valid details and a password of at least 8 characters.', [], 422);
	$existing = supabaseRequest('GET', 'profiles?select=id&email=eq.' . rawurlencode($email));
	if ($existing) respond(false, 'An account with this email already exists.', [], 409);
	supabaseRequest('POST', 'profiles', [['name' => $name, 'email' => $email, 'role' => $role, 'password_hash' => password_hash($password, PASSWORD_DEFAULT)]]);
	respond(true, 'Account created.');
}

if ($action === 'login') {
	$email = strtolower(trim((string) ($input['email'] ?? '')));
	$password = (string) ($input['password'] ?? '');
	$rows = supabaseRequest('GET', 'profiles?select=id,name,email,role,department,password_hash&email=eq.' . rawurlencode($email) . '&limit=1');
	if (!$rows || !password_verify($password, $rows[0]['password_hash'])) respond(false, 'Email or password is incorrect.', [], 401);
	unset($rows[0]['password_hash']);
	$_SESSION['user'] = $rows[0];
	respond(true, 'Signed in.', ['user' => $rows[0]]);
}

if ($action === 'directory') {
	if (empty($_SESSION['user'])) respond(false, 'Please sign in first.', [], 401);
	$targetRole = $_SESSION['user']['role'] === 'admin' ? 'employee' : 'admin';
	$people = supabaseRequest('GET', 'profiles?select=name,email,role,department&role=eq.' . $targetRole . '&order=name.asc');
	respond(true, '', ['people' => $people, 'user' => $_SESSION['user']]);
}

if ($action === 'logout') { session_destroy(); respond(true, 'Signed out.'); }
respond(false, 'Unknown action.', [], 404);
