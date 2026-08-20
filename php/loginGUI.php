<?php
    session_start();

    $timeout = 10 *60;

    if (isset($_SESSION["letzte_aktivi"])) {
        if (time() - $_SESSION["letzte_aktivi"] > $timeout) {
            session_destroy();
            header("Location: ./php/loginGUI.php");
            exit();
        }
    }

    $_SESSION["letzte_aktivi"] = time();



    if(isset($_SESSION["logged_in"])) {
    $logged_in = $_SESSION["logged_in"];
    } else {
        $logged_in = false;
    }

?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <title>Login</title>
</head>
<body>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="../index.php">Sportgeschäft.de</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav me-auto">
            <li class="nav-item">
                <a class="nav-link" href="../index.php">Startseite</a>
            </li>
            
        </ul>
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link active" href="./loginGUI.php">
                    <?php 
                    if(isset($logged_in) && $logged_in === true) {
                        echo "Logout";
                    } else {
                        echo "Login";
                    }
                ?>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./warenkorbGUI.php">Warenkorb</a>
            </li>
            <li class="nav-item">
                <span class="nav-link">Status: 
                <?php 
                    if(isset($logged_in) && $logged_in === true) {
                        echo "Eingeloggt";
                    } else {
                        echo "Nicht eingeloggt";
                    }
                ?>
                </span>
                </span>
            </li>
        </ul>
    </div>
  </div>
</nav>
    <div class="container mt-5">
        <div class="row">
            <div class="col-6">
                <h3>Login</h3>
                <?php
                    if(isset($logged_in) && $logged_in === true) {
                        echo '
                            <form action="./logout.php" method="POST">
                                <button type="submit">Logout</button>
                            </form>
                        ';
                    }else {
                        echo '
                            <form action="./login.php" method="POST">
                                <div class="form-group row">
                                    <label for="usernameLogin" class="col-sm-2 col-form-label">Benutzername</label>
                                    <div class="col-sm-10">
                                        
                                    <input type="text" name="username" class="form-control" id="usernameLogin" placeholder="Benutzername">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="passwordLogin" class="col-sm-2 col-form-label">Passwort</label>
                                    <div class="col-sm-10">
                            
                                    <input type="password" name="password" class="form-control" id="passwordLogin" placeholder="Passwort">
                                    </div>
                                </div>
                                <input class="btn btn-primary" type="submit" value="Anmelden">
                            </form>
                        ';
                    }
                ?>

            </div>
            <div class="col-6">
                <h3>Registrierung</h3>
                <?php

                echo '
                    <form action="./registrierung.php" method="POST">
                        <div class="form-group row">
                            <label for="usernameRegist" class="col-sm-2 col-form-label">Benutzername</label>
                            <div class="col-sm-10">                              
                            <input type="text" name="username" class="form-control" id="usernameRegist" placeholder="Benutzername">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="passwordRegist" class="col-sm-2 col-form-label">Passwort</label>
                            <div class="col-sm-10">               
                            <input type="text" name="password" class="form-control" id="passwordRegist" placeholder="Passwort">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="vorname" class="col-sm-2 col-form-label">Vorname</label>
                            <div class="col-sm-10">
                            <input type="text" name="vorname" class="form-control" id="vorname" placeholder="Vorname">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="nachname" class="col-sm-2 col-form-label">Nachname</label>
                            <div class="col-sm-10">
                            <input type="text" name="nachname" class="form-control" id="nachname" placeholder="Nachname">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="anschrift" class="col-sm-2 col-form-label">Anschrift</label>
                            <div class="col-sm-10">
                            <input type="text" name="anschrift" class="form-control" id="anschrift" placeholder="Anschrift">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="col-sm-2 col-form-label">E-Mail</label>
                            <div class="col-sm-10">
                            <input type="email" name="email" class="form-control" id="email" placeholder="E-Mail">
                            </div>
                        </div>
                        



                        <input class="btn btn-primary" type="submit" value="Registrieren">
                    </form>
                ';
                    
                ?>
            </div>
        </div>
    </div>

    


    
</body>
</html>