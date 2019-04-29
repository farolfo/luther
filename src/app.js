$(function() {

    var searchSettings = {
        text: '',
        category: 'all'
    };

    var allNgos = getNgos();

    function buildVerifiedIcon(ngo) {
        var verifiedTag = '';

        if (ngo.verification.twitter || ngo.verification.facebook) {
            verifiedTag = '<i class="verified fas fa-check-circle" aria-hidden="true"></i>';
            return verifiedTag;
        }

        return verifiedTag;
    }

    function populateList(ngos) {
        ngos.forEach(function(ngo) {
            $('.coverflow').append("" +
            "<div id=\"ngoId" + ngo.id + "\" class=\"cover\">" +
              "<span class=\"header\">" + ngo.name + buildVerifiedIcon(ngo) + "</span>" +
              "<span class=\"image\" style=\"background: url(ngo/img/" + ngo.image + ") no-repeat center center; background-size: cover;\"></span>" +
              "<span class=\"footer\">" + ngo.slogan + "</span>" +
            "</div>");
        });

        $('.coverflow').coverflow();
    }

    window.search = function() {
        searchSettings.text = $('#search-text').text();
        clearList();
        populateList(filterBySearch());
    }

    function clearList() {
        $('.coverflow').html('');
    }

    function filterBySearch() {
        return _.filter(allNgos, function(item) {
            return containsText(item, searchSettings.text.toLowerCase()) || fitsCategory(item, searchSettings.category);
        });
    }

    function containsText(item, text) {
        if (text == '') {
            return true;
        }

        return item.name.toLowerCase().search(text) != -1 || item.slogan.toLowerCase().search(text) != -1;
    }

    function fitsCategory(item, category) {
        if (category == 'all') {
            return true;
        }

        return item.categories.includes(category);
    }

    populateList(allNgos);

    window.setCategory = function(category) {
        searchSettings.category = category;
        $('#category').text(event.srcElement.text);
    }
});
