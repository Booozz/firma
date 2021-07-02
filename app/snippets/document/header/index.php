<!DOCTYPE html>
<html lang="<?= $kirby->language()->code() ?>" class="app <?= $page->template() ?> theme-default">

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

    <title><?= ($page->template() == 'home') ? $site->title()->h() : $page->title()->h() . ' | ' . $site->title()->h() ?></title>

    <link rel="stylesheet" href="<?= url('main.css') ?>">

    <link rel="shortcut icon" href="<?= url('/assets/favicons/favicon.ico') ?>">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= url('/assets/favicons/favicon-16x16.png') ?>">
    <link rel="icon" type="image/png" sizes="32x32" href="<?= url('/assets/favicons/favicon-32x32.png') ?>">
    <link rel="icon" type="image/png" sizes="48x48" href="<?= url('/assets/favicons/favicon-48x48.png') ?>">
    <link rel="manifest" href="<?= url('/assets/favicons/manifest.json') ?>" crossorigin="use-credentials">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="rgba(0,0,0,0)">
    <meta name="application-name" content="Glas & Gebäudereinigung - Uwe Schramm">
    <link rel="apple-touch-icon" sizes="57x57" href="<?= url('/assets/favicons/apple-touch-icon-57x57.png') ?>">
    <link rel="apple-touch-icon" sizes="60x60" href="<?= url('/assets/favicons/apple-touch-icon-60x60.png') ?>">
    <link rel="apple-touch-icon" sizes="72x72" href="<?= url('/assets/favicons/apple-touch-icon-72x72.png') ?>">
    <link rel="apple-touch-icon" sizes="76x76" href="<?= url('/assets/favicons/apple-touch-icon-76x76.png') ?>">
    <link rel="apple-touch-icon" sizes="114x114" href="<?= url('/assets/favicons/apple-touch-icon-114x114.png') ?>">
    <link rel="apple-touch-icon" sizes="120x120" href="<?= url('/assets/favicons/apple-touch-icon-120x120.png') ?>">
    <link rel="apple-touch-icon" sizes="144x144" href="<?= url('/assets/favicons/apple-touch-icon-144x144.png') ?>">
    <link rel="apple-touch-icon" sizes="152x152" href="<?= url('/assets/favicons/apple-touch-icon-152x152.png') ?>">
    <link rel="apple-touch-icon" sizes="167x167" href="<?= url('/assets/favicons/apple-touch-icon-167x167.png') ?>">
    <link rel="apple-touch-icon" sizes="180x180" href="<?= url('/assets/favicons/apple-touch-icon-180x180.png') ?>">
    <link rel="apple-touch-icon" sizes="1024x1024" href="<?= url('/assets/favicons/apple-touch-icon-1024x1024.png') ?>">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Schramm Reinigung">
    <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="<?= url('/assets/favicons/apple-touch-startup-image-640x1136.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="<?= url('/assets/favicons/apple-touch-startup-image-750x1334.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="<?= url('/assets/favicons/apple-touch-startup-image-828x1792.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="<?= url('/assets/favicons/apple-touch-startup-image-1125x2436.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="<?= url('/assets/favicons/apple-touch-startup-image-1242x2208.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="<?= url('/assets/favicons/apple-touch-startup-image-1242x2688.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="<?= url('/assets/favicons/apple-touch-startup-image-1536x2048.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="<?= url('/assets/favicons/apple-touch-startup-image-1668x2224.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="<?= url('/assets/favicons/apple-touch-startup-image-1668x2388.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="<?= url('/assets/favicons/apple-touch-startup-image-2048x2732.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="<?= url('/assets/favicons/apple-touch-startup-image-1620x2160.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="<?= url('/assets/favicons/apple-touch-startup-image-1136x640.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="<?= url('/assets/favicons/apple-touch-startup-image-1334x750.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="<?= url('/assets/favicons/apple-touch-startup-image-1792x828.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="<?= url('/assets/favicons/apple-touch-startup-image-2436x1125.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="<?= url('/assets/favicons/apple-touch-startup-image-2208x1242.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="<?= url('/assets/favicons/apple-touch-startup-image-2688x1242.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="<?= url('/assets/favicons/apple-touch-startup-image-2048x1536.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="<?= url('/assets/favicons/apple-touch-startup-image-2224x1668.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="<?= url('/assets/favicons/apple-touch-startup-image-2388x1668.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="<?= url('/assets/favicons/apple-touch-startup-image-2732x2048.png') ?>">
    <link rel="apple-touch-startup-image" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="<?= url('/assets/favicons/apple-touch-startup-image-2160x1620.png') ?>">
    <link rel="icon" type="image/png" sizes="228x228" href="<?= url('/assets/favicons/coast-228x228.png') ?>">
    <meta name="msapplication-TileColor" content="rgba(0,0,0,0)">
    <meta name="msapplication-TileImage" content="<?= url('/assets/favicons/mstile-144x144.png') ?>">
    <meta name="msapplication-config" content="<?= url('/assets/favicons/browserconfig.xml') ?>">
    <link rel="yandex-tableau-widget" href="<?= url('/assets/favicons/yandex-browser-manifest.json') ?>">

    <meta name="description" content="<?= ($page->template() == 'home') ? $site->site_meta_description()->h() : $page->page_meta_description()->h() ?>" />
    <meta name="author" content="<?= $site->site_author()->h() ?>">
    <meta name="keywords" content="<?= $site->site_keywords()->h() ?>">

    <meta property="og:type" content="website" />
    <meta property="og:title" content="<?= ($page->template() == 'home') ? $site->title()->h() : $page->title()->h() . ' | ' . $site->title()->h() ?>" />
    <meta property="og:url" content="<?= html($site->url()) ?>" />
    <meta property="og:locale" content="<?= $kirby->language()->code() ?>_DE">
    <meta property="og:description" content="<?= ($page->template() == 'home') ? $site->site_meta_description()->h() : $page->page_meta_description()->h() ?>">

    <meta itemprop="name" content="<?= ($page->template() == 'home') ? $site->title()->h() : $page->title()->h() . ' | ' . $site->title()->h() ?>">
    <meta itemprop="description" content="<?= ($page->template() == 'home') ? $site->site_meta_description()->h() : $page->page_meta_description()->h() ?>">

    <?php if ($site->privacy_metrics()->isTrue() and $_SERVER['MATOMO'] === 'true') : ?>
    <?php snippet('metrics') ?>
    <?php endif ?>

  </head>

  <body>
    <div class="app-main">
      <div class="document">
        <header class="document-header">
          <?php snippet('navigation/main/index') ?>
        </header>
        <section class="document-layout">
