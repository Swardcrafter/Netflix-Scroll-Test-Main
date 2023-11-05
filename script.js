const cardList = document.querySelector(".card-list");
const leftButton = document.getElementById("left-button");
const cards = document.querySelectorAll(".card");

let currentIndex = 0;
let currTimes = 0;

let db = loadDatabase();

leftButton.addEventListener("click", () => {
	currentIndex = (currentIndex + 1) % cards.length;
	const cardWidth = cards[0].offsetWidth;
	const translateX = -currentIndex * cardWidth;

	currTimes += 1;

	
	cardList.style.transform = `translateX(${translateX}px)`;
	cardList.style.transform = `translateX(${translateX*2}px)`;
	cardList.style.transform = `translateX(${translateX*3}px)`;
	cardList.style.transform = `translateX(${translateX*4}px)`;
	cardList.style.transform = `translateX(${translateX*5}px)`;
	cardList.style.transform = `translateX(${translateX*6}px)`;
	cardList.style.transform = `translateX(${translateX*7}px)`;

	cardList.addEventListener('transitionend', handleTransitionEnd);
})


function handleTransitionEnd(event) {
	if (event.propertyName === 'transform') {
		// The 'transitionend' event for the 'transform' property has fired, indicating the transition is finished
		cardList.removeEventListener('transitionend', handleTransitionEnd); // Remove the event listener
		if (currTimes === 2) {
			// Reset the transition, currentIndex, and transform after 2 clicks
			cardList.style.transition = "none";
			currTimes = 0;
			currentIndex = 0;
			cardList.style.transform = "translateX(0px)";
			
			// Restore the transition after resetting
			setTimeout(() => {
			cardList.style.transition = "transform 0.5s";
			}, 0);
		}
	}
}

async function loadDatabase() {
	try {
		const response = await fetch('database.json'); // Replace with the actual path to your JSON file
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error loading database:', error);
		return {};
	}
}

async function click_image() {
    try {
        // Get the alt attribute of the clicked image
        const altText = event.target.getAttribute("alt");
        const db = await loadDatabase();
        const link = db["movies"][altText];

        if (link) {
            window.location.href = link;
        } else {
            console.error(`Movie not found for alt text: ${altText}`);
        }
    } catch (error) {
        console.error('Error in click_image:', error);
    }
}