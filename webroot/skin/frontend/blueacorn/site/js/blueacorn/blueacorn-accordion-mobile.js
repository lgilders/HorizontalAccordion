/**
 * @package     Blueacorn/AccordianMobile
 * @version     1.0
 * @author      Blue Acorn <code@blueacorn.com>
 * @copyright   Copyright © 2015 Blue Acorn.
 */

function CmsAccordionMobile(options) {
    this.init(options);
}

jQuery(document).ready(function ($) {

    CmsAccordionMobile.prototype = {
        init: function (options) {
            this.settings = {
                'moduleName': 'Accordion',
                'accordions': $j('.accordion-mobile')
            };

            // Sets the initial sizes for the accordion's elements
            // Required for responsive design
            this.setSizes();

            // Overrides the default settings
            ba.overrideSettings(this.settings, options);

            // Start the debugger
            ba.setupDebugging(this.settings);
        },

        /*
         * Each available accordion's elements must be re-sized per accordion
         */
        setSizes: function() {
            var self = this;
            this.settings.accordions.each(function() {
                self.setSize($(this));
            });
        },

        /*
         * The accordion's elements must be re-sized based on the window's size before the slider behavior is initialized
         */
        setSize: function (accordion) {
            var self = this,
                accordionWrapper = accordion.closest('.accordion-wrapper-mobile'),
                tabs = accordion.find('.tab'),
                contents = accordion.find('.contentHolder'),
                panels = accordion.find('.panelHolder'),
                activePanel = accordion.find('.panelHolder.active'),
                accordionWrapperWidth = accordionWrapper.width(),
                numTabs = accordion.find('.tab').length - 1, // Number of tabs configurable by end user minus the active tab
                tabsHeight = numTabs * 45; // 45px is the min-height for each tab

            // Set accordion to the window's width
            accordion.width(accordionWrapperWidth);

            // Set the tabs to a percentage of the tabsHeight
            tabs.width(accordionWrapperWidth);

            // All panels start with the same width as the tabs minus the width of the right border on each tab
            panels.width(accordionWrapperWidth);

            // The active panel starts with the same width as the main contents area
            activePanel.width(accordionWrapperWidth);
            activePanel.height(tabsHeight - 45); // Remove the active panel's hidden tab's height

            // Set the contentHolders to the contentsWidth
            contents.width(accordionWrapperWidth);

            // Set accordion's height based on the tabs and active panel heights
            accordion.height(activePanel.height() + tabsHeight);
        }
    };

    $.fn.slideOutMobile = function (options) {

        var defaults = {
                self: this,
                panels: this.children(".panelHolder"),
                tabs: this.find(".tab"),
                model: this.find(".model"),
                callback: function () {
                }
            },

            settings = $.extend({}, defaults, options),

            divPositionBottom = [],

            divPositionTop = [],

            animatingPanel = false,

            active_string = "active",

            tab_string = "tab",

            model_string = "model",

            panelHolder_string = "panelHolder",

            slideOutPanel = {

                init: function () {
                    this.setPanel();
                    this.bindEvents();
                },

                currentContainerHeight: settings.self.height(),

                tabHeight: settings.tabs.outerHeight(true),

                modelHeight: settings.model.height(),

                setPanel: function () {

                    var offset = parseFloat(settings.panels.css("padding-top"));

                    //Get the position of each panel and put it in an array
                    settings.panels.each($.proxy(this.positionLoop, this, offset))
                        .each(this.setPanelPosition);
                },

                positionLoop: function (offset, index, val) {

                    var $this = $(val),
                        top = $this.position().top;

                    divPositionBottom.push(top);

                    //What the position of the panel will be when it is on the right side
                    divPositionTop.push((this.tabHeight + offset) * index);

                },

                setPanelPosition: function (index, val) {

                    //Position each panel absolutely based off of the position it was in the dom on load
                    $(val).css({
                        top: divPositionBottom[index],
                        position: "absolute"
                    }).data("bottom", divPositionBottom[index]).data("position", "bottom");
                },

                bindEvents: function () {

                    settings.self.on("mousedown touchend", "." + panelHolder_string, $.proxy(this.mouseDownPanelEvent, this));

                    settings.self.on("mouseup touchend", $.proxy(this.mouseUpParentEvent, this));
                },

                setDataPosition: function (selectedIndex) {

                    settings.panels.each($.proxy(this.dataLoop, this, selectedIndex));
                },

                dataLoop: function (selectedIndex, index, val) {

                    var $this = $(val), //Current panel in loop
                        currentTopPosition = parseFloat($this.css("top"));

                    //Set the data so when the event is call it know how to animate
                    if (index < selectedIndex) {

                        $this.data("position", "top");

                    } else {

                        $this.data("position", "bottom");
                    }

                    /*
                     * Check to see if the element you clicked has other panels in front of it
                     * if it does move all the panels to the top or bottom
                     *
                     */

                    if (currentTopPosition !== divPositionTop[index] && $this.data("position") === "top") {

                        TweenMax.to($this, 0.5, {
                            top: divPositionTop[index]
                        });

                    } else if (index !== selectedIndex && currentTopPosition !== divPositionBottom[index] && $this.data("position") === "bottom") {

                        TweenMax.to($this, 0.5, {
                            top: divPositionBottom[index]
                        });
                    }
                },

                mouseDownPanelEvent: function (event) {
                    var $this = $(event.currentTarget), //Element that was clicked
                        currentIndex = $this.index(), //Element index
                        active = settings.self.find("." + active_string);

                    if (!$this.hasClass(active_string) && animatingPanel === false) {

                        if ($this.data("position") !== "bottom") {
                            this.openPanelTop($this, active, currentIndex);

                        } else {

                            this.openPanelBottom($this, active, currentIndex);
                        }
                    }
                },

                showModelTab: function ($ele) {

                    $ele.parents("." + panelHolder_string).removeClass(active_string);
                },

                hideModelTab: function ($ele) {

                    $ele.parents("." + panelHolder_string).css({
                        top: $ele.data("top"),
                        height: this.tabHeight
                    });
                },

                moveCurrentTab: function ($ele) {

                    $ele.removeAttr("style")
                        .parents("." + panelHolder_string).addClass(active_string);
                },

                showModel: function ($ele) {

                    $ele.removeAttr("style");

                    animatingPanel = false;
                },

                showCurrentModel: function ($ele) {

                    $ele.parents("." + panelHolder_string).addClass(active_string);

                    animatingPanel = false;
                },

                openPanelTop: function ($this, active, currentIndex) {

                    var modelTab = active.find("." + tab_string),
                        modelImg = active.find("." + model_string),
                        currentTab = $this.find("." + tab_string),
                        currentModel = $this.find("." + model_string);

                    animatingPanel = true;

                    TweenMax.to(modelTab, 0.5, {
                        opacity: 1,
                        onComplete: this.showModelTab,
                        onCompleteParams: [modelTab]
                    });

                    TweenMax.to(modelImg, 0.5, {
                        opacity: 0,
                        onComplete: $.proxy(this.hideModelTab, this),
                        onCompleteParams: [modelImg]
                    });

                    TweenMax.to($this, 0.5, {
                        height: this.modelHeight
                    });

                    TweenMax.to(currentTab, 0.5, {
                        top: active.data("bottom"),
                        onComplete: this.moveCurrentTab,
                        onCompleteParams: [currentTab]
                    });

                    TweenMax.to(currentModel, 0.5, {
                        opacity: 1,
                        onComplete: this.showModel,
                        onCompleteParams: [currentModel]
                    });

                    //Reset data position for non open elements
                    this.setDataPosition(currentIndex);
                },

                openPanelBottom: function ($this, active, currentIndex) {

                    var modelImg = active.find("." + model_string),
                        modelTab = active.find("." + tab_string),
                        currentTab = $this.find("." + tab_string),
                        currentModel = $this.find("." + model_string);

                    animatingPanel = true;

                    TweenMax.to(active, 0.5, {
                        height: this.tabHeight
                    });

                    TweenMax.to(modelImg, 0.5, {
                        opacity: 0
                    });

                    TweenMax.to(modelTab, 0.5, {
                        opacity: 1,
                        onComplete: this.showModelTab,
                        onCompleteParams: [modelTab]
                    });

                    TweenMax.to($this, 0.5, {
                        height: this.modelHeight,
                        top: divPositionTop[currentIndex]
                    });

                    TweenMax.to(currentTab, 0.5, {
                        opacity: 0
                    });

                    TweenMax.to(currentModel, 0.5, {
                        opacity: 1,
                        onComplete: this.showCurrentModel,
                        onCompleteParams: [currentModel]
                    });

                    //Reset data position for non open elements
                    this.setDataPosition(currentIndex);
                },

                mouseUpParentEvent: function () {

                    if (animatingPanel) {

                        setTimeout(this.mouseUpParentEvent, 50);

                    } else {
                        settings.panels.eq(0).trigger("click");
                    }
                }
            };

        slideOutPanel.init();

        settings.callback.call(settings.self);
    };


    /**
     * The parameter object is optional.
     * Must be an object.
     */
    if(ba !== undefined) {
        if ($j('.accordion-mobile')) {
            ba.CmsAccordionMobileHtml = [];
            $j('.accordion-mobile').each(function(index) {
                $j(this).off();
                ba.CmsAccordionMobileHtml[index] = $j(this).html();
            });
            ba.CmsAccordionMobile = new CmsAccordionMobile({});
            ba.CmsAccordionMobile.settings.accordions.each(function() {
                $j(this).slideOutMobile();
            });
        }
    }
});

/*
* On window resize, each accordion must have its elements' widths recalculated and the slideOut functionality reinitialized
 */
$j(window).on('delayed-resize', function() {
    if ($j('.accordion-mobile')) {
        $j('.accordion-mobile')
            .attr('style', '')
            .off();
        $j('.accordion-mobile')
            .each(function(index) {
                $j(this).html( ba.CmsAccordionMobileHtml[index] );
            });
        ba.CmsAccordionMobile = new CmsAccordionMobile({});
        ba.CmsAccordionMobile.settings.accordions.each(function() {
            $j(this).slideOutMobile();
        });
    }
});
