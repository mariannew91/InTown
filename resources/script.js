const lookingFor = document.getElementById('looking-for')
const groupBusiness = document.getElementById('group-business')
const kindOfThing = document.getElementById('kind-of-thing')
const listingTypeRadios = document.querySelectorAll('input[name="listing-type"]');

const listingElement = document.getElementById('listing-profile-name');

const aboutBtn = document.getElementById('about-btn')
const friendsBtn = document.getElementById('friends-btn')
const interestsBtn = document.getElementById('interests-btn')
const groupsBtn = document.getElementById('groups-btn')
const eventsBtn = document.getElementById('events-btn')
const bookmarksBtn = document.getElementById('bookmarks-btn')

const aboutSection = document.getElementById('about-me')
const friendsSection = document.getElementById('my-friends')
const interestsSection = document.getElementById('my-interests')
const groupsSection = document.getElementById('my-groups')
const eventsSection = document.getElementById('my-events')
const bookmarksSection = document.getElementById('bookmarks')

const stepOne = document.getElementById('form-step-one')
const stepTwo = document.getElementById('form-step-two')
const nextbtn = document.getElementById('next-to-step-two')
const backbtn = document.getElementById('back-to-step-one')
const submitBtn = document.getElementById('submit-listing')
const createAccBtn = document.getElementById('create-account')

const listingForm = document.getElementById('add-listing-form')

const priceSectionWrapper = document.getElementById('listing-price');

const oneEvent = document.getElementById('one-event-date')
const regularGroup = document.getElementById('regular-date-container')
const shortCourse = document.getElementById('short-course-container')
const volunteerOpportunity = document.getElementById('volunteer-date')
const ongoingActivity = document.getElementById('ongoing-multi-date')

const listingName = document.getElementById('group-name')

const groupLeader = document.getElementById('group-leader')
const businessLeader = document.getElementById('business')

const organiserName = document.getElementById('organiser-name-container')
const businessDescription = document.getElementById('business-desc-container')
const organiserDescription = document.getElementById('organiser-desc-container')

const locationSearch = window.location.search;
const urlParams = new URLSearchParams(locationSearch);
const listingId = urlParams.get('id');

let listingFormElements = [];
if (typeof listingForm !== 'undefined' && listingForm) {
    listingFormElements = listingForm.elements;
}

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
    `
}

function eventCardTemplate(event, index) {
    const dateExtraContent = event.dateextra && event.dateextra.trim() !== "" 
        ? `<a href="listing.html?id=${index}" class="more-info-link">More info</a>` 
        : "";
    return `
        <div class="event-cards">
            <div class="card-header">
                <h4 class="event-price">${event.price === 'Free' ? 'Free' : '£' + event.price}</h4>
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
    `
}

function deactivateAllButtons() {
    const allButtons = document.querySelectorAll('.profile-side-bar li');
    allButtons.forEach(function(button) {
        button.classList.remove('is-active');
    });
}

if(aboutSection !== null) {
    function hideAllListingSections() {
        const aboutSections = document.querySelectorAll('.profile-centre')
        allListingSections.forEach(function(section) {
            section.classList.remove('is-visible')
        })
    }
    aboutBtn.addEventListener('click', function() {
        hideAllSections()
        deactivateAllButtons()
        aboutSection.classList.add('is-visible')
        aboutBtn.classList.add('is-active')
    })

    friendsBtn.addEventListener('click', function() {
        hideAllSections()
        deactivateAllButtons()
        friendsSection.classList.add('is-visible')
        friendsBtn.classList.add('is-active')
    })

    interestsBtn.addEventListener('click', function() {
        hideAllSections()
        deactivateAllButtons()
        interestsSection.classList.add('is-visible')
        interestsBtn.classList.add('is-active')
    })

    groupsBtn.addEventListener('click', function() {
        hideAllSections()
        deactivateAllButtons()
        groupsSection.classList.add('is-visible')
        groupsBtn.classList.add('is-active')
    })

    eventsBtn.addEventListener('click', function() {
        hideAllSections()
        deactivateAllButtons()
        eventsSection.classList.add('is-visible')
        eventsBtn.classList.add('is-active')
    })

    bookmarksBtn.addEventListener('click', function() {
        hideAllSections()
        deactivateAllButtons()
        bookmarksSection.classList.add('is-visible')
        bookmarksBtn.classList.add('is-active')
    })
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
        const orgNameInput = document.getElementById('organiser-name');

        const activeType = localStorage.getItem('listing-type');
        const savedOrganiserType = localStorage.getItem('user-type');
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

        if (firstName || surName) {
            const fullName = `${firstName} ${surName}`.trim();
            localStorage.setItem('saved-organiser-name', fullName);
        }

        window.location.href = 'add-listing.html'; 
    });
}

if (listingForm) {
    listingForm.addEventListener('input', function(event) {
        if (event.target.name) {
            localStorage.setItem(event.target.name, event.target.value)
        }
    })

    for (const input of listingFormElements) {
        if (input.name) {
            const savedValue = localStorage.getItem(input.name)
            if (savedValue) {
                if (input.type === 'checkbox') {
                    input.checked = (savedValue === 'true');
                } else if (input.type === 'radio') {
                    if (input.value === savedValue) input.checked = true;
                } else {
                    input.value = savedValue;
                }
            }
        }
    }

    let savedListingType = localStorage.getItem('listing-type')
    if (savedListingType) {
        handleDateContainerDisplay(savedListingType);
    }

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
    if (nameHeading) {
        if (value && value.trim() !== "") {
            nameHeading.textContent = value;
        } else {
            nameHeading.textContent = "your listing";
        }
    }
}

if (groupNameInput) {
    groupNameInput.addEventListener('input', function() {
        localStorage.setItem('group-name', this.value);
        updateHeaderPreview(this.value);
    });
}

const fallbackStoredName = localStorage.getItem('group-name');
updateHeaderPreview(fallbackStoredName);

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
            if (categorySelect.value !== 'other') {
                customCategoryInput.value = '';
            }
        }
    }

    categorySelect.addEventListener('change', checkCategoryVisibility);
    
    checkCategoryVisibility();
}
function saveNewListing(event) {
    if (event && event.preventDefault) event.preventDefault();

    const selectedType = localStorage.getItem('listing-type');
    let finalDate = 'Contact for dates';
    if (selectedType === 'event') {
        const rawDate = document.getElementById('listing-date')?.value;
        if (rawDate) {
            finalDate = formatDateString(rawDate);
        }
    } else if (selectedType === 'group') {
        finalDate = capitaliseFirstLetter(document.getElementById('regular-date')?.value || finalDate);
    } else if (selectedType === 'course') {
        finalDate = capitaliseFirstLetter(document.getElementById('short-course-date')?.value || finalDate);
    } else if (selectedType === 'volunteering') {
        finalDate = capitaliseFirstLetter(document.getElementById('shift-date')?.value || finalDate);
    } else if (selectedType === 'ongoing-activity' || selectedType === 'something-else') {
        finalDate = capitaliseFirstLetter(document.getElementById('opening-hours')?.value || finalDate);
    }

    const typeMapping = {
        'event': 'One-off event',
        'group': 'Regular group',
        'course': 'Short course',
        'volunteering': 'Volunteering',
        'ongoing-activity': 'Ongoing Activity',
        'something-else': 'Custom Activity'
    };

    const newListing = {
        organiser: capitaliseEveryWord(localStorage.getItem('saved-organiser-name') || 'Community Organiser'),
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
              
        dateextra: capitaliseFirstLetter(document.getElementById('one-event-extra')?.value ||
                document.getElementById('regular-date-extra')?.value || 
                document.getElementById('short-course-extra')?.value || 
                document.getElementById('volunteer-extra')?.value || 
                document.getElementById('ongoing-extra')?.value || ''),

                
                   
        type: typeMapping[localStorage.getItem('listing-type')] || 'Group',
        extraInfo: capitaliseFirstLetter(document.getElementById('listing-extra-details-box')?.value || ''),
    };

    const currentListing = JSON.parse(localStorage.getItem('event-cards')) || [];
    currentListing.push(newListing);
    localStorage.setItem('event-cards', JSON.stringify(currentListing));
    
    localStorage.removeItem('group-name');
    localStorage.removeItem('price-amount');
    localStorage.removeItem('listing-price-details');
    localStorage.removeItem('category-select');
    localStorage.removeItem('listing-category-other');
    localStorage.removeItem('event-photo-url');
    localStorage.removeItem('listing-photo-img');
    localStorage.removeItem('listing-description');
    localStorage.removeItem('age-group');
    localStorage.removeItem('age-restriction');
    localStorage.removeItem('listing-address');
    localStorage.removeItem('listing-city');
    localStorage.removeItem('listing-postcode');

    localStorage.removeItem('one-event-extra');
    localStorage.removeItem('regular-date-extra');
    localStorage.removeItem('short-course-extra');
    localStorage.removeItem('volunteer-extra');
    localStorage.removeItem('ongoing-extra');

    localStorage.removeItem('listing-extra-details');
    localStorage.removeItem('listing-type');
    localStorage.removeItem('user-type');

    const newIndex = currentListing.length - 1;
    window.location.href = `listing.html?id=${newIndex}`;
}

if (listingId !== null) {
    const currentListing = JSON.parse(localStorage.getItem('event-cards')) || [];
    const numberId = Number(listingId);
    const singleEvent = currentListing[numberId];

    if (singleEvent) {
        if (document.getElementById('listing-profile-name')) {
            document.getElementById('listing-profile-name').textContent = singleEvent.name || 'Unnamed Event';
        }

        // PRICE LOGIC: Single Source of Truth
        const priceElement = document.getElementById('listing-price');
        const priceDetailsText = document.getElementById('listing-price-details');
        
        const rawPrice = parseFloat(singleEvent.price);
        const isFree = isNaN(rawPrice) || rawPrice === 0;
        const details = singleEvent.priceExtra || '';

        if (priceElement) {
            priceElement.textContent = isFree ? 'Free' : '£' + rawPrice.toFixed(2);
        }

        if (priceDetailsText) {
            if (!isFree) {
                priceDetailsText.textContent = '£' + rawPrice.toFixed(2) + (details.trim() !== "" ? ' - ' + details : '');
            } else {
                priceDetailsText.textContent = details;
            }
        }

        // Other fields
        if (document.getElementById('listing-category')) {
            document.getElementById('listing-category').textContent = singleEvent.category || '';
        }

        if (document.getElementById('listing-age')) {
            document.getElementById('listing-age').textContent = singleEvent.age || '';
        }

        if (document.getElementById('age-restriction')) {
            document.getElementById('age-restriction').textContent = singleEvent.ageExtra || '';
        }

        if (document.getElementById('listing-date')) {
            document.getElementById('listing-date').textContent = singleEvent.date || 'Contact for dates';
        }

        if (document.getElementById('listing-date-extra')) {
            document.getElementById('listing-date-extra').textContent = singleEvent.dateextra || '';
        }

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
                const heading = item.p.previousElementSibling;
                item.p.style.display = hasData ? 'block' : 'none';
                if (heading) heading.style.display = hasData ? 'block' : 'none';
            }
        });

        if (document.getElementById('listing-type')) {
            document.getElementById('listing-type').textContent = singleEvent.type || 'Activity';
        }
        if (document.getElementById('listing-description')) {
            document.getElementById('listing-description').textContent = singleEvent.about || '';
        }
        if (document.getElementById('listing-photo-img')) {
            document.getElementById('listing-photo-img').src = singleEvent.photo || './resources/images/inTown-logo.png';
        }
        if (document.getElementById('event-photo-url')) {
            document.getElementById('event-photo-url').src = singleEvent.profilePic || './resources/images/inTown-logo.png';
        }
        if (document.getElementById('num-followers')) {
            document.getElementById('num-followers').textContent = singleEvent.numFollowers || '0';
        }
        if (document.getElementById('organiser-person-name')) {
            document.getElementById('organiser-person-name').textContent = singleEvent.organiser || 'Community Organiser';
        }
        if (document.getElementById('listing-extra-details-box')) {
            document.getElementById('listing-extra-details-box').textContent = singleEvent.extraInfo || '';
        }
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
            if (nextElement && nextElement.classList.contains('listing-extra-style')) {
                nextElement.style.display = isVisible ? 'block' : 'none';
            }
        }
    });
}

const suggestionsContainer = document.getElementById('suggestions');
if (suggestionsContainer) {
    suggestionsContainer.innerHTML = "";
    const liveListings = JSON.parse(localStorage.getItem('event-cards')) || [];
    
    for (let i = liveListings.length - 1; i >= 0; i--) {
        const event = liveListings[i];
        suggestionsContainer.innerHTML += eventCardTemplate(event, i);
    }
}

function formatDateString(dateTimeString) {
    if (!dateTimeString) return 'Contact for dates';
    const dateObj = new Date(dateTimeString);
    if (isNaN(dateObj)) return dateTimeString;

    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = months[dateObj.getMonth()];

    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) suffix = "st";
    else if (day === 2 || day === 22) suffix = "nd";
    else if (day === 3 || day === 23) suffix = "rd";

    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    const timeDisplay = minutes === '00' ? `${hours}${ampm}` : `${hours}:${minutes}${ampm}`;
    return `${day}${suffix} ${monthName}, ${year} - ${timeDisplay}`;
}

function capitaliseFirstLetter(text) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function capitaliseEveryWord(text) {
    if (!text) return '';
    return text.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
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

        const hasContactFields = emailVal || phoneVal || webVal || socialVal;

        if (intownVal && hasContactFields) {
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

const goToSignInBtn = document.getElementById('already');
if (goToSignInBtn) {
    goToSignInBtn.addEventListener('click', function() {
        window.location.href = 'signin.html'; 
    });
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        window.location.href = 'profile.html';
    });
}

const goToSignUpBtn = document.getElementById('sign-up-btn');
if (goToSignUpBtn) {
    goToSignUpBtn.addEventListener('click', function() {
        window.location.href = 'signup.html'; 
    });
}

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

function deactivateAllListingButtons() {
    const listingMenuButtons = document.querySelectorAll('.listing-menu li, [id$="-btn"]');
    listingMenuButtons.forEach(function(button) {
        button.classList.remove('is-active');
    });
}

if(listingAboutSection !== null) {
    function hideAllListingSections() {
        const allSections = document.querySelectorAll('.listing-centre');
        allSections.forEach(function(section) {
            section.classList.remove('is-visible');
        });
    }
    listingAboutBtn.addEventListener('click', function() {
        hideAllListingSections();
        deactivateAllListingButtons();
        listingAboutSection.classList.add('is-visible');
        listingAboutBtn.classList.add('is-active');
    });

    membersBtn.addEventListener('click', function() {
        hideAllListingSections();
        deactivateAllListingButtons();
        listingMembers.classList.add('is-visible');
        membersBtn.classList.add('is-active');
    });

    listingPhotoBtn.addEventListener('click', function() {
        hideAllListingSections();
        deactivateAllListingButtons();
        listingPhotos.classList.add('is-visible');
        listingPhotoBtn.classList.add('is-active');
    });

    listingContactBtn.addEventListener('click', function() {
        hideAllListingSections();
        deactivateAllListingButtons();
        listingContacts.classList.add('is-visible');
        listingContactBtn.classList.add('is-active');
    });

    upcomingBtn.addEventListener('click', function() {
        hideAllListingSections();
        deactivateAllListingButtons();
        listingUpcDate.classList.add('is-visible');
        upcomingBtn.classList.add('is-active');
    });

    listingFollowerBtn.addEventListener('click', function() {
        hideAllListingSections();
        deactivateAllListingButtons();
        listingFollowers.classList.add('is-visible');
        listingFollowerBtn.classList.add('is-active');
    });
}

const priceInput = document.getElementById('price-amount');

if (priceInput) {
    priceInput.addEventListener('blur', function() {
        let value = parseFloat(this.value);
        if (!isNaN(value)) {
            this.value = value.toFixed(2);
        }
    });

    priceInput.addEventListener('wheel', function(e) {
        e.preventDefault();
        this.blur();
    });
}

// Search Page //

const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(item => {
    item.addEventListener('click', function(event) {
        // Prevent trigger if clicking on an input
        if (event.target.tagName === 'INPUT') return;

        const filterOptions = this.querySelector('.filter-options');
        
        filterOptions.classList.toggle('is-visible');
    });
});