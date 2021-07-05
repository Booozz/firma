<div class="snippet" is="layout-compartment">
  <section class="compartment-layout">
    <header class="compartment-layout__header">
      <?php snippet('component/block-page-header/index') ?>
    </header>
    <main class="compartment-layout__main">
      <?php snippet('component/block-wysiwyg/index', ['text' => $page->page_description()]) ?>
      <?php snippet('component/list-services/index') ?>
    </main>
  </section>
</div>
