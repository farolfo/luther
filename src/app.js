$(function() {

        var searchSettings = {
            text: '',
            category: 'all'
        };

        var allOngs = [
        	{
        		name: 'AntiWar',
        		bitcoinAddress: '1M87hiTAa49enJKVeT9gzLjYmJoYh9V98',
        		website: 'https://antiwar.com',
        		bitcoinAddressWebsite: 'https://antiwar.com/aapledge/bitcoin-donate.html',
        		slogan: 'Your best source for antiwar news, viewpoints and activites.',
        		image: 'antiwar.jpg',
                categories: ['people-health', 'world-peace']
        	},
        	{
        		name: 'Tunapanda',
        		bitcoinAddress: '1CU5YgjquupDw6UeXEyA9VEBH34R7fZ19b',
        		website: 'http://www.tunapanda.org/',
        		bitcoinAddressWebsite: 'http://www.tunapanda.org/',
        		slogan: 'Help us to spread digital era vocational training and increase personal freedom through self-expression.',
        		image: 'tunapanda.jpg',
                categories: ['technology', 'education']
        	},
        	{
        		name: 'Run 2 Rescue',
        		bitcoinAddress: '1AS3TiTqgJZK6CfNfqcbPXSx4PTFvfghvF',
        		website: 'http://run2rescue.com',
        		bitcoinAddressWebsite: 'http://run2rescue.com/bitcoin.html',
        		slogan: 'Run 2 Rescue is a Christian organization that will reach, rescue and restore victims of Human Trafficking.',
        		image: 'run2rescue.jpg',
                categories: ['people-health']
        	},
        	{
        		name: 'The Water Project',
        		bitcoinAddress: '14xEPWuHC3ybPMfv8iTZZ29UCLTUSoJ8HL',
        		website: 'https://thewaterproject.org/',
        		bitcoinAddressWebsite: 'https://thewaterproject.org/give-water',
        		slogan: 'We are committed to bringing people together to solve the problem of finding clean water.',
        		image: 'thewaterproject.jpg',
                categories: ['people-health']
        	},
        	{
        		name: 'OMNI NANO',
        		bitcoinAddress: '16Sy8mvjyNgCRYS14m1Rtca3UfrFPzz9eJ',
        		website: 'https://omninano.org/',
        		bitcoinAddressWebsite: 'https://omninano.org/donate-to-stem-education/',
        		slogan: 'We are a non-profit organization teaching students cutting-edge science, specifically nanotechnology.',
        		image: 'omninano.jpg',
            categories: ['computer-science', 'technology', 'education']
        	},
        	{
        		name: 'Sean\'s Outpost',
        		bitcoinAddress: '38ccq12hPFoiSksxUdr6SQ5VosyjY7s9AU',
        		website: 'http://www.seansoutpost.com/',
        		bitcoinAddressWebsite: 'http://www.seansoutpost.com/',
        		slogan: 'Over 167,360 meals fed to the homeless. With Bitcoin.',
        		image: 'seansoutpost.jpg',
            categories: ['people-health']
        	},
        	{
        		name: 'Songs of Love',
        		bitcoinAddress: '12eyokNMqMmWYA3wWHm3tGCgj5t9sDb6kV',
        		website: 'https://www.songsoflove.org',
        		bitcoinAddressWebsite: 'https://www.songsoflove.org/cryptocurrencies/',
        		slogan: 'The Songs of Love Foundation is a national nonprofit 501(c)(3) organization that creates free, personalized, original songs to uplift children and teens currently facing tough medical, physical or emotional challenges.',
        		image: 'songsoflove.png',
                categories: ['people-health', 'technology']
        	},
        	{
        		name: 'Free Software Foundation',
        		bitcoinAddress: '1PC9aZC4hNX2rmmrt7uHTfYAS3hRbph4UN',
        		website: 'http://www.fsf.org/',
        		bitcoinAddressWebsite: 'https://my.fsf.org/donate',
        		slogan: 'The Free Software Foundation (FSF) is a nonprofit with a worldwide mission to promote computer user freedom. We defend the rights of all software users.',
        		image: 'freesoftwarefoundation.png',
                categories: ['computer-science', 'technology']
        	},
        	{
        		name: 'Human Rights Foundation',
        		bitcoinAddress: '183J5pXWqYYsxZ7inTVw9tEpejDXyMFroe',
        		website: 'https://humanrights.foundation/',
        		bitcoinAddressWebsite: 'https://humanrights.foundation/donate/',
        		slogan: 'Human Rights Foundation is an independent association with the mission to effectively promote and protect all universally recognized human rights and fundamental freedoms regardless of linguistic or geographic barriers.',
        		image: 'humanrightsfoundation.jpg',
                categories: ['people-health']
        	}
        ];

        function populateList(ongs) {
            ongs.forEach(function(ong) {
                $('.coverflow').append("<div class=\"cover\" style=\"background: url(ong/img/" + ong.image + ") no-repeat center center; background-size: cover;\"><span class=\"header\">" + ong.name + "</span><span class=\"footer\">" + ong.slogan + "</span></div>");
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
            return _.filter(allOngs, function(item) {
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

        populateList(allOngs);

        window.setCategory = function(category) {
            searchSettings.category = category;
            $('#category').text(event.srcElement.text);
        }
});
