var Airtable = require('airtable');

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'patplT27f8dLZYLKB.c3b8f284e1aeab9368f976f00567c35a20f9db82e6fcb822c2cc28ffb29e08b8'
});

var base = Airtable.base('appXLGtSMvG5EJKyV');
const table = base('Project Image Archive');

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
            const recordDescription = record.get('Description')
            const recordText = recordName + "<br><br>" + recordType + "<br>" + recordMedium + "<br>" + recordYear + "<br><br>" + recordDescription
            const recordImage = record.get('Image')[0]['url']

            // Create DIVs
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.dataset.description = recordText;
            gridItem.dataset.img = recordImage;

            const img = document.createElement('img');
            img.src = recordImage;
            img.alt = '';

            gridItem.appendChild(img);
            rightPanelContent.appendChild(gridItem);

        });

        // After all grid items are created, add event listeners
        addEventListenersToGridItems();

        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

generateGridItemsAirtable();

function addEventListenersToGridItems() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            displayImage(index);
            enlargedView.style.display = 'block';
            defaultText.style.display = 'none';
            description.style.display = 'block';
            linksContainer.classList.add('hidden');
        });
    });

    const prevLink = document.getElementById('prev-link');
    const nextLink = document.getElementById('next-link');

    prevLink.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + gridItems.length) % gridItems.length;
        displayImage(currentIndex);
    });

    nextLink.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % gridItems.length;
        displayImage(currentIndex);
    });
}

const enlargedView = document.querySelector('.enlarged-view');
const enlargedImage = document.querySelector('.enlarged-image');
const closeLink = document.getElementById('close-link');
const defaultText = document.querySelector('.default-text');
const description = document.querySelector('.description');
const linksContainer = document.querySelector('.links-container');

let currentIndex = 0;

closeLink.addEventListener('click', () => {
    enlargedView.style.display = 'none';
    defaultText.style.display = 'block';
    description.style.display = 'none';
    linksContainer.classList.remove('hidden');
});

function displayImage(index) {
    const currentItem = document.querySelectorAll('.grid-item')[index];
    enlargedImage.src = currentItem.dataset.img;
    const descriptionSegments = currentItem.dataset.description.split('|');
    description.innerHTML = descriptionSegments.join('<br>');
}
