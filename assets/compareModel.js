function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    // Return null if not found
    return null;
}

// let compareProducts = [];
// let comparePropArray = [];

// function _getComparePro() {
//     const availableProducts = localStorage.getItem('compareProducts');
//     comparePropArray = [];
//     if (availableProducts !== undefined && availableProducts !== null && availableProducts.length > 0) {
//         compareProducts = availableProducts.split(',');
//         $('[name="compare_product"]').prop('checked', false);
//         $(compareProducts).each((index, handle) => {
//             $(`[name="compare_product"][value="${handle}"]`).prop('checked', true);
  
//             axios.get(`/products/${handle}?view=json`)
//               .then((response) => {
//                 comparePropArray.push(response.data);
//               })
//               .catch((error) => {
//                 console.log(error);
//                 throw error;
//               });
//         });
//     } else {
//         $('[name="compare_product"]').prop('checked', false);
//     }
// }

function _addCompareProduct(proHandle) {
    let compare1 = localStorage.getItem("compare1");
    let compare2 = localStorage.getItem("compare2");

    if(compare1 == null && compare2 != proHandle ){
      localStorage.setItem("compare1", proHandle);
    }else if(compare2 == null && compare1 != proHandle ){
      localStorage.setItem("compare2", proHandle);
    }
}

function _removeCompareProduct(proHandle) {
    let compare1 = localStorage.getItem("compare1");
    let compare2 = localStorage.getItem("compare2");
    if (compare1 !== undefined && compare1 !== null) {
      if (compare1.indexOf(`${proHandle}`) > -1) {
        localStorage.removeItem('compare1');
      }
    } else if(compare2 !== undefined && compare2 !== null) {
      if (compare2.indexOf(`${proHandle}`) > -1) {
        localStorage.removeItem('compare2');
      }
    }
}

$(document).on('click', '[data-compare]', function(e){
    let handle = $(this).attr('data-product');
    if($(this).prop("checked") == true){
      $(this).parent('.tocompare').addClass('is-active');
      _addCompareProduct(handle);
      console.log("Checkbox is checked.");
    }
    else if($(this).prop("checked") == false){
      $(this).parent('.tocompare').removeClass('is-active');
      _removeCompareProduct(handle);
      console.log("Checkbox is unchecked.");
    }
});


$(document).on('click', '[data-clear]', function(e) {
  localStorage.removeItem('compare1');
  localStorage.removeItem('compare2');
  window.location.reload();
});

$(window).on('load', function(){
    let compare1 = localStorage.getItem("compare1");
    let compare2 = localStorage.getItem("compare2");
    if (compare1 !== undefined && compare1 !== null && compare2 !== undefined && compare2 !== null ){
        $('[data-compare-btn]').addClass('d-block').removeClass('d-none');
        $('.product_compare').addClass('d-block').removeClass('d-none');

        Shopify.getProduct(compare1, function(data) {
            var image = data.featured_image,
                title = data.title,
                price = theme.Currency.formatMoney(data.price, theme.moneyFormat),
                type = data.type,
                url = data.url,
                vendor = data.vendor
            if(window.location.href.indexOf('/pages/compare-model') > -1 ){
              $('[data-image1]').html('<a class="compare-product border-0" href="'+ url +'"><img class="compare_img" src="'+ image +'" alt="'+ title +'"></a>');
              $('[data-title1]').html(title);
              $('[data-price1]').html(price);
              $('[data-type1]').html(type);
              $('[data-vendor1]').html(vendor);
            }
        });

        Shopify.getProduct(compare2, function(data) {
          var image = data.featured_image,
              title = data.title,
              price = theme.Currency.formatMoney(data.price, theme.moneyFormat),
              type = data.type,
              url = data.url,
              vendor = data.vendor
              console.log(data);

          if(window.location.href.indexOf('/pages/compare-model') > -1 ){
            $('[data-image2]').html('<a class="compare-product border-0" href="'+ url +'"><img class="compare_img" src="'+ image +'" alt="'+ title +'"></a>');
            $('[data-title2]').html(title);
            $('[data-price2]').html(price);
            $('[data-type2]').html(type);
            $('[data-vendor2]').html(vendor);
          }
      });
    } else{
      $('.no_products').addClass('d-block').removeClass('d-none');
      $('.product_compare').addClass('d-none').removeClass('d-block');
    }
});