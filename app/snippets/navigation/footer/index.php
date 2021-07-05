<div class="snippet" is="navigation-footer">
  <div class="container">
    <nav class="navigation">
      <div class="navigation-columns">
        <div class="column">
          <div class="menu">
            <div class="menu-lang">
              <?php snippet('navigation/footer/partials/lang/index', ['kirby' => $kirby, 'page' => $page]) ?>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="contact">
            <?php snippet('component/card-contact/index') ?>
          </div>
        </div>
      </div>
    </nav>
  </div>
</div>
