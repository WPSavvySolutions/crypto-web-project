/*
 * Created by Artureanec
*/
( function( jQuery ) {
    "use strict";
    function singleStoreSpacing() {
        if(jQuery('body').hasClass('theme-dark') && (jQuery('body').hasClass('wcfm-store-page') || jQuery('body').hasClass('wcfmmp-store-page'))) {
            if(jQuery('.header.header-position-over').innerHeight() > 0) {
                jQuery('.wcfmmp-single-store-holder').css('padding-top', jQuery('.header.header-position-over').innerHeight());
            } else if(jQuery('.mobile-header.mobile-header-position-over').innerHeight() > 0) {
                jQuery('.wcfmmp-single-store-holder').css('padding-top', jQuery('.mobile-header.mobile-header-position-over').innerHeight());
            }
        }        
    }
    jQuery(document).ready(function() {
        singleStoreSpacing();
        if(jQuery.fn.select2) {
        	jQuery('.woocommerce-shipping-methods .select2').select2();
        }        
        jQuery('form.checkout').on('change', 'select.shipping_method, input[name^="shipping_method"], #ship-to-different-address input, .update_totals_on_change select, .update_totals_on_change input[type="radio"], .update_totals_on_change input[type="checkbox"], select[name="billing_country"], select[name="shipping_country"], input[name="ship_to_different_address"]', function() {
            jQuery( '.woocommerce-checkout-review-total' ).block({
                message: null,
                overlayCSS: {
                    background: '#fff',
                    opacity: 0.6
                }
            });
        });
        jQuery('form.checkout').on('change', 'select[name="shipping_country"], select[name="billing_country"], input[name="ship_to_different_address"]', function() {
            jQuery( '.woocommerce-checkout-shipping-method > .woocommerce-shipping-methods' ).block({
                message: null,
                overlayCSS: {
                    background: '#fff',
                    opacity: 0.6
                }
            });   
        }); 
        (function($) {
            if(typeof $.WooUacountdown === 'undefined') {
                return;
            }
            $( ".uwa_auction_product_countdown" ).each(function( index ) {
                $(this).WooUacountdown('destroy');

                var time    = $(this).data('time');
                var format  = $(this).data('format');
                if(format == ''){
                    format = 'yowdHMS';
                }
                var compact;
                if(uwa_data.hide_compact == 'yes'){
                    compact  = true;
                } else{
                    compact  = false;
                }
                var etext = '<p>'+uwa_data.expired+'</p>';
                var countdown_labels = etherium_woo.countdown_labels;
                $(this).WooUacountdown({
                    labels: countdown_labels,
                    labels1: countdown_labels,
                    timeSeparator: ':',
                    until:   $.WooUacountdown.UTCDate(-(new Date().getTimezoneOffset()),new Date(time*1000)),
                    format: format,
                    compact:  compact,
                    onExpiry: CheckExpired,
                    expiryText: etext
                });
            });

            function CheckExpired(){
                var auction_id = jQuery(this).data('auction-id');
                jQuery(this).closest('.single-product-price-wrapper').find('.uwa_auction_end_time').empty();
                var auction_product_container = jQuery(this).closest('.summary').find('.uwa_auction_product_ajax_change'); 
                auction_product_container.empty().prepend('<div class="ajax-loading"></div>');
                auction_product_container.parent().children('form.buy-now').remove();
                var ajaxurl = UWA_Ajax_Qry.ajaqry+'=expired_auction';
                jQuery.ajax({
                 type : "post",
                 url : ajaxurl,
                 cache : false,
                 data : {action: "expired_auction", post_id : auction_id, ret: auction_product_container.length,Utnonce : Utnonce},
                 success: function(response) {
                        if (response.length  != 0){ 
                            auction_product_container.children('.ajax-loading').remove();
                            auction_product_container.prepend(response);                        
                        }
                    }
                });
            }

        })(jQuery);
    });
    jQuery(window).on('resize', function () {
        singleStoreSpacing();
    });
    jQuery(document.body).on( 'updated_shipping_method', function() {
        jQuery('.woocommerce-shipping-methods .select2').select2();
    } );
    jQuery(document.body).on('updated_checkout', function() {
        if (!jQuery('.woocommerce-shipping-methods .select2').hasClass("select2-hidden-accessible")) {
            jQuery('.woocommerce-shipping-methods .select2').select2();
        }              
    });
    jQuery(document.body).on('updated_wc_div', function() {
        jQuery('.woocommerce-shipping-methods .select2').select2();
    });
    jQuery(document.body).on('updated_checkout', function(){
        jQuery( '.woocommerce-checkout-shipping-method > .woocommerce-shipping-methods' ).unblock({
            message: null,
            overlayCSS: {
                background: '#fff',
                opacity: 0.6
            }
        });
        jQuery( '.woocommerce-checkout-review-total' ).unblock({
            message: null,
            overlayCSS: {
                background: '#fff',
                opacity: 0.6
            }
        });
    });
    jQuery(document.body).on('change', 'select[name="billing_country"], select[name="shipping_country"], input[name="ship_to_different_address"]', function(){
        jQuery(document.body).trigger('update_checkout');
    });
    jQuery( 'form.checkout_coupon' ).on( 'submit', function() {
        jQuery( '.woocommerce-checkout-review-total' ).block({
            message: null,
            overlayCSS: {
                background: '#fff',
                opacity: 0.6
            }
        });
    } );
    jQuery( document.body ).on( 'click', '.woocommerce-remove-coupon', function() {
        jQuery( '.woocommerce-checkout-review-total' ).block({
            message: null,
            overlayCSS: {
                background: '#fff',
                opacity: 0.6
            }
        });
    } );
    jQuery( document.body ).on( 'init_checkout', function() {
        jQuery( '.woocommerce-checkout-shipping-method > .woocommerce-shipping-methods' ).block({
            message: null,
            overlayCSS: {
                background: '#fff',
                opacity: 0.6
            }
        });
        jQuery( '.woocommerce-checkout-review-total' ).block({
            message: null,
            overlayCSS: {
                background: '#fff',
                opacity: 0.6
            }
        });
    } );

    function is_mobile () {
        if ( window.innerWidth < 768 ){
            return true;
        } else {
            return false;
        }
    }
    function is_mobile_device(){
        if ( navigator.userAgent.match( /(Android|iPhone|iPod|iPad|Phone|DROID|webOS|BlackBerry|Windows Phone|ZuneWP7|IEMobile|Tablet|Kindle|Playbook|Nexus|Xoom|SM-N900T|GT-N7100|SAMSUNG-SGH-I717|SM-T330NU)/ ) ) {
            return true;
        } else {
            return false;
        }
    }
    function not_desktop(){
        if( (window.innerWidth < 1367 && is_mobile_device()) || window.innerWidth < 1200 ){
            return true;
        } else {
            return false;
        }
    }

    function product_filters_open() {
        jQuery('.product-filters-trigger').on('click', function() {
            if (jQuery(window).width()< 992) {
                jQuery('.shop-hidden-sidebar, .body-overlay').addClass('active');
            }
        });
        jQuery('.shop-hidden-sidebar-close, .body-overlay').on('click', function() {
            jQuery('.shop-hidden-sidebar, .body-overlay').removeClass('active');
        });
    }
    product_filters_open();

    function custom_quantity() {
        jQuery('.uwa_auction_form .quantity').each(function() {
            jQuery(this).wrap('<div class="quantity-wrapper"></div>');
            jQuery('input[type="number"]', this).attr('value', Math.round(parseFloat(jQuery('input[type="number"]', this).attr('min')) * 100) /100 );
        });
        jQuery('.quantity-wrapper').each(function() {
            var auction_input = false;
            if(jQuery('input[type="number"]', this).attr('id') === 'uwa_bid_value') {
                auction_input = true;
            }
            if ( !jQuery(this).hasClass('styled') ) {
                if (!jQuery('.quantity', this).hasClass('hidden')) {
                    jQuery(this).addClass('styled').prepend('<div class="btn-minus"><i class="icon"></i></div>').append('<div class="btn-plus"><i class="icon"></i></div>');
                } else {
                    jQuery(this).addClass('hidden')
                }
                var spinner = jQuery(this),
                    input = spinner.find('input[type="number"]'),
                    btnUp = spinner.find('.btn-plus'),
                    btnDown = spinner.find('.btn-minus'),
                    min = input.attr('min'),
                    max = input.attr('max');
                if (typeof min !== typeof undefined && min !== false && min !== '' && min >= 1) {
                    min = parseInt(min);
                } else {
                    min = 0;
                }
                if (typeof max !== typeof undefined && max !== false && max !== '' && max > min) {
                    max = parseInt(max);
                } else {
                    max = 0;
                }

                if(auction_input) {
                    min = parseFloat(input.attr('min'));
                    max = parseFloat(input.attr('max'));
                }

                btnUp.on('click', function () {
                    if (input.val() == '') {
                        var oldValue = 0;
                    } else {
                        var oldValue = parseInt(input.val());
                        if(auction_input) {
                            oldValue = Math.round(parseFloat(input.val()) * 100) / 100;
                            max = Math.round(parseFloat(max) * 100) / 100;
                        }
                    }
                    if (oldValue >= max && max !== 0) {
                        var newVal = oldValue;
                    } else {
                        var newVal = oldValue + 1;
                    }
                    input.val(newVal);
                    if(auction_input) {
                        input.val( Math.round(newVal * 100) /100 );
                    }
                    input.trigger('change');
                });

                btnDown.on('click', function () {
                    if (input.val() == '') {
                        var oldValue = 0;
                    } else {
                        var oldValue = parseInt(input.val());
                        if(auction_input) {
                            oldValue = Math.round(parseFloat(input.val()) * 100) / 100;
                            min = Math.round(parseFloat(min) * 100) / 100;
                        }
                    }
                    console.log(oldValue);
                    if (oldValue <= min) {
                        var newVal = oldValue;
                    } else if(auction_input && Math.round((oldValue - 1) * 100) / 100 < min) {
                        var newVal = oldValue;
                    } else {
                        var newVal = oldValue - 1;
                    }
                    input.val(newVal);
                    if(auction_input) {
                        input.val( Math.round(newVal * 100) /100 );
                    }
                    input.trigger('change');
                });
            }
        });
    }
    custom_quantity();
    jQuery( document.body ).on( 'updated_cart_totals', function(){
        custom_quantity();
    });

// Change display mode
    jQuery('.woocommerce,.woocommerce-page').on('click', '.shop-mode-buttons a', function(e) {
        var mode = jQuery(this).hasClass('woocommerce-grid') ? 'grid' : 'list';
        var mode_old = jQuery(this).siblings('input').val();
        if ( mode != mode_old ) {
            jQuery.cookie('shop_mode', mode, {expires: 365, path: '/'});
            jQuery(this).siblings('input').val(mode).parents('form').get(0).submit();
        }
        e.preventDefault();
        return false;
    });

    /* ===========> Scripts Init <=========== */
    window.addEventListener( "load", function() {
        etherium_ajax_add_to_cart();
        etherium_trigger_mini_cart();
    });

    function etherium_trigger_mini_cart(){
        var cart = jQuery('.mini-cart-panel');
        cart.off();

        if( window.innerWidth >= 992 ){
            jQuery('.header .mini-cart-trigger').on('click', function(e){
                e.preventDefault();
                cart.addClass('active');

                jQuery('.close-mini-cart').off();
                etherium_close_mini_cart();
            });
        }
    }
    function etherium_close_mini_cart(){
        jQuery('.close-mini-cart').on('click', function(){
            jQuery('.mini-cart').removeClass('active');
        });
    }

    /* ===========> Ajax Add-To-Cart Declaration <=========== */
    function etherium_ajax_add_to_cart(){
        if ( typeof wc_add_to_cart_params !== 'undefined' ) {
            if(jQuery('.single_add_to_cart_button').closest('.product').hasClass('product-type-external')) {
                return;
            }
            jQuery('.single_add_to_cart_button').off().on('click', function (e) {
                if ( !(jQuery(this).hasClass('single_add_to_cart_button') && wc_add_to_cart_params.cart_redirect_after_add === 'yes') ) {
                    e.preventDefault();

                    var button = jQuery(this);
                    var form = button.closest('form.cart');
                    var product_id = form.find('input[name=add-to-cart]').val() || button.val() || form.find('.variation_id').val();

                    if (!product_id)
                        return;
                    if (button.is('.disabled'))
                        return;

                    var data = {
                        action: 'etherium_ajax_add_to_cart',
                        'add-to-cart': product_id,
                    };

                    form.serializeArray().forEach(function (element) {
                        data[element.name] = element.value;
                    });

                    jQuery(document.body).trigger('adding_to_cart', [button, data]);

                    jQuery.ajax({
                        type: 'POST',
                        'url': wc_add_to_cart_params.ajax_url,
                        data: data,
                        beforeSend: function (response) {
                            button.removeClass('added').addClass('loading');
                        },
                        complete: function (response) {
                            button.addClass('added').removeClass('loading');
                        },
                        success: function (response) {
                            if (response.error & response.product_url) {
                                window.location = response.product_url;
                                return;
                            } else {
                                jQuery(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash, button]);
                            }
                        }
                    });

                    return false;
                }
            });
        }
    }

    // Product Gallery thumbnails slider
    function single_product_thumb_slider() {
        jQuery('.woocommerce-product-gallery--with-images').find('.flex-control-nav').slick({
            mobileFirst:    true,
            prevArrow:      '<div class="slick-button slick-prev"></div>',
            nextArrow:      '<div class="slick-button slick-next"></div>',
            infinite:       false,
            responsive:     [
                {
                    breakpoint: 120,
                    settings: {
                        slidesToShow:    3,
                        vertical:        false,
                        verticalSwiping: false
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow:    4,
                        vertical:        false,
                        verticalSwiping: false
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow:    5,
                        vertical:        false,
                        verticalSwiping: false
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow:    4,
                        vertical:        false,
                        verticalSwiping: false
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow:    4,
                        vertical:        true,
                        verticalSwiping: true
                    }
                }
            ]
        });
    }
    setTimeout(single_product_thumb_slider, 500);

} ).call( this, jQuery );