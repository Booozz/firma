<div class="snippet" is="list-services">
  <div class="container">
    <div class="list-services">
      <div class="content context-content">
        <h2 class="title"><?= ucfirst($page->services()->key()) ?></h2>
        <div class="services">
          <ul class="list">
            <?php foreach ($page->services()->toStructure() as $service): ?>
            <li class="list__item"><?= $service->service() ?></li>
            <?php endforeach ?>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
