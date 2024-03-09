

var Airtable = require('airtable');


Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'patplT27f8dLZYLKB.c3b8f284e1aeab9368f976f00567c35a20f9db82e6fcb822c2cc28ffb29e08b8'
});

var base = Airtable.base('appXLGtSMvG5EJKyV');
const table = base('Project Image Archive');

// base('Image and Descriptions').select({
//     view: "Grid view"
// }).eachPage(function page(records, fetchNextPage) {
//     // This function (`page`) will get called for each page of records.
//     records.forEach(function (record) {

//         recordType = record.get('Type')
//         recordMedium = record.get('Medium')
//         recordYear = record.get('Year')

//         recordName = record.get('Name')
//         recordText = recordType + "<br>" + recordMedium + "<br>" + recordYear
//         recordDescription = record.get('Description')

//         recordImage = record.get('Image')[0]['thumbnails']['large']['url']

//         console.log(recordText);
//         // console.log(recordDescription);

//     });

//     fetchNextPage();

// }, function done(err) {
//     if (err) { console.error(err); return; }
// });




console.log('itssmee')



const gridData = [
    {
        "description": "Folly #2<br>•<br>Vernon Water Treatment Facility<br>Graphic Media<br>2017<br>•<br>A still form arises from the water. This vignette was proposed during Vernon Water Treatment Facility as one of the follies punctuating the site.",
        "imgSrc": "../assets/img1.jpg"
    },
    {
        "description": "Portfolio Cover 2015<br>Portfolio<br>Graphic Media<br>2015<br><br>Portfolio cover featuring a grid pattern of primitive geometries.",
        "imgSrc": "../assets/img2.jpg"
    },
    {
        "description": "Formal Exploration<br>Unspecified<br>Graphic Media<br>2015<br><br>An exploration of how to attain complexity through the repeated utilization of single-curved planes. Rendered with an overlayed normals map.",
        "imgSrc": "../assets/img3.jpg"
    },

    // Add more grid items as needed
];



function generateGridItemsAirtable() {
    const rightPanelContent = document.getElementById('right-panel-content');

    base('Image and Descriptions').select({
    view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function (record) {

            // Store fields in variables

            const recordType = record.get('Type')
            const recordMedium = record.get('Medium')
            const recordYear = record.get('Year')

            const recordName = record.get('Name')
            const recordText = recordType + "<br>" + recordMedium + "<br>" + recordYear
            const recordDescription = record.get('Description')

            const recordImage = record.get('Image')[0]['thumbnails']['large']['url']


            // Create DIVs
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.dataset.description = recordDescription;
            gridItem.dataset.img = recordImage;

            const img = document.createElement('img');
            img.src = recordImage;
            img.alt = '';

            gridItem.appendChild(img);
            rightPanelContent.appendChild(gridItem);

        });

        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });

}

generateGridItemsAirtable()


// function generateGridItems() {
//     const rightPanelContent = document.getElementById('right-panel-content');

//     gridData.forEach(item => {
//         const gridItem = document.createElement('div');
//         gridItem.classList.add('grid-item');
//         gridItem.dataset.description = item.description;
//         gridItem.dataset.img = item.imgSrc;

//         console.log(item.imgSrc)

//         const img = document.createElement('img');
//         img.src = item.imgSrc;
//         img.alt = '';
    

//         gridItem.appendChild(img);
//         rightPanelContent.appendChild(gridItem);
//     });

// }

// generateGridItems();



const gridItems = document.querySelectorAll('.grid-item');
const enlargedView = document.querySelector('.enlarged-view');
const enlargedImage = document.querySelector('.enlarged-image');
const closeLink = document.getElementById('close-link');
const prevLink = document.getElementById('prev-link');
const nextLink = document.getElementById('next-link');
const defaultText = document.querySelector('.default-text');
const description = document.querySelector('.description');
const linksContainer = document.querySelector('.links-container');

let currentIndex = 0;

gridItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        displayImage();
        enlargedView.style.display = 'block';
        defaultText.style.display = 'none';
        description.style.display = 'block';
        linksContainer.classList.add('hidden');
    });
});

prevLink.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + gridItems.length) % gridItems.length;
    displayImage();
});

nextLink.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % gridItems.length;
    displayImage();
});

closeLink.addEventListener('click', () => {
    enlargedView.style.display = 'none';
    defaultText.style.display = 'block';
    description.style.display = 'none';
    linksContainer.classList.remove('hidden');
});

function displayImage() {
    const currentItem = gridItems[currentIndex];
    enlargedImage.src = currentItem.dataset.img;
    const descriptionSegments = currentItem.dataset.description.split('|');
    description.innerHTML = descriptionSegments.join('<br>');
}




