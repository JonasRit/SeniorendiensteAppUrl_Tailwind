<?php
session_start();
require_once 'config.php';

$username = isset($_POST["username"]) ? trim($_POST["username"]) : "";
$email    = isset($_POST["email"]) ? trim($_POST["email"]) : "";
$password = isset($_POST["password"]) ? $_POST["password"] : "";
$rolle    = isset($_POST["rolle"]) ? $_POST["rolle"] : "";

if ($username === "" || $email === "" || $password === "" || $rolle === "") {
    header("Location: loginGUI.php?error=" . urlencode("Bitte alle Felder ausfüllen."));
    exit();
}

if (!in_array($rolle, ['admin', 'mitarbeiter', 'angehoeriger'])) {
    header("Location: loginGUI.php?error=" . urlencode("Ungültige Rolle."));
    exit();
}

$stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
$stmt->execute([$username, $email]);

if ($stmt->rowCount() > 0) {
    header("Location: loginGUI.php?error=" . urlencode("Benutzername oder E-Mail bereits vergeben."));
    exit();
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare("INSERT INTO users (username, email, password_hash, rolle) VALUES (?, ?, ?, ?)");
$stmt->execute([$username, $email, $hash, $rolle]);

header("Location: loginGUI.php?success=" . urlencode("Registrierung erfolgreich! Du kannst dich jetzt einloggen."));
exit();