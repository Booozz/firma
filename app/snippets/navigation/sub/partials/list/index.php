<ul class="list list--sub">
  <?php foreach ($items as $item) : ?>
  <li class="list__item">
    <a class="link" href="<?php echo $item->url() ?>"><?php echo $item->title()->html() ?></a>
  </li>
  <?php endforeach ?>
</ul>
