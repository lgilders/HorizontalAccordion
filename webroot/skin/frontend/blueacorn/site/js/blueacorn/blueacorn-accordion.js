/**
 * @package     Blueacorn/Accordion
 * @version     1.0
 * @author      Blue Acorn <code@blueacorn.com>
 * @copyright   Copyright © 2015 Blue Acorn.
 */

function CmsAccordion(options) {
    this.init(options);
}

jQuery(document).ready(function ($) {

    CmsAccordion.prototype = {
        init: function (options) {
            this.settings = {
                'moduleName': 'Accordion',
                'accordions': $j('.accordion')
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
                accordionWrapper = accordion.closest('.accordion-wrapper'),
                tabs = accordion.find('.tab'),
                contents = accordion.find('.contentHolder'),
                panels = accordion.find('.panelHolder'),
                activePanel = accordion.find('.panelHolder.active'),
                tabTitles = accordion.find('.tab p'),
                accordionWrapperWidth = accordionWrapper.width(),
                tabsWidth = accordionWrapperWidth * 0.4, // 40% of visible window
                contentsWidth = accordionWrapperWidth * 0.6, // 60% of visible window
                numTabs = accordion.find('.tab').length - 1, // Number of tabs configurable by end user minus the active tab
                tabWidth = tabsWidth / numTabs,
                calculatedHeight = accordionWrapperWidth * 0.368; // Computed percentage from mock-up height ratio

            // Set accordion to the window's width
            accordion.width(accordionWrapperWidth);
            accordion.height(calculatedHeight);

            // Set the tabs to a percentage of the tabsWidth
            tabs.width(tabWidth);
            tabs.height(calculatedHeight);
            tabTitles.width(calculatedHeight); // Because the titles are rotated, their width should be the same as the height

            // All panels start with the same width as the tabs minus the width of the right border on each tab
            panels.width(tabWidth - 4);
            panels.height(calculatedHeight);

            // The active panel starts with the same width as the main contents area
            activePanel.width(contentsWidth);

            // Set the contentHolders to the contentsWidth
            contents.width(contentsWidth);
        }
    };

    $.fn.slideOut = function (options) {

        var defaults = {
                self: this,
                panels: this.children(".panelHolder"),
                tabs: this.find(".tab"),
                model: this.find(".model"),
                callback: function () {
                }
            },

            settings = $.extend({}, defaults, options),

            divPositionRight = [],

            divPositionLeft = [],

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

                currentContainerWidth: settings.self.width(),

                tabWidth: settings.tabs.outerWidth(true),

                modelWidth: settings.model.width(),

                setPanel: function () {

                    var offset = parseFloat(settings.panels.css("padding-right"));

                    //Get the position of each panel and put it in an array
                    settings.panels.each($.proxy(this.positionLoop, this, offset))
                        .each(this.setPanelPosition);
                },

                positionLoop: function (offset, index, val) {

                    var $this = $(val),
                        leftPostion = $this.position().left;

                    divPositionRight.push(leftPostion);

                    //What the position of the panel will be when it is on the right side
                    divPositionLeft.push((this.tabWidth + offset) * index);

                },

                setPanelPosition: function (index, val) {

                    //Position each panel absolutely based off of the position it was in the dom on load
                    $(val).css({
                        left: divPositionRight[index],
                        position: "absolute"
                    }).data("right", divPositionRight[index]).data("position", "right");
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
                        currentLeftPosition = parseFloat($this.css("left"));

                    //Set the data so when the event is call it know how to animate
                    if (index < selectedIndex) {

                        $this.data("position", "left");

                    } else {

                        $this.data("position", "right");
                    }

                    /*
                     * Check to see if the element you clicked has other panels in front of it
                     * if it does move all the panels to the left or right
                     *
                     */

                    if (currentLeftPosition !== divPositionLeft[index] && $this.data("position") === "left") {

                        TweenMax.to($this, 0.5, {
                            left: divPositionLeft[index]
                        });

                    } else if (index !== selectedIndex && currentLeftPosition !== divPositionRight[index] && $this.data("position") === "right") {

                        TweenMax.to($this, 0.5, {
                            left: divPositionRight[index]
                        });
                    }
                },

                mouseDownPanelEvent: function (event) {

                    var $this = $(event.currentTarget), //Element that was clicked
                        currentIndex = $this.index(), //Element index
                        active = settings.self.find("." + active_string);

                    if (!$this.hasClass(active_string) && animatingPanel === false) {

                        if ($this.data("position") !== "right") {

                            this.openPanelLeft($this, active, currentIndex);

                        } else {

                            this.openPanelRight($this, active, currentIndex);
                        }
                    }
                },

                showModelTab: function ($ele) {

                    $ele.parents("." + panelHolder_string).removeClass(active_string);
                },

                hideModelTab: function ($ele) {

                    $ele.parents("." + panelHolder_string).css({
                        left: $ele.data("right"),
                        width: this.tabWidth
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

                openPanelLeft: function ($this, active, currentIndex) {

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
                        width: this.modelWidth
                    });

                    TweenMax.to(currentTab, 0.5, {
                        left: active.data("right"),
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

                openPanelRight: function ($this, active, currentIndex) {

                    var modelImg = active.find("." + model_string),
                        modelTab = active.find("." + tab_string),
                        currentTab = $this.find("." + tab_string),
                        currentModel = $this.find("." + model_string);

                    animatingPanel = true;

                    TweenMax.to(active, 0.5, {
                        width: this.tabWidth
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
                        width: this.modelWidth,
                        left: divPositionLeft[currentIndex]
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
        if ($j('.accordion')) {
            ba.CmsAccordionHtml = [];
            $j('.accordion').each(function(index) {
                $j(this).off();
                ba.CmsAccordionHtml[index] = $j(this).html();
            });
            ba.CmsAccordion = new CmsAccordion({});
            ba.CmsAccordion.settings.accordions.each(function() {
                $j(this).slideOut();
            });
        }
    }
});

/*
 * On window resize, each accordion must have its elements' widths recalculated and the slideOut functionality reinitialized
 */
$j(window).on('delayed-resize', function() {
    if ($j('.accordion')) {
        $j('.accordion')
            .attr('style', '')
            .off();
        $j('.accordion')
            .each(function(index) {
                $j(this).html( ba.CmsAccordionHtml[index] );
            });
        ba.CmsAccordion = new CmsAccordion({});
        ba.CmsAccordion.settings.accordions.each(function() {
            $j(this).slideOut();
        });
    }
});