<?php

function greet(string $name) {
    echo "Hello, " . $name;
}

// This will cause a TypeError because null is not a string
greet(null);
?>

