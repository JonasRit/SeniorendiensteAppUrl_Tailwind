<?php
session_start();
require_once 'config.php';

$username = isset($_POST["username"]) ? trim($_POST["username"]) : "";
$password = isset($_POST["password"]) ? $_POST["password"] : "";

if ($username === "" || $password === "") {
    header("Location: loginGUI.php?error=" . urlencode("Bitte alle Felder ausfüllen."));
    exit();
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_OBJ);

if ($user && password_verify($password, $user->password_hash)) {
    $_SESSION["logged_in"] = true;
    $_SESSION["user_id"] = $user->id;
    $_SESSION["username"] = $user->username;
    $_SESSION["rolle"] = $user->rolle;
    header("Location: ../index.html");
    exit();
} else {
    header("Location: loginGUI.php?error=" . urlencode("Benutzername oder Passwort falsch."));
    exit();
}