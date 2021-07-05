<div class="snippet" is="layout-contact">
  <section class="contact-layout">
    <header class="contact-layout__header">
      <?php snippet('component/block-page-header/index') ?>
    </header>
    <main class="contact-layout__main">
      <?php snippet('component/block-wysiwyg/index', ['text' => $page->page_description()]) ?>
      <?php snippet('component/block-contact/index') ?>
      <?php snippet('component/block-map/index') ?>
    </main>
  </section>
</div>
