<div class="snippet" is="navigation-main">
  <div class="navigation-main">
    <a class="brand" href="<?= $site->url() ?>"><?= $site->title() ?></a>
    <button class="toggle" aria-controls="menu" aria-expanded="true" type="button"><?= svg('assets/icons/ico-ui-menu-24x18.svg') ?></button>
    <nav class="menu" aria-labelledby="menu" aria-hidden="false">
      <div class="menu-main">
        <?php snippet('navigation/main/partials/main/index', ['pages' => $pages]) ?>
      </div>
      <div class="menu-lang">
        <?php snippet('navigation/main/partials/lang/index', ['kirby' => $kirby, 'page' => $page]) ?>
      </div>
    </nav>
  </div>
</div>
