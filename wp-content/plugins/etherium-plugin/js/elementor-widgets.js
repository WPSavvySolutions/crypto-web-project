'use strict';

jQuery(window).on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/etherium_blog_listing.default', function () {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(elements_slider_init, 300);
            setTimeout(fix_responsive_iframe, 600);
            setTimeout(custom_video_play_button, 800);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/etherium_portfolio_listing.default', function () {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(elements_slider_init, 500);
            setTimeout(isotope_init, 500);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/etherium_testimonial_carousel.default', function () {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(elements_slider_init, 500);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/etherium_product_categories.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(elements_slider_init, 500);
        }
        const slider_container = $scope.find('.product-categories-slider-container');
        if(jQuery(window).width() >= 992 && slider_container.hasClass('custom_cursor')) {
            const $slider = $scope.find('.product-categories-slider-container');
            const cursor = jQuery('.cursor_drag', $scope);
            function showCustomCursor(event) {
                cursor.css('left', event.clientX-5).css('top', event.clientY-5);
            }
            $slider.mousemove(showCustomCursor);

            $slider.mouseleave(function(e) {
                if(!jQuery('body').hasClass('elementor-editor-active')) {
                    jQuery('.owl-stage', $scope).css({cursor: 'auto'});
                    cursor.removeClass('active');
                    setTimeout(function() {
                        if(!cursor.hasClass('active')) {
                            cursor.hide();
                        }
                    }, 300); 
                }    
            });

            $slider.mouseenter(function(e) {
                if(!jQuery('body').hasClass('elementor-editor-active')) {
                    jQuery('.owl-stage', $scope).css({cursor: 'none'});
                    cursor.show();
                    setTimeout(function() {
                        cursor.addClass('active');
                    }, 10);  
                } 
            });
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/etherium_image_carousel.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(elements_slider_init, 500);
        }
        const $slider = $scope.find('.slider-wrapper');
        if(jQuery(window).width() >= 992 && $slider.hasClass('custom_cursor')) {
            const cursor = jQuery('.cursor_drag', $scope);
            function showCustomCursor(event) {
                cursor.css('left', event.clientX-5).css('top', event.clientY-5);
            }
            $slider.mousemove(showCustomCursor);

            $slider.mouseleave(function(e) {
                if(!jQuery('body').hasClass('elementor-editor-active')) {
                    jQuery('.owl-stage', $scope).css({cursor: 'auto'});
                    cursor.removeClass('active');
                    setTimeout(function() {
                        if(!cursor.hasClass('active')) {
                            cursor.hide();
                        }
                    }, 300); 
                }    
            });

            $slider.mouseenter(function(e) {
                if(!jQuery('body').hasClass('elementor-editor-active')) {
                    jQuery('.owl-stage', $scope).css({cursor: 'none'});
                    cursor.show();
                    setTimeout(function() {
                        cursor.addClass('active');
                    }, 10);  
                } 
            });
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/etherium_content_slider.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(elements_slider_init, 500);
            setTimeout(function() {
                show_product_auction_countdown($scope);
            }, 500);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/etherium_products.default', function ($scope) {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(function() {
                show_product_auction_countdown($scope);
            }, 500);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/section.default', function () {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            background_image_parallax(jQuery('[data-parallax="scroll"]'), 0.7);
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/etherium_store_listing.default', function ($scope) {
        if($scope.find('.etherium_store_listing_widget').hasClass('hide-email')) {
            $scope.find('.wcfmmp-store-wrap li').each(function() {
                jQuery(this).find('.fa-envelope').parent().hide();
            });
        }
        if($scope.find('.etherium_store_listing_widget').hasClass('hide-phone')) {
            $scope.find('.wcfmmp-store-wrap li').each(function() {
                jQuery(this).find('.fa-phone').parent().hide();
            });
        }
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/etherium_special_text.default', function ($scope) {
        const $wrapper = $scope.find('.special-text-wrapper');
        if($wrapper.hasClass('animate')) {
            const observer = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                  if (entry.isIntersecting) {
                    setTimeout(function() {
                        $wrapper.addClass('animated');
                    }, 300);
                    observer.unobserve($scope[0]);
                  }
                });
            });
            observer.observe($scope[0]);
        }        
    });
    elementorFrontend.hooks.addAction('frontend/element_ready/etherium_wpforms.default', function () {
        if ( jQuery('body').hasClass('elementor-editor-active') ) {
            setTimeout(initFloatPlaceholderInput, 500);
        }
    });
});