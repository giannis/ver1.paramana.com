<div id="webdesignWindow" class="jcarousel-container mainWindow portfolioWindow">
    <div id="carouselPrev"></div>
    <div id="carouselNext"></div>
    <div class="jcarousel-clip">
        <ul class="jcarousel-list">
            <!-- Add the first visible range of items statically for displaying with javascript disabled -->
            <?php
            include_once 'jcarousel_functions.php';
            $jcarousel_items = jcarousel_getItems('webdesign');

            foreach ($jcarousel_items as $item) {
            ?>
                <li><a class="detailView" title="<?php echo htmlspecialchars($item['title']);?>" href="details/<?php echo htmlspecialchars($item['path']);?>Details.html" rel="webDetailGroup"><img src="<?php echo htmlspecialchars($item['src']); ?>" width="150" height="110" alt="<?php echo htmlspecialchars($item['title']); ?>" /></a> <h3><a href="details/<?php echo htmlspecialchars($item['title']);?>Details.html"><?php echo htmlspecialchars($item['title']); ?></a></h3> <?php echo htmlspecialchars($item['descr']); ?></li>
            <?php
            }
            ?>
        </ul>
    </div>
</div>
