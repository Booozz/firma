<?php

if ($root = $pages->findOpen()) {
  $items = $root->children()->listed();
}

if ($items and $items->count()) : ?>
<div class="snippet" is="navigation-sub">
  <div class="container">
    <div class="navigation-sub">
      <nav class="menu">
        <?php snippet('navigation/sub/partials/list/index', ['items' => $items]) ?>
      </nav>
    </div>
  </div>
</div>
<?php endif ?>
