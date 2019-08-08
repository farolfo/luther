"use strict";

$(function () {
  var ngos = getNgos();
  init(ngos);
  populateList(ngos);
});
var Contact = React.createClass({
  displayName: "Contact",
  render: function render() {
    return React.createElement("li", {
      className: "contact"
    }, React.createElement("img", {
      src: this.props.image,
      width: "60px",
      height: "60px",
      className: "contact-image"
    }), React.createElement("div", {
      className: "contact-info"
    }, React.createElement("div", {
      className: "contact-name"
    }, this.props.name), React.createElement("div", {
      className: "contact-number"
    }, this.props.phoneNumber)));
  }
});

function init(ngos) {
  var searchSettings = {
    text: '',
    category: 'all'
  };

  window.search = function () {
    searchSettings.text = $('#search-text').text();
    clearList();
    populateList(filterBySearch(ngos, searchSettings));
  };

  window.setCategory = function (category) {
    searchSettings.category = category;
    $('#category').text(event.srcElement.text);
  };
}

function populateList(ngos) {
  ngos.forEach(function (ngo) {
    $('.coverflow').append("" + "<div id=\"ngoId" + ngo.id + "\" class=\"cover\">" + "<span class=\"header\">" + ngo.name + buildVerifiedIcon(ngo) + "</span>" + "<span class=\"image\" style=\"background: url(ngo/img/" + ngo.image + ") no-repeat center center; background-size: cover;\"></span>" + "<span class=\"footer\">" + ngo.slogan + "</span>" + "</div>");
  });
  $('.coverflow').coverflow();
}

function clearList() {
  $('.coverflow').html('');
}

function fitsCategory(item, category) {
  if (category == 'all') {
    return true;
  }

  return item.categories.includes(category);
}

function containsText(item, text) {
  if (text == '') {
    return true;
  }

  return item.name.toLowerCase().search(text) != -1 || item.slogan.toLowerCase().search(text) != -1;
}

function buildVerifiedIcon(ngo) {
  var verifiedTag = '';

  if (ngo.verification.twitter || ngo.verification.facebook) {
    verifiedTag = '<i class="verified fas fa-check-circle" aria-hidden="true"></i>';
    return verifiedTag;
  }

  return verifiedTag;
}

function filterBySearch(ngos, searchSettings) {
  return _.filter(ngos, function (item) {
    return containsText(item, searchSettings.text.toLowerCase()) || fitsCategory(item, searchSettings.category);
  });
} //function UserInfo(props) {
//  return (
//    <div className="UserInfo">
//      <Avatar user={props.user} />
//      <div className="UserInfo-name">
//        {props.user.name}
//      </div>
//    </div>
//  );
//}
