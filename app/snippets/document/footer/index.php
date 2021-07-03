                </section>

                <footer class="document__footer">
                  <?php snippet('navigation/footer/index') ?>
                </footer>

            </div>
        </div>
        <?php snippet('document/side/index') ?>

        <script src='<?= url('vendor.js') ?>'></script>
        <script src='<?= url('main.js') ?>'></script>
        <?php if ($page->template() == 'contact') : ?>
        <script async defer src='<?= url("https://maps.googleapis.com/maps/api/js?key=AIzaSyDp06-CNwgZLQCKHL7aOlg8xoCoW0qed5U&libraries=places&callback=initMap&language={$kirby->language()->code()}") ?>'></script>
        <?php endif ?>

    </body>

</html>
