var tabList = $('#tablist')
var tabCont = $('.tab-content')
var isActive

class LocObj {
    type: string;
    location: string;
    postalCode: number;
    address: string;
    img: string;
    country: string;
    private description: string;
    createdDate: Date;
    createdTime: string;
    createdDateHrf: string;
    createdTimeHrf: string;
    tabPane;

    constructor(locObj) {

        this.type = locObj.type;
        this.location = locObj.location;
        this.postalCode = locObj.postalCode;
        this.address = locObj.address;
        this.img = locObj.img;
        this.country = locObj.country;
        this.description = locObj.description || "";
        this.createdDate = new Date(locObj.createdDate + "T" + locObj.createdTime);
        this.createdTime = locObj.createdTime;
        this.createdDateHrf = locObj.createdDate.split('-').reverse().join('.')
        this.createdTimeHrf = locObj.createdTime;
        this.tabPane;
    }

    display() {
        let listItem = $(`<li class="nav-item"><a class="nav-link ${isActive}" data-toggle="tab" href="#${this.location}">${this.location}</a></li>`)
        tabList.append(listItem)

        let tabPane = $(`<div id="${this.location}" class="container tab-pane ${isActive}">`);
        let imgCont = $(`<div class="bg imageContainer" style="background-image: url('${this.img}')">`).text(`Welcome to ${this.location}`);
        let text = $(`<div class="text">
                <p>${this.description}</p>
                <p class="location"><i class='fas fa-map-marker-alt'></i> ${this.address}, ${this.postalCode} ${this.location}, ${this.country}</p>
                <p class="location create"> created: ${this.createdDateHrf} at ${this.createdTimeHrf} </p>
                </div>`)
        let detail = $(`<div class="LocationDetails"><h1 class="mainHeader">Restaurants & Cafés</h1><div class="contentContainer row " id="restaurantDetail${this.location}"></div><h1 class="mainHeader" >Events</h1><div class="contentContainer row " id="eventDetail${this.location}"></div></div>`)
        tabPane.append(imgCont)
        tabPane.append(text)
        tabPane.append(detail)
        isActive = ""
        tabCont.append(tabPane)
        console.log(this.location)
    }
}

class RestaurantObj extends LocObj {
    name: string;
    category: string;
    url: string;
    telephone: string;

    constructor(restaurantObj) {
        super(restaurantObj);
        this.name = restaurantObj.name;
        this.category = restaurantObj.category;
        this.url = restaurantObj.url;
        this.telephone = restaurantObj.telephone;
    }

    display() {
        let restaurantDetail = $(`#restaurantDetail${this.location}`)
        let contItem = $(`<div class="contentItem col-xs-12 col-sm-12 col-md-6 col-lg-3">
                        <div class="contentText">
                            <h1>${this.name}</h1>
                            <p>${this.category}</p>
                            <p><i class='fas fa-phone'></i> ${this.telephone}</p>
                            <p><i class='fas fa-globe'></i> <a href="${this.url}">${this.url}</a>
                            </p>
                            <p><i class='fas fa-map-marker-alt'></i> ${this.address}, ${this.postalCode} ${this.location} </p>
                            <span>created: ${this.createdDateHrf} at ${this.createdTimeHrf} </span>

                        </div>
                        <div class="contentImage">
                            <img src="../img/${this.img}" alt="">
                        </div>
                    </div>`)
        restaurantDetail.append(contItem)
    }

}

class EventObj extends LocObj {
    name: string;
    hrfDate: string;
    hrfTime: string;
    price: string;
    url: string;

    constructor(eventObj) {
        super(eventObj);
        this.name = eventObj.name;
        this.hrfDate = eventObj.hrfDate;
        this.hrfTime = eventObj.hrfTime;
        this.price = eventObj.price;
        this.url = eventObj.url;

    }

    display() {
        console.log(this.name)

        let eventDetail = $(`#eventDetail${this.location}`)
        let contItem = $(`<div class="contentItem col-xs-12 col-sm-12 col-md-6 col-lg-3">
                        <div class="contentText">
                            <h1>${this.name}</h1>
                           <p><i class='fas fa-calendar-alt'></i> ${this.hrfDate}</p>
                            <p><i class='far fa-clock'></i> ${this.hrfTime}</p>
                            <p><i class='fas fa-tag'></i> ${this.price}</p>
                            <p><i class='fas fa-map-marker-alt'></i> ${this.address}, ${this.postalCode} ${this.location} </p>
                            <p><a href="${this.url}">${this.url}</a></p>
                            <span>created: ${this.createdDateHrf} at ${this.createdTimeHrf} </span>
                        </div>
                        <div class="contentImage">
                            <img src="../img/${this.img}" alt="">
                        </div>
                        </div>
                    </div>`)

        eventDetail.append(contItem)
    }
}


function propComparator() {
    return function (a, b) {
        if (a.createdDate < b.createdDate) {
            return -1;
        }
        if (a.createdDate > b.createdDate) {
            return 1;
        }
        return 0;
    }
}


function sortContentByCreatedDate() {
    function orderLocations() {
        for(let dataObj of dataObjList) {
            if(dataObj.type === 'location') {
                orderedDataObjList.push(dataObj)
            }
        }
        orderedDataObjList.sort(propComparator())
        if (orderDirection === "desc") {
            orderedDataObjList.reverse()
        }
    }

    function orderLocationContents() {
        dataObjList.sort(propComparator());

        if (orderDirection === "desc") {
            dataObjList.reverse()
        }

        for(let dataObj of dataObjList) {
            if(dataObj.type !== 'location') {
                orderedDataObjList.push(dataObj)
            }
        }
    }

    var orderDirection = this.getAttribute('value');
    var orderedDataObjList = []
    // Ensure that the locations are always ordered first, they
    // need to be created first in order that we can append the restaurants/events
    // to that location
    orderLocations()
    // Now order the rest of the content
    orderLocationContents()

    dataObjList = orderedDataObjList

    populateSite()
}

function populateSite() {
    isActive = 'active'
    tabList.empty()
    tabCont.empty()
    for (let item of dataObjList) {
        item.display()
    }
}

function getData() {
    return fetch('../json/data.json')
        .then(function (resp) {
            return resp.json();
        })
}

var dataObjList: any = []

getData().then(function (data) {
    for (let obj of data) {
        let objCls;
        if (obj.type === "location") {
            objCls = new LocObj(obj)
        } else if (obj.type === "restaurant") {
            objCls = new RestaurantObj(obj)
        } else if (obj.type === "event") {
            objCls = new EventObj(obj)
        }
        dataObjList.push(objCls)
    }

}).then(function () {
        populateSite()
    }
)


$('.sortButton').on('click', sortContentByCreatedDate)