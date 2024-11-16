let weather = {
    // API key for OpenWeatherMap
    apiKey: "Your API Key", // Replace with your actual API key from openweathermap.org

    // Function to fetch weather data for a specific city
    fetchWeather: function (city) {
        // Fetch data from OpenWeatherMap API
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city + // City name
            "&units=metric&appid=" +
            this.apiKey // Append the API key
        )
        .then((response) => {
            // Check if the response is valid
            if (!response.ok) {
                alert("No weather found."); // Alert the user if no weather data is found
                throw new Error("No weather found."); // Stop further execution
            }
            return response.json(); // Parse the response to JSON
        })
        .then((data) => this.displayWeather(data)); // Pass the JSON data to the displayWeather function
    },

    // Function to display weather data on the page
    displayWeather: function (data) {
        // Destructure required properties from the API response
        const { name } = data; // City name
        const { icon, description } = data.weather[0]; // Weather icon and description
        const { temp, humidity } = data.main; // Temperature and humidity
        const { speed } = data.wind; // Wind speed

        // Update the DOM with weather information
        document.querySelector(".city").innerText = "Weather in " + name; // Display city name
        document.querySelector(".icon").src = 
            "https://openweathermap.org/img/wn/" + icon + ".png"; // Display weather icon
        document.querySelector(".description").innerText = description; // Display weather description
        document.querySelector(".temp").innerText = temp + "°C"; // Display temperature
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%"; // Display humidity
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h"; // Display wind speed

        // Remove the "loading" class from the weather container
        document.querySelector(".weather").classList.remove("loading");

        // Optional: Set a random background image (commented out here)
        // const randomIndex = Math.floor(Math.random() * customLinks.length);
        // document.body.style.backgroundImage = "url(" + customLinks[randomIndex] + ")";
    },

    // Function to search for a city's weather
    search: function () {
        // Get the city name from the input field and fetch its weather
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

// Add an event listener to the search button
document.querySelector(".search button").addEventListener("click", function () {
    weather.search(); // Call the search function when the button is clicked
});

// Add an event listener for the Enter key in the search bar
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") { // Check if the Enter key is pressed
        weather.search(); // Call the search function
    }
});

// Fetch and display the weather for a default city ("Denver") when the page loads
weather.fetchWeather("Dhaka");
