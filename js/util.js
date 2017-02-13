// Get the date from sql datetime object
function parseDate(dateObject) {
    return $.format.date(dateObject, "dd-MM-yyyy");
}
// Get the time from sql datetime object
function parseTime(dateObject) {
    return $.format.date(dateObject, "HH:mm");
}

function isInArray(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (value === array[i]) {
            return true;
        }
    }
    return false;
}

/**
 * Simple text view to display if query returns an empty set
 */
function createNoMatchesView(message) {
    return '<h3 class="faded-border">' + message + '</h3>';
}

/**
 * Creates an indicator for every slide in the carousel
 */
function createCarouselIndicators(numberOfIndicators) {
    var indicatorHtml =  '<ol class="carousel-indicators">';
    indicatorHtml += '<li data-target="#carousel-teams" class="active" data-slide-to="'+0+'"></li>';
    for (var indicator = 1; indicator < numberOfIndicators; indicator++) {
        indicatorHtml += '<li data-target="#carousel-teams" data-slide-to="'+indicator+'"></li>';
    }
    indicatorHtml += '</ol>';
    return indicatorHtml;
}

/**
 * Creates a thumbnail of selected team
 */
function createCarouselTeam(teamData) {
    //TODO: when talking with the database, teamData will be an object instead of a string, use accordingly
    var carouselTeam = '<div class="col-md-2 col-sm-4 col-xs-6">'
    +   '<a href="#" class="thumbnail team-toggle" role="button" data-team="'+teamData+'" data-target="#team-upcoming-games">'
    +   '<h3>' +teamData+ '</h3>'
    +   '</a></div>';
    return carouselTeam;
}

/**
 * Creates a carousel filled with the teams of selected league
 */
function createCarouselViewHtml(teamList) {
    let numOfTeams = teamList.length; 
    let numOfIndicators = Math.ceil(numOfTeams / 6); 
    let count = 0;
    let count6 = 0;

    let carouselView = '<div id="carousel-teams" class="carousel slide">';
    carouselView += createCarouselIndicators(numOfIndicators);

    // create the slides with 6 teams max per page
    carouselView += '<div class="carousel-inner">'; 
    for (var team of teamList) {
        if (count === 0 && count6 === 0) {
            carouselView += '<div class="item active" data-indicator="'+count6+'">'
            +   '<div class="row text-center ">'; 
        }
        else if (count === 0) {
            carouselView += '<div class="item" data-indicator="'+count6+'">'
            +   '<div class="row text-center ">'; 
        }
        carouselView += createCarouselTeam(team);
        count++;
        if (count === 6) {
            carouselView += '</div></div>';
            count = 0;
            count6++;
        };
    };
    if (count > 0) {
        carouselView += '</div></div>';
    }

    carouselView += '</div>'
    +   '<a data-slide="prev" href="#carousel-teams" class="left carousel-control">‹</a>'
    +   '<a data-slide="next" href="#carousel-teams" class="right carousel-control">›</a>'
    +   '</div>';
    return carouselView;
}

/**
 * Creates a collapsible tab of match information
 */
function createProductDetailHtml(product) {
    var productDetailBox = '<div class="col-md-3 col-sm-6 col-xs-12 faded-border" role="button">' 
    +   '<div class="col-xs-12 collapsed" data-toggle="collapse" data-target="#game-details-'+product.id+'">' 
    +       product.home + ' - ' + product.away 
    +   '</div>' 
    +   '<div class="col-xs-12 collapse" id="game-details-'+product.id+'">' 
    +       '<hr>' 
    +       '<p>' + parseDate(product.startdate) +'</p>' 
    +       '<p>' + parseTime(product.startdate) + ' - ' + parseTime(product.stopdate) + '</p>' 
    +       '<p>' + product.price + ':-</p>' 
    +       '<button class="btn btn-buy btn-block" type="button" data-product-id="'+product.id+'">Köp</button>' 
    +   '</div>' 
    +'</div>';
    return productDetailBox;
}

/**
 * Displays all the products returned from the database
 */
function createProductViewHtml(productList, title) {
    var productViewRow = '<div class="row text-center">' +
        '<h1 class="col-md-12">' + title + '</h1>';
    for (var i = 0; i < productList.length; i++) {
        var pDetails = createProductDetailHtml(productList[i]);
        productViewRow += pDetails;
    }
    productViewRow += '</div>';
    return productViewRow;
}

/**
 * Creates table data for one product
 */
function createCheckoutProductHtml(product) {
    let html = 
        '<tr>'
    +       '<td data-th="Product">'
    +           '<div class="row">'
    +               '<div class="col-sm-2 hidden-xs">'
    +                   '<img src="http://placehold.it/100x100" alt="..." class="img-responsive"/>'
    +               '</div>'
    +               '<div class="col-sm-10">'
    +                   '<h4 class="nomargin">' + product.home + ' - ' + product.away + '</h4>'
    +                   '<p>'   + parseDate(product.startdate) + '   ' 
                                + parseTime(product.startdate) + ' - ' 
                                + parseTime(product.stopdate) 
    +                   '</p>'
    +               '</div>'
    +           '</div>'
    +       '</td>'
    +       '<td data-th="Price">' + product.price + ' :-' + '</td>'
    +       '<td class="actions text-right" data-th="">'
    +           '<button class="btn btn-danger btn-sm btn-delete"><i class="glyphicon glyphicon-trash"></i></button>'
    +       '</td>'
    +   '</tr>';
    return html;
}

function createCheckoutTableBodyHtml(productList) {
    let html = '';
    for (let product of productList) {
        html += createCheckoutProductHtml(product);
    }
    return html;
}
