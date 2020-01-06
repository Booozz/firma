<div class="snippet" is="block-contact">
  <div class="container">
    <div class="columns context-content">
      <div class="column">
        <div class="address">
          <?php $location = $page->location_data()->toLocation(); ?>
          <span class="address-company"><?= $page->company_title() ?></span>
          <span class="address-extra"><?= $page->company_extra() ?></span>
          <span class="address-street"><?= $location->address() ?>&nbsp;<?= $location->number() ?></span>
          <span class="address-zip"><?= $location->postcode() ?>&nbsp;<?= $location->city() ?></span>
        </div>
      </div>
      <div class="column">
        <div class="channel">
          <span class="channel-phone">Tel:&nbsp;<a href="tel:<?= $page->channel_phone() ?>" rel="nofollow"><?= $page->channel_phone() ?></a></span>
          <span class="channel-fax">Fax:&nbsp;<?= $page->channel_fax() ?></span>
          <span class="channel-mail"><a href="mailto:<?= $page->channel_email() ?>" rel="nofollow"><?= $page->channel_email() ?></a></span>
        </div>
      </div>
    </div>
  </div>
</div>
