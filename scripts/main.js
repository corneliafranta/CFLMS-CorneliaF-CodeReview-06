var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var tabList = $('#tablist');
var tabCont = $('.tab-content');
var isActive;
var LocObj = /** @class */ (function () {
    function LocObj(locObj) {
        this.type = locObj.type;
        this.location = locObj.location;
        this.postalCode = locObj.postalCode;
        this.address = locObj.address;
        this.img = locObj.img;
        this.country = locObj.country;
        this.description = locObj.description || "";
        this.createdDate = new Date(locObj.createdDate + "T" + locObj.createdTime);
        this.createdTime = locObj.createdTime;
        this.createdDateHrf = locObj.createdDate.split('-').reverse().join('.');
        this.createdTimeHrf = locObj.createdTime;
        this.tabPane;
    }
    LocObj.prototype.display = function () {
        var listItem = $("<li class=\"nav-item\"><a class=\"nav-link " + isActive + "\" data-toggle=\"tab\" href=\"#" + this.location + "\">" + this.location + "</a></li>");
        tabList.append(listItem);
        var tabPane = $("<div id=\"" + this.location + "\" class=\"container tab-pane " + isActive + "\">");
        var imgCont = $("<div class=\"bg imageContainer\" style=\"background-image: url('" + this.img + "')\">").text("Welcome to " + this.location);
        var text = $("<div class=\"text\">\n                <p>" + this.description + "</p>\n                <p class=\"location\"><i class='fas fa-map-marker-alt'></i> " + this.address + ", " + this.postalCode + " " + this.location + ", " + this.country + "</p>\n                <p class=\"location create\"> created: " + this.createdDateHrf + " at " + this.createdTimeHrf + " </p>\n                </div>");
        var detail = $("<div class=\"LocationDetails\"><h1 class=\"mainHeader\">Restaurants & Caf\u00E9s</h1><div class=\"contentContainer row \" id=\"restaurantDetail" + this.location + "\"></div><h1 class=\"mainHeader\" >Events</h1><div class=\"contentContainer row \" id=\"eventDetail" + this.location + "\"></div></div>");
        tabPane.append(imgCont);
        tabPane.append(text);
        tabPane.append(detail);
        isActive = "";
        tabCont.append(tabPane);
        console.log(this.location);
    };
    return LocObj;
}());
var RestaurantObj = /** @class */ (function (_super) {
    __extends(RestaurantObj, _super);
    function RestaurantObj(restaurantObj) {
        var _this = _super.call(this, restaurantObj) || this;
        _this.name = restaurantObj.name;
        _this.category = restaurantObj.category;
        _this.url = restaurantObj.url;
        _this.telephone = restaurantObj.telephone;
        return _this;
    }
    RestaurantObj.prototype.display = function () {
        var restaurantDetail = $("#restaurantDetail" + this.location);
        var contItem = $("<div class=\"contentItem col-xs-12 col-sm-12 col-md-6 col-lg-3\">\n                        <div class=\"contentText\">\n                            <h1>" + this.name + "</h1>\n                            <p>" + this.category + "</p>\n                            <p><i class='fas fa-phone'></i> " + this.telephone + "</p>\n                            <p><i class='fas fa-globe'></i> <a href=\"" + this.url + "\">" + this.url + "</a>\n                            </p>\n                            <p><i class='fas fa-map-marker-alt'></i> " + this.address + ", " + this.postalCode + " " + this.location + " </p>\n                            <span>created: " + this.createdDateHrf + " at " + this.createdTimeHrf + " </span>\n\n                        </div>\n                        <div class=\"contentImage\">\n                            <img src=\"../img/" + this.img + "\" alt=\"\">\n                        </div>\n                    </div>");
        restaurantDetail.append(contItem);
    };
    return RestaurantObj;
}(LocObj));
var EventObj = /** @class */ (function (_super) {
    __extends(EventObj, _super);
    function EventObj(eventObj) {
        var _this = _super.call(this, eventObj) || this;
        _this.name = eventObj.name;
        _this.hrfDate = eventObj.hrfDate;
        _this.hrfTime = eventObj.hrfTime;
        _this.price = eventObj.price;
        _this.url = eventObj.url;
        return _this;
    }
    EventObj.prototype.display = function () {
        console.log(this.name);
        var eventDetail = $("#eventDetail" + this.location);
        var contItem = $("<div class=\"contentItem col-xs-12 col-sm-12 col-md-6 col-lg-3\">\n                        <div class=\"contentText\">\n                            <h1>" + this.name + "</h1>\n                           <p><i class='fas fa-calendar-alt'></i> " + this.hrfDate + "</p>\n                            <p><i class='far fa-clock'></i> " + this.hrfTime + "</p>\n                            <p><i class='fas fa-tag'></i> " + this.price + "</p>\n                            <p><i class='fas fa-map-marker-alt'></i> " + this.address + ", " + this.postalCode + " " + this.location + " </p>\n                            <p><a href=\"" + this.url + "\">" + this.url + "</a></p>\n                            <span>created: " + this.createdDateHrf + " at " + this.createdTimeHrf + " </span>\n                        </div>\n                        <div class=\"contentImage\">\n                            <img src=\"../img/" + this.img + "\" alt=\"\">\n                        </div>\n                        </div>\n                    </div>");
        eventDetail.append(contItem);
    };
    return EventObj;
}(LocObj));
function propComparator() {
    return function (a, b) {
        if (a.createdDate < b.createdDate) {
            return -1;
        }
        if (a.createdDate > b.createdDate) {
            return 1;
        }
        return 0;
    };
}
function sortContentByCreatedDate() {
    function orderLocations() {
        for (var _i = 0, dataObjList_1 = dataObjList; _i < dataObjList_1.length; _i++) {
            var dataObj = dataObjList_1[_i];
            if (dataObj.type === 'location') {
                orderedDataObjList.push(dataObj);
            }
        }
        orderedDataObjList.sort(propComparator());
        if (orderDirection === "desc") {
            orderedDataObjList.reverse();
        }
    }
    function orderLocationContents() {
        dataObjList.sort(propComparator());
        if (orderDirection === "desc") {
            dataObjList.reverse();
        }
        for (var _i = 0, dataObjList_2 = dataObjList; _i < dataObjList_2.length; _i++) {
            var dataObj = dataObjList_2[_i];
            if (dataObj.type !== 'location') {
                orderedDataObjList.push(dataObj);
            }
        }
    }
    var orderDirection = this.getAttribute('value');
    var orderedDataObjList = [];
    // Ensure that the locations are always ordered first, they
    // need to be created first in order that we can append the restaurants/events
    // to that location
    orderLocations();
    // Now order the rest of the content
    orderLocationContents();
    dataObjList = orderedDataObjList;
    populateSite();
}
function populateSite() {
    isActive = 'active';
    tabList.empty();
    tabCont.empty();
    for (var _i = 0, dataObjList_3 = dataObjList; _i < dataObjList_3.length; _i++) {
        var item = dataObjList_3[_i];
        item.display();
    }
}
function getData() {
    return fetch('../json/data.json')
        .then(function (resp) {
        return resp.json();
    });
}
var dataObjList = [];
getData().then(function (data) {
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var obj = data_1[_i];
        var objCls = void 0;
        if (obj.type === "location") {
            objCls = new LocObj(obj);
        }
        else if (obj.type === "restaurant") {
            objCls = new RestaurantObj(obj);
        }
        else if (obj.type === "event") {
            objCls = new EventObj(obj);
        }
        dataObjList.push(objCls);
    }
}).then(function () {
    populateSite();
});
$('.sortButton').on('click', sortContentByCreatedDate);
