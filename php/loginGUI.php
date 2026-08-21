<?php
session_start();

$logged_in = isset($_SESSION["logged_in"]) ? $_SESSION["logged_in"] : false;
$error = isset($_GET["error"]) ? $_GET["error"] : "";
$success = isset($_GET["success"]) ? $_GET["success"] : "";
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../css/allgemein.css">
    <title>Login</title>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">

        <?php if ($error): ?>
            <div class="bg-red-100 text-red-700 p-3 rounded mb-4">
                <?= htmlspecialchars($error) ?>
            </div>
        <?php endif; ?>

        <?php if ($success): ?>
            <div class="bg-green-100 text-green-700 p-3 rounded mb-4">
                <?= htmlspecialchars($success) ?>
            </div>
        <?php endif; ?>

        <?php if ($logged_in): ?>
            <div class="text-center">
                <p class="mb-4">Du bist eingeloggt als <strong><?= htmlspecialchars($_SESSION["username"]) ?></strong> (<?= htmlspecialchars($_SESSION["rolle"]) ?>)</p>
                <form method="POST" action="logout.php">
                    <button type="submit" class="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">Logout</button>
                </form>
            </div>
        <?php else: ?>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Login -->
                <div>
                    <h2 class="text-2xl font-bold mb-6">Login</h2>
                    <form method="POST" action="login.php">
                        <div class="mb-4">
                            <label for="loginUsername" class="block text-sm font-medium text-gray-700 mb-1">Benutzername</label>
                            <input type="text" name="username" id="loginUsername" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Benutzername" required>
                        </div>
                        <div class="mb-6">
                            <label for="loginPassword" class="block text-sm font-medium text-gray-700 mb-1">Passwort</label>
                            <input type="password" name="password" id="loginPassword" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Passwort" required>
                        </div>
                        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Anmelden</button>
                    </form>
                </div>

                <!-- Registrierung -->
                <div>
                    <h2 class="text-2xl font-bold mb-6">Registrierung</h2>
                    <form method="POST" action="registrierung.php">
                        <div class="mb-4">
                            <label for="regUsername" class="block text-sm font-medium text-gray-700 mb-1">Benutzername</label>
                            <input type="text" name="username" id="regUsername" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Benutzername" required>
                        </div>
                        <div class="mb-4">
                            <label for="regEmail" class="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                            <input type="email" name="email" id="regEmail" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="E-Mail" required>
                        </div>
                        <div class="mb-4">
                            <label for="regPassword" class="block text-sm font-medium text-gray-700 mb-1">Passwort</label>
                            <input type="password" name="password" id="regPassword" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Passwort" required>
                        </div>
                        <div class="mb-6">
                            <label for="regRolle" class="block text-sm font-medium text-gray-700 mb-1">Rolle</label>
                            <select name="rolle" id="regRolle" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                <option value="">Rolle wählen</option>
                                <option value="admin">Admin</option>
                                <option value="mitarbeiter">Mitarbeiter</option>
                                <option value="angehoeriger">Angehöriger</option>
                            </select>
                        </div>
                        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Registrieren</button>
                    </form>
                </div>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>