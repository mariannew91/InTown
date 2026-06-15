const lookingFor = document.getElementById('looking-for');
const groupBusiness = document.getElementById('group-business');
const kindOfThing = document.getElementById('kind-of-thing');
const listingTypeRadios = document.querySelectorAll('input[name="listing-type"]');
const listingElement = document.getElementById('listing-profile-name');

const aboutBtn = document.getElementById('about-btn');
const friendsBtn = document.getElementById('friends-btn');
const interestsBtn = document.getElementById('interests-btn');
const groupsBtn = document.getElementById('groups-btn');
const eventsBtn = document.getElementById('events-btn');
const bookmarksBtn = document.getElementById('bookmarks-btn');
const editProfileBtn = document.getElementById('edit-profile-btn');
const accountSettingsBtn = document.getElementById('profile-setting-btn');
const logoutBtn = document.getElementById('log-out-btn');

const aboutSection = document.getElementById('about-me');
const friendsSection = document.getElementById('my-friends');
const interestsSection = document.getElementById('my-interests');
const groupsSection = document.getElementById('my-groups');
const eventsSection = document.getElementById('my-events');
const bookmarksSection = document.getElementById('bookmarks');
const editProfileSection = document.getElementById('edit-profile');
const accSettingsSection = document.getElementById('acc-settings');
const logoutSection = document.getElementById('log-out-profile');

const stepOne = document.getElementById('form-step-one');
const stepTwo = document.getElementById('form-step-two');
const nextbtn = document.getElementById('next-to-step-two');
const backbtn = document.getElementById('back-to-step-one');
const submitBtn = document.getElementById('submit-listing');
const createAccBtn = document.getElementById('create-account');
const listingForm = document.getElementById('add-listing-form');

const priceSectionWrapper = document.getElementById('listing-price');
const oneEvent = document.getElementById('one-event-date');
const regularGroup = document.getElementById('regular-date-container');
const shortCourse = document.getElementById('short-course-container');
const volunteerOpportunity = document.getElementById('volunteer-date');
const ongoingActivity = document.getElementById('ongoing-multi-date');

const listingName = document.getElementById('group-name');
const groupLeader = document.getElementById('group-leader');
const businessLeader = document.getElementById('business');
const organiserName = document.getElementById('organiser-name-container');
const businessDescription = document.getElementById('business-desc-container');
const organiserDescription = document.getElementById('organiser-desc-container');

const locationSearch = window.location.search;
const urlParams = new URLSearchParams(locationSearch);
const listingId = urlParams.get('id');

const profileForm = document.getElementById('create-profile-form');
const profileFormElements = profileForm ? profileForm.elements : [];
const listingFormElements = listingForm ? listingForm.elements : [];

// Global Mappings
const profileMappings = {
    types: { 
        'type-regular': { full: 'Regular groups & clubs', short: 'Groups' }, 
        'Events': { full: 'Events', short: 'Events' }, 
        'Classes and Courses': { full: 'Classes & courses', short: 'Classes' }, 
        'Volunteering': { full: 'Volunteering opportunites', short: 'Volunteer' }, 
        'Family and Kids': { full: 'Family & kids activities', short: 'Family' }, 
        'Explore All Options': { full: "I'm open to all options", short: 'All' } 
    },
    interests: { 
        'cat-arts': { full: 'Arts', short: 'Arts' }, 
        'cat-sports': { full: 'Sports', short: 'Sports' }, 
        'cat-education': { full: 'Education', short: 'Education' }, 
        'cat-social': { full: 'Social', short: 'Social' }, 
        'cat-health': { full: 'Health & Wellbeing', short: 'Health' }, 
        'cat-food': { full: 'Food & Drink', short: 'Food' }, 
        'cat-music': { full: 'Music', short: 'Music' }, 
        'cat-outdoor': { full: 'Outdoors', short: 'Outdoors' }, 
        'cat-perform': { full: 'Performance', short: 'Performance' }, 
        'cat-family': { full: 'Family', short: 'Family' }, 
        'cat-hobby': { full: 'Hobby', short: 'Hobby' } 
    },
    hopes: {
        'hope-friends': { full: 'Make new friends', short: 'New Friends' },
        'hope-hobbies': { full: 'Try new hobbies', short: 'New Hobbies' },
        'hope-health': { full: 'Improve health', short: 'For Health' },
        'hope-get-out': { full: 'Get out more', short: 'Get Out' },
        'hope-learn': { full: 'Learn something new', short: 'Learn' },
        'hope-community': { full: 'Get involved in my community', short: 'Community' },
        'hope-fun': { full: 'Just have fun and try new experiences', short: 'Fun' }
    },
    ages: { 
        'age-all': { full: 'All Ages', short: 'All' }, 
        'age-child': { full: 'Children', short: 'Child' }, 
        'age-teen': { full: 'Teens', short: 'Teens' }, 
        'age-adult': { full: 'Adults', short: 'Adults' }, 
        'age-senior': { full: 'Seniors', short: 'Seniors' }, 
        'age-family': { full: 'Family', short: 'Family' } 
    }
};

listingTypeRadios.forEach(function(radio) {
    radio.addEventListener('change', function() {
        localStorage.setItem('listing-type', this.value);
        handleDateContainerDisplay(this.value);
    });
});

if (document.getElementById('sign-profile')) {
    document.getElementById('sign-profile').innerHTML = `
        <h2 class="logout sign-in"><a href="signup.html">Sign In</a></h2>
        <h2 class="login sign-in"><a href="profile.html">Profile</a></h2>
    `;
}

function eventCardTemplate(event, index) {
    const dateExtraContent = event.dateextra && event.dateextra.trim() !== "" 
        ? `<a href="listing.html?id=${index}" class="more-info-link">More info</a>` 
        : "";
    return `
        <div class="event-cards">
            <div class="card-header">
                <h4 class="event-price">
                    ${(event.price === '0' || event.price === '0.00' || event.price === 'Free') ? 'Free' : '£' + event.price}
                </h4>
                <div class="head-details">
                    <h4 class="event-type">${event.type}</h4>
                    <h4 class="cat-tag">${event.category}</h4>
                </div>
            </div>
            <div class="card-main-and-details ${index % 2 === 0 ? 'card-even' : 'card-odd'}">
                <div class="card-main">
                    <img class="event-photo" src="${event.photo || './resources/images/inTown-logo.png'}"></img>
                    <div class="card-main-writing">
                        <div class="title-and-info">
                            <h2 class="event-title">${event.name}</h2>
                            <p class="event-info">${event.about}</p>
                        </div>
                        <div class="date-and-age">
                            <div class="just-date">
                                <h3 class="date">${event.date}</h3>
                                ${event.dateextra ? `<h4 class="dateextra">${dateExtraContent}</h4>` : ''}
                            </div>
                            <h3 class="age">${event.age}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <h4 class="event-profile"></i><i class="fa-solid fa-arrow-right"></i><a href="listing.html?id=${index}"> Event Profile</a></h4>
                <h4 class="event-address">📍 ${event['address'] || ''}</h4>
                <h4 class="follow">Follow</h4>
            </div>
        </div>
    `;
}

function deactivateAllButtons() {
    const allButtons = document.querySelectorAll('.profile-side-bar li');
    allButtons.forEach(button => {
        button.classList.remove('is-active');
    });
}

if(aboutSection !== null) {
    function hideAllProfileSections() {
        const allProfileSections = document.querySelectorAll('.profile-centre');
        allProfileSections.forEach(function(section) {
            section.classList.remove('is-visible');
        });
    }
    aboutBtn.addEventListener('click', function() {
        hideAllProfileSections();
        deactivateAllButtons();
        aboutSection.classList.add('is-visible');
        aboutBtn.classList.add('is-active');
    });

    friendsBtn.addEventListener('click', function() {
        hideAllProfileSections();
        deactivateAllButtons();
        friendsSection.classList.add('is-visible');
        friendsBtn.classList.add('is-active');
    });

    interestsBtn.addEventListener('click', function() {
        hideAllProfileSections();
        deactivateAllButtons();
        interestsSection.classList.add('is-visible');
        interestsBtn.classList.add('is-active');
    });

    groupsBtn.addEventListener('click', function() {
        hideAllProfileSections();
        deactivateAllButtons();
        groupsSection.classList.add('is-visible');
        groupsBtn.classList.add('is-active');
    });

    eventsBtn.addEventListener('click', function() {
        hideAllProfileSections();
        deactivateAllButtons();
        eventsSection.classList.add('is-visible');
        eventsBtn.classList.add('is-active');
    });

    bookmarksBtn.addEventListener('click', function() {
        hideAllProfileSections();
        deactivateAllButtons();
        bookmarksSection.classList.add('is-visible');
        bookmarksBtn.classList.add('is-active');
    });

    editProfileBtn.addEventListener('click', function() {
        hideAllProfileSections();
        deactivateAllButtons();
        editProfileSection.classList.add('is-visible');
        editProfileBtn.classList.add('is-active');
    });

    accountSettingsBtn.addEventListener('click', function() {
        hideAllProfileSections();
        deactivateAllButtons();
        accSettingsSection.classList.add('is-visible');
        accountSettingsBtn.classList.add('is-active');
    });

    logoutBtn.addEventListener('click', function() {
        hideAllProfileSections();
        deactivateAllButtons();
        logoutSection.classList.add('is-visible');
        logoutBtn.classList.add('is-active');
    });

}

function clearAllDateContainers() {
    if(oneEvent) oneEvent.style.display = 'none';
    if(regularGroup) regularGroup.style.display = 'none';
    if(shortCourse) shortCourse.style.display = 'none';
    if(volunteerOpportunity) volunteerOpportunity.style.display = 'none';
    if(ongoingActivity) ongoingActivity.style.display = 'none';
}

function handleDateContainerDisplay(typeValue) {
    clearAllDateContainers();

    const dInput = document.getElementById('listing-date');
    const rInput = document.getElementById('regular-date');
    const sInput = document.getElementById('short-course-date');
    const vInput = document.getElementById('shift-date');
    const oInput = document.getElementById('opening-hours');
    const pInput = document.getElementById('price-amount');

    if (dInput) dInput.required = false;
    if (rInput) rInput.required = false;
    if (sInput) sInput.required = false;
    if (vInput) vInput.required = false;
    if (oInput) oInput.required = false;

    if (typeValue === 'volunteering') {
        if (priceSectionWrapper) priceSectionWrapper.style.display = 'none';
        if (pInput) pInput.required = false;
    } else {
        if (priceSectionWrapper) priceSectionWrapper.style.display = 'flex';
        if (pInput) pInput.required = true;
    }

    if (typeValue === 'event' && oneEvent) {
        oneEvent.style.display = 'flex';
        if (dInput) dInput.required = true;
    } else if (typeValue === 'group' && regularGroup) {
        regularGroup.style.display = 'flex';
        if (rInput) rInput.required = true;
    } else if (typeValue === 'course' && shortCourse) {
        shortCourse.style.display = 'flex';
        if (sInput) sInput.required = true;
    } else if (typeValue === 'volunteering' && volunteerOpportunity) {
        volunteerOpportunity.style.display = 'flex';
        if (vInput) vInput.required = true;
    } else if ((typeValue === 'ongoing-activity' || typeValue === 'something-else') && ongoingActivity) {
        ongoingActivity.style.display = 'flex';
        if (oInput) oInput.required = true;
    }
}

if (nextbtn) {
    nextbtn.addEventListener('click', function() {
        const titleField = document.getElementById('group-name');
        const descField = document.getElementById('listing-description');
        const pField = document.getElementById('price-amount');
        const addrField = document.getElementById('listing-address');
        const catField = document.getElementById('category-select');
        const ageField = document.getElementById('age-group');

        const activeType = localStorage.getItem('listing-type');
        let activeDateInput = null;

        if (titleField && !titleField.reportValidity()) return;
        
        const checkedType = document.querySelector('input[name="listing-type"]:checked');
        if (!checkedType) {
            alert("Please select what type of listing it is.");
            return;
        }

        if (activeType === 'event') activeDateInput = document.getElementById('listing-date');
        else if (activeType === 'group') activeDateInput = document.getElementById('regular-date');
        else if (activeType === 'course') activeDateInput = document.getElementById('short-course-date');
        else if (activeType === 'volunteering') activeDateInput = document.getElementById('shift-date');
        else if (activeType === 'ongoing-activity' || activeType === 'something-else') activeDateInput = document.getElementById('opening-hours');

        if (descField && !descField.reportValidity()) return;
        if (activeDateInput && !activeDateInput.reportValidity()) return;
        if (pField && priceSectionWrapper && priceSectionWrapper.style.display !== 'none' && !pField.reportValidity()) return;
        if (addrField && !addrField.reportValidity()) return;
        if (catField && !catField.reportValidity()) return;
        if (ageField && !ageField.reportValidity()) return;

        stepOne.style.display = 'none';
        stepTwo.style.display = 'block';
    });
}

if (backbtn) {
    backbtn.addEventListener('click', function() {
        stepTwo.style.display = 'none';
        stepOne.style.display = 'block';
    });
}

if (submitBtn) {
    submitBtn.addEventListener('click', function(event) {
        if (listingForm) {
            event.preventDefault();
            const submitEvent = new Event('submit', { cancelable: true });
            listingForm.dispatchEvent(submitEvent);
        }
    });
}

const signupForm = document.getElementById('sign-up-form');
if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const firstName = document.getElementById('firstname')?.value.trim();
        const surName = document.getElementById('surname')?.value.trim();
        const fullName = `${capitaliseEveryWord(firstName)} ${capitaliseEveryWord(surName)}`.trim();
        localStorage.setItem('user-full-name', fullName);
        const email = document.getElementById('email');
        if (email) {
            localStorage.setItem('email', email.value.trim());
        }
        const selectedOption = document.querySelector('input[name="user-type"]:checked')?.value;
        if (selectedOption === 'public') window.location.href = 'create-profile.html';
        else window.location.href = 'add-listing.html'; 
    });
}

if (listingForm) {
    listingForm.addEventListener('input', function(event) {
        if (event.target.name) localStorage.setItem(event.target.name, event.target.value);
    });

    for (const input of listingFormElements) {
        if (input.name) {
            const savedValue = localStorage.getItem(input.name);
            if (savedValue) {
                if (input.type === 'checkbox') input.checked = (savedValue === 'true');
                else if (input.type === 'radio') {
                    if (input.value === savedValue) input.checked = true;
                } else input.value = savedValue;
            }
        }
    }

    let savedListingType = localStorage.getItem('listing-type');
    if (savedListingType) handleDateContainerDisplay(savedListingType);

    let savedOrganiserType = localStorage.getItem('user-type');
    const orgNameInput = document.getElementById('organiser-name');
    if (savedOrganiserType === 'group') {
        if(organiserName) organiserName.style.display = 'none';
        if(businessDescription) businessDescription.style.display = 'none';
        if(organiserDescription) organiserDescription.style.display = 'flex'; 
        if(orgNameInput) orgNameInput.required = false;
    } else if (savedOrganiserType === 'business') {
        if(organiserName) organiserName.style.display = 'flex'; 
        if(businessDescription) businessDescription.style.display = 'flex'; 
        if(organiserDescription) organiserDescription.style.display = 'none';
        if(orgNameInput) orgNameInput.required = true;
    }
}

const groupNameInput = document.getElementById('group-name');
const nameHeading = document.getElementById('listing-name-label');

function updateHeaderPreview(value) {
    if (nameHeading) nameHeading.textContent = (value && value.trim() !== "") ? value : "your listing";
}

if (groupNameInput) {
    groupNameInput.addEventListener('input', function() {
        localStorage.setItem('group-name', this.value);
        updateHeaderPreview(this.value);
    });
}
updateHeaderPreview(localStorage.getItem('group-name'));

const categorySelect = document.getElementById('category-select');
const customCategoryBox = document.getElementById('custom-category-box');
const customCategoryInput = document.getElementById('listing-category-other');

if (categorySelect && customCategoryBox && customCategoryInput) {
    function checkCategoryVisibility() {
        if (categorySelect.value === 'other') {
            customCategoryBox.style.display = 'flex';
            customCategoryInput.required = true;
        } else {
            customCategoryBox.style.display = 'none';
            customCategoryInput.required = false;
            if (categorySelect.value !== 'other') customCategoryInput.value = '';
        }
    }
    categorySelect.addEventListener('change', checkCategoryVisibility);
    checkCategoryVisibility();
}

function saveNewListing(event) {
    if (event && event.preventDefault) event.preventDefault();
    const selectedType = localStorage.getItem('listing-type');
    let finalDate = 'Contact for dates';
    if (selectedType === 'event') finalDate = formatDateString(document.getElementById('listing-date')?.value);
    else if (selectedType === 'group') finalDate = capitaliseFirstLetter(document.getElementById('regular-date')?.value || finalDate);
    else if (selectedType === 'course') finalDate = capitaliseFirstLetter(document.getElementById('short-course-date')?.value || finalDate);
    else if (selectedType === 'volunteering') finalDate = capitaliseFirstLetter(document.getElementById('shift-date')?.value || finalDate);
    else if (selectedType === 'ongoing-activity' || selectedType === 'something-else') finalDate = capitaliseFirstLetter(document.getElementById('opening-hours')?.value || finalDate);

    const typeMapping = { 'event': 'One-off event', 'group': 'Regular group', 'course': 'Short course', 'volunteering': 'Volunteering', 'ongoing-activity': 'Ongoing Activity', 'something-else': 'Custom Activity' };

    const newListing = {
        organiser: capitaliseEveryWord(localStorage.getItem('user-full-name') || 'Community Organiser'),
        name: capitaliseEveryWord(document.getElementById('group-name')?.value || localStorage.getItem('group-name') || 'Group/Event'),
        price: document.getElementById('price-amount')?.value || 'Free',
        priceExtra: capitaliseFirstLetter(document.getElementById('listing-price-details')?.value || ''),
        category: capitaliseEveryWord(document.getElementById('listing-category-other')?.value.trim() || document.getElementById('category-select')?.value || 'General'),
        profilePic: document.getElementById('event-photo-url')?.value || './resources/images/inTown-logo.png',
        photo: document.getElementById('listing-photo-img')?.value || './resources/images/inTown-logo.png',
        about: capitaliseFirstLetter(document.getElementById('listing-description')?.value || ''),
        age: document.getElementById('age-group')?.value || 'All Ages',
        ageExtra: capitaliseFirstLetter(document.getElementById('age-restriction')?.value || ''),
        address: capitaliseEveryWord(document.getElementById('listing-address')?.value || ''),
        'listing-city': capitaliseEveryWord(document.getElementById('listing-city')?.value || ''),
        'listing-postcode': document.getElementById('listing-postcode')?.value.toUpperCase() || '',
        phoneVal: document.getElementById('contact-phone')?.value.trim() || '',
        emailVal: document.getElementById('contact-email')?.value.trim() || '',
        webVal: document.getElementById('contact-website')?.value.trim() || '',
        socialVal: document.getElementById('contact-social')?.value.trim() || '',
        date: finalDate,
        dateextra: capitaliseFirstLetter(document.getElementById('one-event-extra')?.value || document.getElementById('regular-date-extra')?.value || document.getElementById('short-course-extra')?.value || document.getElementById('volunteer-extra')?.value || document.getElementById('ongoing-extra')?.value || ''),
        type: typeMapping[localStorage.getItem('listing-type')] || 'Group',
        extraInfo: capitaliseFirstLetter(document.getElementById('listing-extra-details-box')?.value || '')
    };

    const currentListing = JSON.parse(localStorage.getItem('event-cards')) || [];
    currentListing.push(newListing);
    localStorage.setItem('event-cards', JSON.stringify(currentListing));
    
    const keysToClear = ['group-name', 'price-amount', 'listing-price-details', 'category-select', 'listing-category-other', 'event-photo-url', 'listing-photo-img', 'listing-description', 'age-group', 'age-restriction', 'listing-address', 'listing-city', 'listing-postcode', 'one-event-extra', 'regular-date-extra', 'short-course-extra', 'volunteer-extra', 'ongoing-extra', 'listing-extra-details', 'listing-type', 'user-type'];
    keysToClear.forEach(key => localStorage.removeItem(key));

    window.location.href = `listing.html?id=${currentListing.length - 1}`;
}

if (listingId !== null) {
    const currentListing = JSON.parse(localStorage.getItem('event-cards')) || [];
    const singleEvent = currentListing[Number(listingId)];

    if (singleEvent) {
        if (document.getElementById('listing-profile-name')) document.getElementById('listing-profile-name').textContent = singleEvent.name || 'Unnamed Event';
        const priceElement = document.getElementById('listing-price');
        const priceDetailsText = document.getElementById('listing-price-details');
        const rawPrice = parseFloat(singleEvent.price);
        const isFree = isNaN(rawPrice) || rawPrice === 0;
        const details = singleEvent.priceExtra || '';
        if (priceElement) priceElement.textContent = isFree ? 'Free' : '£' + rawPrice.toFixed(2);
        if (priceDetailsText) priceDetailsText.textContent = !isFree ? ('£' + rawPrice.toFixed(2) + (details.trim() !== "" ? ' - ' + details : '')) : details;
        if (document.getElementById('listing-category')) document.getElementById('listing-category').textContent = singleEvent.category || '';
        if (document.getElementById('listing-age')) document.getElementById('listing-age').textContent = singleEvent.age || '';
        if (document.getElementById('age-restriction')) document.getElementById('age-restriction').textContent = singleEvent.ageExtra || '';
        if (document.getElementById('listing-date')) document.getElementById('listing-date').textContent = singleEvent.date || 'Contact for dates';
        if (document.getElementById('listing-date-extra')) document.getElementById('listing-date-extra').textContent = singleEvent.dateextra || '';

        const addressElement = document.getElementById('listing-address');
        if (addressElement) {
            const addressParts = [singleEvent.address, singleEvent['listing-city'], singleEvent['listing-postcode']].filter(part => part && part.trim() !== '');
            addressElement.textContent = addressParts.join(', ') || 'No address specified';
        }

        const contactData = [
            { p: document.getElementById('phone-no'), val: singleEvent.phoneVal },
            { p: document.getElementById('email-address'), val: singleEvent.emailVal },
            { p: document.getElementById('listing-website'), val: singleEvent.webVal },
            { p: document.getElementById('social-media'), val: singleEvent.socialVal }
        ];

        contactData.forEach(item => {
            if (item.p) {
                item.p.textContent = item.val || '';
                const hasData = item.val && item.val.trim().length > 0;
                item.p.style.display = hasData ? 'block' : 'none';
                if (item.p.previousElementSibling) item.p.previousElementSibling.style.display = hasData ? 'block' : 'none';
            }
        });

        if (document.getElementById('listing-type')) document.getElementById('listing-type').textContent = singleEvent.type || 'Activity';
        if (document.getElementById('listing-description')) document.getElementById('listing-description').textContent = singleEvent.about || '';
        if (document.getElementById('listing-photo-img')) document.getElementById('listing-photo-img').src = singleEvent.photo || './resources/images/inTown-logo.png';
        if (document.getElementById('event-photo-url')) document.getElementById('event-photo-url').src = singleEvent.profilePic || './resources/images/inTown-logo.png';
        if (document.getElementById('num-followers')) document.getElementById('num-followers').textContent = singleEvent.numFollowers || '0';
        if (document.getElementById('organiser-person-name')) document.getElementById('organiser-person-name').textContent = singleEvent.organiser || 'Community Organiser';
        if (document.getElementById('listing-extra-details-box')) document.getElementById('listing-extra-details-box').textContent = singleEvent.extraInfo || '';
    }

    const sections = [
        { header: document.getElementById('about-date'), content: singleEvent.dateextra },
        { header: document.getElementById('listing-price-extra'), content: singleEvent.priceExtra },
        { header: document.getElementById('listing-age-extra'), content: singleEvent.ageExtra },
        { header: document.getElementById('extra-info-for-listing'), content: singleEvent.extraInfo }
    ];

    sections.forEach(s => {
        if (s.header) {
            const isVisible = s.content && s.content.trim() !== "";
            s.header.style.display = isVisible ? 'flex' : 'none';
            const nextElement = s.header.nextElementSibling;
            if (nextElement && nextElement.classList.contains('listing-extra-style')) nextElement.style.display = isVisible ? 'block' : 'none';
        }
    });
}

const suggestionsContainer = document.getElementById('suggestions');
if (suggestionsContainer) {
    suggestionsContainer.innerHTML = "";
    const liveListings = JSON.parse(localStorage.getItem('event-cards')) || [];
    for (let i = liveListings.length - 1; i >= 0; i--) {
        suggestionsContainer.innerHTML += eventCardTemplate(liveListings[i], i);
    }
}

function formatDateString(dateTimeString) {
    if (!dateTimeString) return 'Contact for dates';
    const dateObj = new Date(dateTimeString);
    if (isNaN(dateObj)) return dateTimeString;

    const day = dateObj.getDate();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = months[dateObj.getMonth()];
    let suffix = (day === 1 || day === 21 || day === 31) ? "st" : (day === 2 || day === 22) ? "nd" : (day === 3 || day === 23) ? "rd" : "th";
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;
    return `${day}${suffix} ${monthName}, ${dateObj.getFullYear()} - ${minutes === '00' ? hours : hours + ':' + minutes}${ampm}`;
}

function capitaliseFirstLetter(text) {
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}

function capitaliseEveryWord(text) {
    return text ? text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
}

if (listingForm) {
    listingForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const savedOrganiserType = localStorage.getItem('user-type');
        const orgNameInput = document.getElementById('organiser-name');
        if (savedOrganiserType === 'business' && orgNameInput && orgNameInput.value.trim() === '') {
            alert("Please enter the name of your business before submitting.");
            orgNameInput.focus();
            return;
        }
        const emailVal = document.getElementById('contact-email')?.value.trim();
        const phoneVal = document.getElementById('contact-phone')?.value.trim();
        const webVal = document.getElementById('contact-website')?.value.trim();
        const socialVal = document.getElementById('contact-social')?.value.trim();
        const intownVal = document.getElementById('only-on-intown')?.checked;

        if (intownVal && (emailVal || phoneVal || webVal || socialVal)) {
            alert("Please either check 'Only want people to contact you through InTown?' OR provide contact details.");
            return;
        }
        if (!emailVal && !phoneVal && !webVal && !socialVal && !intownVal) {
            alert("Please provide at least one contact method or check 'Only want people to contact you through InTown?' before submitting.");
            return;
        }
        saveNewListing(event); 
    }); 
}

if (document.getElementById('already')) {
    document.getElementById('already').addEventListener('click', () => window.location.href = 'signin.html');
}

if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', (e) => { e.preventDefault(); window.location.href = 'profile.html'; });
}

if (document.getElementById('sign-up-btn')) {
    document.getElementById('sign-up-btn').addEventListener('click', () => window.location.href = 'signup.html');
}

document.addEventListener('DOMContentLoaded', () => {
    const listingAboutBtn = document.getElementById('listing-about-btn');
    const membersBtn = document.getElementById('members-btn');
    const listingPhotoBtn = document.getElementById('listing-photos-btn');
    const listingContactBtn = document.getElementById('listing-contact-btn');
    const upcomingBtn = document.getElementById('upcoming-date-btn');
    const listingFollowerBtn = document.getElementById('listing-follower-btn');
    const listingAboutSection = document.getElementById('listing-about-sect');
    const listingMembers = document.getElementById('listing-members');
    const listingPhotos = document.getElementById('listing-photos');
    const listingContacts = document.getElementById('listing-contacts');
    const listingUpcDate = document.getElementById('listing-upcoming-dates');
    const listingFollowers = document.getElementById('listing-followers');

    if(document.getElementById('listing-about-sect')) {
        const btns = [listingAboutBtn, membersBtn, listingPhotoBtn, listingContactBtn, upcomingBtn, listingFollowerBtn];
        const sects = [listingAboutSection, listingMembers, listingPhotos, listingContacts, listingUpcDate, listingFollowers];
        
        function hideAllListingSections() {
            sects.forEach(s => s && s.classList.remove('is-visible'));
        }

        function deactivateAllListingButtons() {
            btns.forEach(button => {
            button.classList.remove('is-active');
            });
        }
        
        btns.forEach((btn, i) => {
            if(btn) btn.addEventListener('click', (e) => {
                e.preventDefault();
                hideAllListingSections();
                deactivateAllListingButtons();
                if(sects[i]) sects[i].classList.add('is-visible');
                btn.classList.add('is-active');
            });
            
        });
        if(listingAboutBtn) listingAboutBtn.click();
    
    }
});

const priceInput = document.getElementById('price-amount');
if (priceInput) {
    priceInput.addEventListener('blur', function() {
        const val = parseFloat(this.value);
        if (!isNaN(val)) this.value = val.toFixed(2);
    });
    priceInput.addEventListener('wheel', (e) => { e.preventDefault(); this.blur(); });
}

document.querySelectorAll('.filter-btn').forEach(item => {
    item.addEventListener('click', function(event) {
        if (event.target.tagName !== 'INPUT') this.querySelector('.filter-options').classList.toggle('is-visible');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const userNameHeading = document.getElementById('users-name');
    const savedName = localStorage.getItem('user-full-name');
    if (userNameHeading && savedName) userNameHeading.textContent = ` ${savedName.split(' ')[0]}`;

    const profileData = JSON.parse(localStorage.getItem('user-profile'));
    const profileTypeMapping = { 'type-regular': 'Regular groups & clubs', 'Events': 'Events', 'Classes and Courses': 'Classes & courses', 'Volunteering': 'Volunteering opportunites', 'Family and Kids': 'Family & kids activities', 'Explore All Options': "I'm open to all options" };
    const profileInterestMapping = { 'cat-arts': 'Arts', 'cat-sports': 'Sports', 'cat-education': 'Education', 'cat-social': 'Social', 'cat-health': 'Health & Wellbeing', 'cat-food': 'Food & Drink', 'cat-music': 'Music', 'cat-outdoor': 'Outdoors', 'cat-perform': 'Performance', 'cat-family': 'Family', 'cat-hobby': 'Hobby' };
    const profileHopesMapping = { 'hope-friends': 'Make new friends', 'hope-hobbies': 'Try new hobbies', 'hope-health': 'Improve health', 'hope-get-out': 'Get out more', 'hope-learn': 'Learn something new', 'hope-community': 'Get involved in my community', 'hope-fun': 'Just have fun and try new experiences' };
    const profileAgesMapping = { 'age-all': 'All Ages', 'age-child': 'Children', 'age-teen': 'Teens', 'age-adult': 'Adults', 'age-senior': 'Seniors', 'age-family': 'Family' };

    if (profileData) {
        if (document.getElementById('profile-name')) document.getElementById('profile-name').textContent = profileData.user;
        if (document.getElementById('bio-display')) document.getElementById('bio-display').textContent = profileData.bio || '';
        if (document.getElementById('type-display') && profileData.types) document.getElementById('type-display').textContent = profileData.types.map(id => profileTypeMapping[id] || id).join(', ');
        if (document.getElementById('interest-display') && profileData.interests) document.getElementById('interest-display').textContent = profileData.interests.map(id => profileInterestMapping[id] || id).join(', ');
        if (document.getElementById('hope-display') && profileData.hopes) document.getElementById('hope-display').textContent = profileData.hopes.map(id => profileHopesMapping[id] || id).join(', ');
        if (document.getElementById('age-display') && profileData.ages) document.getElementById('age-display').textContent = profileData.ages.map(id => profileAgesMapping[id] || id).join(', ');
        if (document.getElementById('profile-pic')) document.getElementById('profile-pic').src = profileData.profPhoto || './resources/images/inTown-logo.png';
        if (document.getElementById('email')) document.getElementById('email').textContent = profileData.email;
        
    }

    toggleSection('types-container', 'types-container', profileData.types);
    toggleSection('interests-container', 'interests-container', profileData.interests);
    toggleSection('hopes-container', 'hopes-container', profileData.hopes);
    toggleSection('future-events-container', 'future-events-container', profileData.futureEvents);
    toggleSection('past-events-container', 'past-events-container', profileData.pastEvents);
    toggleSection('group-name-container', 'group-name-container', profileData.groups);

});

if (profileForm) {
    profileForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        saveNewProfile(); 
    }); 
}

const profileSubmitBtn = document.getElementById('create-profile-btn');
if (profileSubmitBtn) {
    profileSubmitBtn.addEventListener('click', function(event) {
        event.preventDefault();
        if (profileForm) profileForm.requestSubmit();
    });
}
if ('profile') {
    for (const input of profileFormElements) {
        if (input.name) {
            const savedValue = localStorage.getItem(input.name);
            if (savedValue) {
                if (input.type === 'checkbox') input.checked = (savedValue === 'true');
                else input.value = savedValue;
            }
        }
    }
}

function saveNewProfile() {
    const getCheckedValues = (name) => Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);
    const emailFromSignup = localStorage.getItem('email');
    const newProfile = {
        user: capitaliseEveryWord(document.getElementById('user-full-name')?.value || localStorage.getItem('user-full-name')),
        bio: capitaliseEveryWord(document.getElementById('profile-bio')?.value || ''),
        types: getCheckedValues('type-choice'),
        interests: getCheckedValues('interest-choice'),
        hopes: getCheckedValues('hope-choice'),
        ages: getCheckedValues('age-choice'),
        profPhoto: document.getElementById('profile-photo-url')?.value || './resources/images/inTown-logo.png',
        email: document.getElementById('email-edit')?.value.trim() || emailFromSignup || ''
    };

    localStorage.setItem('user-profile', JSON.stringify(newProfile));
    localStorage.removeItem('profile-bio');
    localStorage.removeItem('profile-photo-url');
    localStorage.removeItem('email');
    window.location.href = 'profile.html';
}

function toggleSection(headerId, contentId, data) {
    const header = document.getElementById(headerId);
    const container = document.getElementById(contentId);
    
    const hasData = (Array.isArray(data) ? data.length > 0 : (data && data.trim() !== ""));
    
    if (header) header.style.display = hasData ? 'block' : 'none';
    if (container) container.style.display = hasData ? 'block' : 'none';
}

// Edit Profile Section //

function loadProfileData() {
    const profileData = JSON.parse(localStorage.getItem('user-profile'));
    if (!profileData) return;
    const nameInput = document.getElementById('users-name-edit');
    const bioInput = document.getElementById('profile-bio-edit');
    const emailInput = document.getElementById('email-edit');

    if (nameInput) nameInput.value = profileData.user || '';
    if (bioInput) bioInput.value = profileData.bio || '';
    if (emailInput) emailInput.value = profileData.email || '';

    const photoImg = document.getElementById('profile-pic-edit');
    if (photoImg) photoImg.src = profileData.profPhoto || './resources/images/inTown-logo.png';
}

document.addEventListener('DOMContentLoaded', () => {
    loadProfileData();
    renderEditPills();

    document.querySelectorAll('.tag-selector').forEach(select => {
        select.addEventListener('change', (e) => {
            const value = e.target.value;
            if (!value) return;

            let profileData = JSON.parse(localStorage.getItem('user-profile')) || {};
            const map = {
                'type-select': 'types',
                'interest-select': 'interests',
                'hope-select': 'hopes',
                'age-select': 'ages'
            };

            const key = map[e.target.id];
            if (!profileData[key]) profileData[key] = [];
            if (!profileData[key].includes(value)) {
                profileData[key].push(value);
                localStorage.setItem('user-profile', JSON.stringify(profileData));
            }
            
            renderEditPills();
            e.target.value = "";
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-pill')) {
            const category = e.target.getAttribute('data-category');
            const valueToRemove = e.target.getAttribute('data-value');
            
            let profileData = JSON.parse(localStorage.getItem('user-profile')) || {};
            
            if (profileData[category]) {
                profileData[category] = profileData[category].filter(item => item !== valueToRemove);
                localStorage.setItem('user-profile', JSON.stringify(profileData));
                renderEditPills();
            }
        }
    });
});

function renderEditPills() {
    const profileData = JSON.parse(localStorage.getItem('user-profile'));
    if (!profileData) return;

    const createPills = (array, containerId, categoryKey) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const mapping = profileMappings[categoryKey];
        container.innerHTML = array.map(item => `
            <span class="pill">
                ${mapping[item]?.short || item} 
                <button class="remove-pill" data-category="${categoryKey}" data-value="${item}">x</button>
            </span>
        `).join('');
    };

    createPills(profileData.interests || [], 'interests-pill-container', 'interests');
    createPills(profileData.hopes || [], 'hopes-pill-container', 'hopes');
    createPills(profileData.types || [], 'types-pill-container', 'types');
    createPills(profileData.ages || [], 'ages-pill-container', 'ages');
}

const editProfileForm = document.getElementById('edit-profile-form');
if (editProfileForm) {
    editProfileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        saveEditProfile();
    });
}

function saveEditProfile() {
    const existingProfile = JSON.parse(localStorage.getItem('user-profile')) || {};
    
    const updatedProfile = {
        ...existingProfile,
        user: capitaliseEveryWord(document.getElementById('users-name-edit')?.value || existingProfile.user),
        bio: capitaliseEveryWord(document.getElementById('profile-bio-edit')?.value || existingProfile.bio),
        email: document.getElementById('email-edit')?.value.trim() || existingProfile.email
    };

    localStorage.setItem('user-profile', JSON.stringify(updatedProfile));

    const msg = document.getElementById('save-success-msg');
    if (msg) {
        msg.style.display = 'block';
    }
    setTimeout(() => {
        window.location.reload();
    }, 3000);
}

function showSaveFeedback() {
    const msg = document.getElementById('save-success-msg');
    msg.style.display = 'block';

    // Hide it again after 3 seconds
    setTimeout(() => {
        msg.style.display = 'none';
    }, 3000);
}