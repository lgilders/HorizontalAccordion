<?php
/**
 * @package BlueAcorn_CMSBlocks
 * @version 0.1.0
 * @author Blue Acorn
 * @copyright Copyright (c) 2015 Blue Acorn, Inc.
 */
/* @var $installer Mage_Core_Model_Resource_Setup */
$installer = $this;

$installer->startSetup();

$cmsBlocks = <<<CONTENT
<div class="cmsBlocks">
<h2>AtHome Accordion</h2>
{{block type="cms/block" block_id="cms_athome_accordion"}}
<h2>AtSchool Accordion</h2>
{{block type="cms/block" block_id="cms_atschool_accordion"}}
</div>
CONTENT;

$cmsPage = Mage::getModel('cms/page')->load('cmsblocks');
$cmsPageContent = $cmsPage->getContent();
$cmsPageContent .= $cmsBlocks;

try {
    $cmsPage->setContent($cmsPageContent)->save();
} catch(Exception $e){
    Mage::logException($e);
}

$installer->endSetup();