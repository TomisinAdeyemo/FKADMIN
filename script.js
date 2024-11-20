document.querySelectorAll('.left-panel .buttons button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.left-panel .buttons button').forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked button
        button.classList.add('active');
    });
});

// Fetching user data from the backend (example URL)
fetch('https://your-api-url.com/get-user-data')
    .then(response => response.json())
    .then(data => {
        // Assuming the backend response is an array of users
        const users = data.users;

        // Updating content dynamically for each user box
        users.forEach((user, index) => {
            document.getElementById(`user${index + 1}-name`).textContent = user.name;
            document.getElementById(`user${index + 1}-role`).textContent = user.role;
            document.getElementById(`user${index + 1}-id`).textContent = `ID: ${user.id}`;
        });
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });


    let map;

function initMap() {
    // Create a new map centered in the USA
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: { lat: 37.0902, lng: -95.7129 }, // Centered on the USA
    });

    // Example data: Active users by state
    const activeUsers = [
        { state: "California", lat: 36.7783, lng: -119.4179, count: 150 },
        { state: "Texas", lat: 31.9686, lng: -99.9018, count: 120 },
        { state: "Florida", lat: 27.9944, lng: -81.7603, count: 80 },
        // Add more user data here (get it dynamically from the backend)
    ];

    // Add markers for each active user location
    activeUsers.forEach(user => {
        new google.maps.Marker({
            position: { lat: user.lat, lng: user.lng },
            map: map,
            title: `${user.state}: ${user.count} active users`,
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Customize the marker icon
                scaledSize: new google.maps.Size(30, 30), // Adjust size
            },
        });
    });
}

// Ensure the map is initialized once the page is ready
window.onload = initMap;

// Function to update user data dynamically
function updateUserInfo(data) {
    document.getElementById('age').textContent = data.age || 'N/A';
    document.getElementById('location').textContent = data.location || 'N/A';
    document.getElementById('lastLogin').textContent = data.lastLogin || 'N/A';
    document.getElementById('subscription').textContent = data.subscriptionStatus || 'Inactive';
    document.getElementById('activity').textContent = data.activity || 'No Activity';
}

// Example of fetching user data
function fetchUserData(filter) {
    const url = `https://your-api-url.com/get-users?filter=${filter}`; // Replace with actual API endpoint

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Update the user info with fetched data
            updateUserInfo(data);
        })
        .catch(error => console.error('Error fetching user data:', error));
}

// Handling the switches for gender filter
document.getElementById('allSwitch').addEventListener('change', () => {
    fetchUserData('all');
});

document.getElementById('manSwitch').addEventListener('change', () => {
    fetchUserData('man');
});

document.getElementById('womanSwitch').addEventListener('change', () => {
    fetchUserData('woman');
});

// Initial fetch for All users
fetchUserData('all');
