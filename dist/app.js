"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

$(function () {
  var ngos = getNgos();
  init(ngos);
  populateList(ngos);
});

var ONG =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ONG, _React$Component);

  function ONG() {
    _classCallCheck(this, ONG);

    return _possibleConstructorReturn(this, _getPrototypeOf(ONG).apply(this, arguments));
  }

  _createClass(ONG, [{
    key: "render",
    value: function render() {
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
  }]);

  return ONG;
}(React.Component);

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
    $('.results-grid').append("" + "<div id=\"ngoId" + ngo.id + "\" class=\"cover\">" + "<span class=\"header\">" + ngo.name + buildVerifiedIcon(ngo) + "</span>" + "<span class=\"image\" style=\"background: url(ngo/img/" + ngo.image + ") no-repeat center center; background-size: cover;\"></span>" + "<span class=\"footer\">" + ngo.slogan + "</span>" + "</div>");
  }); //    $('.coverflow').coverflow();
}

function clearList() {
  $('.results-grid').html('');
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
