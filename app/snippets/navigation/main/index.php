<div class="snippet" is="navigation-main">
  <div class="navigation-main">
    <a class="navigation-main__brand" href="<?= $site->url() ?>"><?= $site->title() ?></a>
    <button class="navigation-main__trigger" aria-controls="menu" aria-expanded="true" type="button"><?= svg('assets/icons/ico-ui-menu-24x18.svg') ?></button>
    <nav class="menu" aria-labelledby="menu" aria-hidden="false">
      <div class="menu__main">
        <?php snippet('navigation/main/partials/main/index', ['pages' => $pages]) ?>
      </div>
      <div class="menu__lang">
        <?php snippet('navigation/main/partials/lang/index', ['kirby' => $kirby, 'page' => $page]) ?>
      </div>
    </nav>
  </div>
</div>
