<?php
/**
 * @package BlueAcorn_CMSAccordion
 * @version 0.1.0
 * @author Blue Acorn
 * @copyright Copyright (c) 2015 Blue Acorn, Inc.
 */
/* @var $installer Mage_Core_Model_Resource_Setup */
$installer = $this;

$installer->startSetup();

$CMSAtHomeAccordionContent = <<<CONTENT
<div class="accordion-wrapper">
    <div class="accordion">
        <div class="panelHolder active">
            <div class="contentHolder">
                <div class="tab"><p>Samples</p></div>
                <div class="model">
                    <img src="{{skin url="images/blueacorn/samples.png"}}" alt="" />
                    <div class="content">
                        <h1>Samples</h1>
                        <p>Lorem ipsum dolor sit amet, falli molestiae gubergren ea pro, erat assentior vis eu. Ius ea fabulas platonem, debet. </p>
                        <a href=""><button>See Samples</button></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="panelHolder">
            <div class="contentHolder">
                <div class="tab"><p>Videos</p></div>
                <div class="model">
                    <img src="{{skin url="images/blueacorn/samples.png"}}" alt="" />
                    <div class="content">
                        <h1>Videos</h1>
                        <p>Lorem ipsum .... </p>
                        <a href=""><button>CTA Here</button></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="panelHolder">
            <div class="contentHolder">
                <div class="tab"><p>Curriculum Lesson Plans</p></div>
                <div class="model">
                    <img src="{{skin url="images/blueacorn/samples.png"}}" alt="" />
                    <div class="content">
                        <h1>Lesson Plans</h1>
                        <p>Lorem ipsum .... </p>
                        <a href=""><button>CTA Here</button></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="panelHolder">
            <div class="contentHolder">
                <div class="tab"><p>Teaching Aids</p></div>
                <div class="model">
                    <img src="{{skin url="images/blueacorn/samples.png"}}" alt="" />
                    <div class="content">
                        <h1>Teaching Aid</h1>
                        <p>Lorem ipsum .... </p>
                        <a href=""><button>CTA Here</button></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="panelHolder">
            <div class="contentHolder">
                <div class="tab"><p>For Parents</p></div>
                <div class="model">
                    <img src="{{skin url="images/blueacorn/samples.png"}}" alt="" />
                    <div class="content">
                        <h1>For Parents</h1>
                        <p>Lorem ipsum .... </p>
                        <a href=""><button>CTA Here</button></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="panelHolder">
            <div class="contentHolder">
                <div class="tab"><p>For Students</p></div>
                <div class="model">
                    <img src="{{skin url="images/blueacorn/samples.png"}}" alt="" />
                    <div class="content">
                        <h1>For Students</h1>
                        <p>Lorem ipsum .... </p>
                        <a href=""><button>CTA Here</button></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="panelHolder last">
            <div class="contentHolder">
                <div class="tab"><p>Digital Textbooks</p></div>
                <div class="model">
                    <img src="{{skin url="images/blueacorn/samples.png"}}" alt="" />
                    <div class="content">
                        <h1>Digital Textbooks</h1>
                        <p>Lorem ipsum .... </p>
                        <a href=""><button>CTA Here</button></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="accordion-wrapper-mobile">
    <div class="accordion-mobile">
        <div class="panelHolder active">
            <div class="contentHolder">
                <div class="tab"><p>Samples</p></div>
                <div class="model">
                    <img src="{{skin url="images/blueacorn/samples.png"}}" alt="" />
                    <div class="content">
                        <h1>Samples</h1>
                        <p>Lorem ipsum dolor sit amet, falli molestiae gubergren ea pro, erat assentior vis eu. Ius ea fabulas platonem, debet. </p>
                        <a href=""><button>See Samples</button></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="panelHolder">
            <div class="contentHolder">
                <div class="tab"><p>Videos</p></div>
                <div class="model">
                    <img src="{{skin url="images/blueacorn/samples.png"}}" alt="" />
                    <div class="content">
                        <h1>Videos</h1>
                        <p>Lorem ipsum .... </p>
                        <a href=""><button>CTA Here</button></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="panelHolder">
            <div class="contentHolder">
                <div class="tab"><p>Curriculum Lesson Plans</p></div>
                <div class="model">
                    <img src="{{skin url="images/blueacorn/samples.png"}}" alt="" />
                    <div class="content">
                        <h1>Lesson Plans</h1>
                        <p>Lorem ipsum .... </p>
                        <a href=""><button>CTA Here</button></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="panelHolder">
            <div class="contentHolder">
                <div class="tab"><p>Teaching Aid</p></div>
                <div class="model">
                    <img src="{{skin url="images/blueacorn/samples.png"}}" alt="" />
                    <div class="content">
                        <h1>Teaching Aid</h1>
                        <p>Lorem ipsum .... </p>
                        <a href=""><button>CTA Here</button></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="panelHolder">
            <div class="contentHolder">
                <div class="tab"><p>For Parents</p></div>
                <div class="model">
                    <img src="{{skin url="images/blueacorn/samples.png"}}" alt="" />
                    <div class="content">
                        <h1>For Parents</h1>
                        <p>Lorem ipsum .... </p>
                        <a href=""><button>CTA Here</button></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="panelHolder">
            <div class="contentHolder">
                <div class="tab"><p>For Students</p></div>
                <div class="model">
                    <img src="{{skin url="images/blueacorn/samples.png"}}" alt="" />
                    <div class="content">
                        <h1>For Students</h1>
                        <p>Lorem ipsum .... </p>
                        <a href=""><button>CTA Here</button></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="panelHolder last">
            <div class="contentHolder">
                <div class="tab"><p>Digital Textbooks</p></div>
                <div class="model">
                    <img src="{{skin url="images/blueacorn/samples.png"}}" alt="" />
                    <div class="content">
                        <h1>Digital Textbooks</h1>
                        <p>Lorem ipsum .... </p>
                        <a href=""><button>CTA Here</button></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
CONTENT;

$now = Mage::app()->getLocale()->date()
    ->setTimezone(Mage_Core_Model_Locale::DEFAULT_TIMEZONE)
    ->toString(Varien_Date::DATETIME_INTERNAL_FORMAT);

$CMSAtHomeAccordionBlock = array(
    'title' => 'CMS Accordion',
    'identifier' => 'cms_accordion',
    'content' => $CMSAtHomeAccordionContent,
    'creation_time' => $now,
    'update_time' => $now,
    'is_active' => 1,
    'stores' => 0
);

try {
    Mage::getModel('cms/block')->setData($CMSAtHomeAccordionBlock)->save();
} catch(Exception $e){
    Mage::logException($e);
}

$installer->endSetup();