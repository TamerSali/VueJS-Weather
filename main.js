
Vue.createApp({
    data() {
        return {
            api_key: "4ed18ee2bc8a7ea550adbd92cb17601a",
            url_base: 'https://api.openweathermap.org/data/2.5/',
            query: "",
            weather: {},
            err: "",
        }
    },

    computed: {
        coverImage() {
            if (this.weather.main) {
                if (this.weather.weather[0].main == "Clouds") {
                    return { backgroundImage: 'url(./Resources/clouds.gif)' }
                }
                else if (this.weather.weather[0].main == "Clear") {
                    return { backgroundImage: 'url(./Resources/clear.gif)' }
                }

                else if (this.weather.weather[0].main == "Rain") {
                    return { backgroundImage: 'url(./Resources/rainy.gif)' }

                }
                else if (this.weather.weather[0].main == "Mist" || this.weather.weather[0].main == "Haze" || this.weather.weather[0].main == "Fog") {
                    return { backgroundImage: 'url(./Resources/haze.gif)' }
                }
                else if (this.weather.weather[0].main == "Snow") {
                    return { backgroundImage: 'url(./Resources/snow.gif)' }
                }
            }
            else {
                return { backgroundImage: 'url(./Resources/weather.jpg)' }

            }


        },
        dateBuilder() {
            let d = new Date();
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let day = days[d.getDay()];
            let date = d.getDate();
            let month = months[d.getMonth()];
            let year = d.getFullYear();
            return `${day}, ${date} ${month} ${year}`;
        }
    },
    methods: {
        fetchWeather() {
            fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return this.err = '<img src="./Resources/error.png" /> <p>Something went wrong ( invalid name, network error... )<p>';
                    }
                }).then(this.setResults)


        },
        setResults(results) {
            this.weather = results;
        },

    },



}).mount("#app")

