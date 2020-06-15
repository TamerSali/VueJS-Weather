
window.onload = function () {
    new Vue({
        el: "#app",
        data: {
            temperature: "<img src='Resources/background.jpg'/>",
            api_key: "4ed18ee2bc8a7ea550adbd92cb17601a",
            url_base: 'https://api.openweathermap.org/data/2.5/',
            query: "",
            weather: {}, loading: false,
        },
        methods: {
            fetchWeather: function () {

                fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
                    .then(res => {
                        return res.json();
                    }).then(this.setResults);

            },
            setResults: function (results) {
                this.weather = results;

            },
            dateBuilder: function () {
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
        created() {
            this.loading = true;
            setTimeout(() => {
                this.fetchWeather();
                this.loading = false;
            }, 3000)
        }

    });
}
