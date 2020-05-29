<?php
//get the q parameter from URL
$page = $_GET["page"];
$js   = $_GET["js"];

if(!isset($page))
    $page = 'home';
else
    strtolower($page);
    
include_once(dirname(__FILE__) . '/metatags.php');

$returnPage = "";
$title;
$metaKey;
$metaDsc;
$rawTitle = array(
    "home"      => 'home',
    "who"       => 'who',
    "what"      => 'what',
    "where"     => 'where',
    "webDesign" => 'web design',
    "mediaArt"  => 'media art',
    "print"     => 'print',
    "talk"      => 'talk',
    "hire"      => 'hire'
);
if($js == 'off'){
    $returnPage = file_get_contents(dirname(__FILE__) . '/header.php');
    if(!file_exists('siteContent/'.$page.'.php')) {
        $title   = 'paramana';
        $metaDsc = $rawMetaDsc['home'];
        $metaKey = $rawMetaKey['home'];
    }
    else {
        $title = "paramana | ".$rawTitle[$page];
        $metaDsc = $rawMetaDsc[$page];
        $metaKey = $rawMetaKey[$page];
    }
    $returnPage = preg_replace("/<title>(.*)<\/title>/", "<title>".$title."</title>", $returnPage);
    $returnPage = preg_replace('/<meta name="keywords" content="(.*)" \/>/', '<meta name="keywords" content="'.$metaKey.'" />', $returnPage);
    $returnPage = preg_replace('/<meta name="description" content="(.*)" \/>/', '<meta name="description" content="'.$metaDsc.'" />', $returnPage);
    echo $returnPage;
    echo '<div id="actualContent">
            <div id="actualHeader">
            </div>
            <div id="actualBody">

            </div>
            <div id="actualFooter">
            </div>
        </div>';
    echo '<div class="comment">';
}
if(!file_exists('siteContent/' . $page . '.php')){
    include(dirname(__FILE__) . '/siteContent/home.php');
}
else{
    include(dirname(__FILE__) . '/siteContent/'.$page.'.php');
}
if($js == 'off'){
    echo '</div>';
    $footer = file_get_contents(dirname(__FILE__) . '/footer.php');
    $bottomContent = '';
    $bottomContent .= '';
    echo $footer;
}
?>