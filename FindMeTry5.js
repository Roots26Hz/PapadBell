
const locations = {
    "Tamil Nadu": {
        "Chennai": ["T Nagar", "Anna Nagar", "Adyar", "OMR"],
        "Coimbatore": ["Gandhipuram", "Peelamedu", "Avinashi Road"],
        "Madurai": ["KK Nagar", "Tallakulam", "Goripalayam"],
        "Trichy": ["Srirangam", "Thillai Nagar", "Cantonment"]
    },
    "Maharashtra": {
        "Mumbai": ["Andheri", "Bandra", "Dadar"],
        "Pune": ["Shivajinagar", "Wakad", "Baner", "Hinjewadi"],
        "Nagpur": ["Sitabuldi", "Dharampeth", "Mankapur"],
        "Nashik": ["Panchvati", "Mhasrul", "Satpur"],
    },
    "Delhi": {
        "South Delhi": ["Saket", "Vasant Kunj", "Greater Kailash", "Malviya Nagar"],
        "North Delhi": ["Rohini", "Pitampura", "Mukherjee Nagar"],
        "West Delhi": ["Rajouri Garden", "Tilak Nagar", "Janakpuri"],
        "Central Delhi": ["Connaught Place", "Karol Bagh", "Kashmiri Gate"]
    },
    "Karnataka": {
        "Bengaluru": ["MG Road", "Whitefield", "Electronic City"],
        "Mysuru": ["Lakshmipuram", "Vijayanagar", "Saraswathipuram"],
        "Mangalore": ["Hampankatta", "Kadri", "Bejai"],
    }
};

const stores = [
    { state: "Tamil Nadu", city: "Chennai", locality: "Anna Nagar", name: "Papad Bell, VR Chennai", img: "Images/Restaurant_Images/A_modern_aesthetically_beautif.jpeg" },
    { state: "Tamil Nadu", city: "Chennai", locality: "Adyar", name: "Papad Bell, Adyar Plaza", img: "Images/Restaurant_Images/image_of_a_restaurant_from_ins (1).jpeg" },
    { state: "Tamil Nadu", city: "Chennai", locality: "OMR", name: "Papad Bell, Marina Mall", img: "Images/Restaurant_Images/image_of_a_restaurant_from_ins (2).jpeg" },
    { state: "Tamil Nadu", city: "Coimbatore", locality: "Gandhipuram", name: "Papad Bell, Brookefields Mall", img: "Images/Restaurant_Images/image_of_a_restaurant_from_ins (3).jpeg" },
    { state: "Tamil Nadu", city: "Coimbatore", locality: "Avinashi Road", name: "Papad Bell, Fun Republic Mall", img: "Images/Restaurant_Images/image_of_a_restaurant_from_ins (4).jpeg" },
    { state: "Tamil Nadu", city: "Madurai", locality: "KK Nagar", name: "Papad Bell, Vishaal de Mal", img: "Images/Restaurant_Images/image_of_a_restaurant_from_ins.jpeg" },
    { state: "Tamil Nadu", city: "Madurai", locality: "Goripayalam", name: "Papad Bell, Goripayalam Plaza", img: "Images/Restaurant_Images/image_of_a_restaurant_from_out (1).jpeg" },
    { state: "Tamil Nadu", city: "Trichy", locality: "Srirangam", name: "Papad Bell, Srirangam Arcade", img: "Images/Restaurant_Images/image_of_a_restaurant_from_out (2).jpeg" },
    { state: "Tamil Nadu", city: "Trichy", locality: "Thillai Nagar", name: "Papad Bell, Thillai Square", img: "Images/Restaurant_Images/image_of_a_restaurant_from_out (3).jpeg" },
    { state: "Tamil Nadu", city: "Trichy", locality: "Cantonment", name: "Papad Bell, Cantonment Plaza", img: "Images/Restaurant_Images/image_of_a_restaurant_from_out (4).jpeg" },
    { state: "Maharashtra", city: "Mumbai", locality: "Andheri", name: "Papad Bell, Infiniti Mall", img: "Images/Restaurant_Images/image_of_a_restaurant_from_out.jpeg" },
    { state: "Maharashtra", city: "Mumbai", locality: "Bandra", name: "Papad Bell, Linking Road Plaza", img: "Images/Restaurant_Images/slightly_purple_theme_restaura.jpeg" },
    { state: "Maharashtra", city: "Mumbai", locality: "Dadar", name: "Papad Bell, Star Mall", img: "Images/Restaurant_Images/slightly_purple_theme_restaura (1).jpeg" },
    { state: "Maharashtra", city: "Pune", locality: "Shivajinagar", name: "Papad Bell, The Pavilion", img: "Images/Restaurant_Images/slightly_purple_theme_restaura (1).jpeg" },
    { state: "Maharashtra", city: "Pune", locality: "Wakad", name: "Papad Bell, Wakad Central", img: "Images/Restaurant_Images/image_of_a_restaurant_from_out.jpeg" },
    { state: "Maharashtra", city: "Pune", locality: "Baner", name: "Papad Bell, Baner Arcade", img: "Images/Restaurant_Images/image_of_a_restaurant_from_out (4).jpeg" },
    { state: "Maharashtra", city: "Pune", locality: "Hinjewadi", name: "Papad Bell, Xion Mall", img: "Images/Restaurant_Images/image_of_a_restaurant_from_out (3).jpeg" },
    { state: "Maharashtra", city: "Nagpur", locality: "Sitabubldi", name: "Papad Bell, Empress Mall", img: "Images/Restaurant_Images/image_of_a_restaurant_from_out (2).jpeg" },
    { state: "Maharashtra", city: "Nagpur", locality: "Dharampeth", name: "Papad Bell, Dharampeth Plaza", img: "Images/Restaurant_Images/image_of_a_restaurant_from_out (1).jpeg" },
    { state: "Maharashtra", city: "Nashik", locality: "Panchvati", name: "Papad Bell, Panchvati Square", img: "Images/Restaurant_Images/image_of_a_restaurant_from_ins.jpeg" },
    { state: "Maharashtra", city: "Nashik", locality: "Satpur", name: "Papad Bell, Satpur Hub", img: "Images/Restaurant_Images/image_of_a_restaurant_from_ins (4).jpeg" },
    { state: "Delhi", city: "South Delhi", locality: "Saket", name: "Papad Bell, Select Citywalk", img: "Images/Restaurant_Images/image_of_a_restaurant_from_ins (3).jpeg" },
    { state: "Delhi", city: "South Delhi", locality: "Vasant Kunj", name: "Papad Bell, DLF Promenade", img: "Images/Restaurant_Images/image_of_a_restaurant_from_ins (2).jpeg" },
    { state: "Delhi", city: "South Delhi", locality: "Greater Kailash", name: "Papad Bell, GK Market", img: "Images/Restaurant_Images/image_of_a_restaurant_from_ins (1).jpeg" },
    { state: "Delhi", city: "South Delhi", locality: "Malviya Nagar", name: "Papad Bell, Malviya Square", img: "Images/Restaurant_Images/A_modern_aesthetically_beautif.jpeg" },
    { state: "Delhi", city: "North Delhi", locality: "Rohini", name: "Papad Bell, North Ex Mall", img: "Images/Restaurant_Images/slightly_purple_theme_restaura.jpeg" },
    { state: "Delhi", city: "North Delhi", locality: "Mukherjee Nagar", name: "Papad Bell, Student Plaza", img: "Images/Restaurant_Images/image_of_a_restaurant_from_out.jpeg" },
    { state: "Delhi", city: "West Delhi", locality: "Rajouri Garden", name: "Papad Bell, Pacific Mall", img: "Images/Restaurant_Images/image_of_a_restaurant_from_out (4).jpeg" },
    { state: "Delhi", city: "West Delhi", locality: "Janakpuri", name: "Papad Bell, Janakpuri Central", img: "Images/Restaurant_Images/image_of_a_restaurant_from_out (3).jpeg" },
    { state: "Delhi", city: "Central Delhi", locality: "Connaught Place", name: "Papad Bell, CP Plaza", img: "Images/Restaurant_Images/image_of_a_restaurant_from_out (2).jpeg" },
    { state: "Delhi", city: "Central Delhi", locality: "Karol Bagh", name: "Papad Bell, Karol Bagh Arcade", img: "Images/Restaurant_Images/image_of_a_restaurant_from_out (1).jpeg" },
    { state: "Delhi", city: "Central Delhi", locality: "Kashmiri Gate", name: "Papad Bell, Heritage Square", img: "Images/Restaurant_Images/image_of_a_restaurant_from_ins.jpeg" },
    { state: "Karnataka", city: "Bengaluru", locality: "MG Road", name: "Papad Bell, Garuda Mall", img: "Images/Restaurant_Images/image_of_a_restaurant_from_ins (4).jpeg" },
    { state: "Karnataka", city: "Bengaluru", locality: "Whitefield", name: "Papad Bell, Phoenix Marketcity", img: "Images/Restaurant_Images/image_of_a_restaurant_from_ins (3).jpeg" },
    { state: "Karnataka", city: "Bengaluru", locality: "Electronic City", name: "Papad Bell, Tech Plaza", img: "Images/Restaurant_Images/image_of_a_restaurant_from_ins (2).jpeg" },
    { state: "Karnataka", city: "Mysuru", locality: "Lakshmipuram", name: "Papad Bell, Lakshmi Arcade", img: "Images/Restaurant_Images/image_of_a_restaurant_from_ins (1).jpeg" },
    { state: "Karnataka", city: "Mysuru", locality: "Saraswathipuram", name: "Papad Bell, Saras Plaza", img: "Images/Restaurant_Images/A_modern_aesthetically_beautif.jpeg" },
    { state: "Karnataka", city: "Mangalore", locality: "Hampankatta", name: "Papad Bell, Hampankatta Junction", img: "Images/Restaurant_Images/slightly_purple_theme_restaura.jpeg" },
    { state: "Karnataka", city: "Mangalore", locality: "Bejai", name: "Papad Bell, Bejai Square", img: "Images/Restaurant_Images/image_of_a_restaurant_from_out.jpeg" }
];
function loadStates() {
    let stateSelect = document.getElementById("state");
    Object.keys(locations).forEach(state => {
        let option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });
}

function updateCities() {
    let state = document.getElementById("state").value;
    let citySelect = document.getElementById("city");
    let localitySelect = document.getElementById("locality");

    citySelect.innerHTML = "<option value=''>Select City</option>";
    localitySelect.innerHTML = "<option value=''>Select Locality</option>";
    localitySelect.disabled = true;

    if (state) {
        Object.keys(locations[state]).forEach(city => {
            let option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
        citySelect.disabled = false;
    } else {
        citySelect.disabled = true;
    }
}


function updateLocalities() {
    let state = document.getElementById("state").value;
    let city = document.getElementById("city").value;
    let localitySelect = document.getElementById("locality");

    localitySelect.innerHTML = "<option value=''>Select Locality</option>";

    if (city) {
        locations[state][city].forEach(locality => {
            let option = document.createElement("option");
            option.value = locality;
            option.textContent = locality;
            localitySelect.appendChild(option);
        });
        localitySelect.disabled = false;
    } else {
        localitySelect.disabled = true;
    }
}

function searchStores() {
    let state = document.getElementById("state").value;
    let city = document.getElementById("city").value;
    let locality = document.getElementById("locality").value;

    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    let filteredStores = stores.filter(store => store.state === state && store.city === city && store.locality === locality);

    if (filteredStores.length > 0) {
        filteredStores.forEach(store => {
            resultsDiv.innerHTML += `
                <div class="store-card">
                    <img src="${store.img}" alt="${store.name}">
                    <h3>${store.name}</h3>
                    <p>${store.city}, ${store.locality}</p>
                </div>
            `;
        });
    } else {
        resultsDiv.innerHTML = "<p>No stores found.</p>";
    }
}

//states ko pehle se load hone dene ke liye
window.onload = loadStates;
