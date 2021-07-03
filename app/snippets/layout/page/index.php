<div class="snippet" is="layout-page">
  <section class="page-layout">
    <header class="page-layout__header">
      <?php snippet('component/block-page-header/index') ?>
    </header>
    <main class="page-layout__main">
      <?php snippet('component/block-wysiwyg/index', ['text' => $page->page_description()]) ?>
    </main>
    <footer class="page-layout__footer">
      <?php snippet('component/block-page-footer/index') ?>
    </footer>
  </section>
</div>
