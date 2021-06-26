<?php
require '../kirby/bootstrap.php';
require_once '../config/application.php';

$kirby = new Kirby([
    'urls' => [
        'index' => $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . '',
        'media' => $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . '/media'
    ],
    'roots' => [
        'index'    => __DIR__,
        'base'     => $base = dirname(__DIR__),
        'content'  => $base . '/content',
        'site'     => $base . '/site',
        'kirby'    => $base . '/kirby',
        'storage'  => $storage = $base . '/storage',
        'accounts' => $storage . '/accounts',
        'cache'    => $storage . '/cache',
        'sessions' => $storage . '/sessions',
    ]
]);

echo $kirby->render();
