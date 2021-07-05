<ul class="list list--main">
  <?php foreach ($pages->listed()->without('home') as $item): ?>
  <li class="list__item <?= r($item->isOpen(), ' is-active') ?>">
    <a class="link" href="<?= $item->url() ?>"><?= $item->title()->html() ?></a>
  </li>
  <?php endforeach ?>
</ul>
