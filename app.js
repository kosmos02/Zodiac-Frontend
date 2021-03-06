const $signSection = document.querySelector('#signs')

fetch("http://localhost:3000/zodiacs")
    .then(response => response.json())
    .then(zodiacs => zodiacs.forEach(zodiac => {
        displayZodiac(zodiac)
}))

function displayZodiac(zodiac){
    const $signCard = document.createElement('div')
        
    $signCard.className = "tick"
        
    const $zodiacImage = document.createElement('img')

    $zodiacImage.src = zodiac.image
    $zodiacImage.alt = zodiac.name
    $zodiacImage.title = zodiac.name
        
    $signCard.appendChild($zodiacImage)
    $signSection.append($signCard)
    
    $zodiacImage.addEventListener('mouseover', mouseoverEvent)
    $zodiacImage.addEventListener('mouseout', mouseoverEvent)

    function mouseoverEvent() {
        $zodiacImage.classList.toggle('mouseover')
    }

    const $zodiacCard = document.querySelector('.zodiac-info')

    $zodiacImage.addEventListener('click', clickEvent)

    let url = `https://sameer-kumar-aztro-v1.p.rapidapi.com/?day=today&sign=${zodiac.name}`

    
    const $yesterday = document.querySelector('#yesterday')
    const $today = document.querySelector('#today')
    const $tomorrow = document.querySelector('#tomorrow')

    $yesterday.addEventListener('click', yesterdayDisplay)
    $today.addEventListener('click', todayDisplay)
    $tomorrow.addEventListener('click', tomorrowDisplay)

    function yesterdayDisplay(){
        url = `https://sameer-kumar-aztro-v1.p.rapidapi.com/?day=yesterday&sign=${zodiac.name}`
        $zodiacCard.innerHTML = ""
    }

    function todayDisplay(){
        url = `https://sameer-kumar-aztro-v1.p.rapidapi.com/?day=today&sign=${zodiac.name}`
        $zodiacCard.innerHTML = ""
    }

    function tomorrowDisplay(){
        url = `https://sameer-kumar-aztro-v1.p.rapidapi.com/?day=tomorrow&sign=${zodiac.name}`
        $zodiacCard.innerHTML = ""
    }

    function clickEvent(){
        fetch(url, {
        "method": "POST",
        "headers": {
            "x-rapidapi-key": "bbad202a72msh4a869d328b03672p1e0647jsnf0b3ca6028a0",
            "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(sign => {
            console.log(sign)
            
            displayName(sign);
            displayDateInfo(sign);
            displayMood(sign);
            displayHoroscope(sign);
            displayColor(sign);
            displayCompatability(sign);
            displayLuckyTime(sign);
            displayLuckyNumber(sign)

        })
        .catch(err => {
            console.error(err);
        });

        function displayName(sign){
            $zodiacCard.innerHTML= ""
            const $signName = document.createElement('h1')
            $signName.textContent = zodiac.name 
            $zodiacCard.append($signName)
        }

        function displayDateInfo(sign){
            const $signDateRange = document.createElement('p')
            $signDateRange.textContent =  sign.date_range
            $zodiacCard.append($signDateRange)

            const $signCurrentDate = document.createElement('p')
            $signCurrentDate.textContent = `Date: ${sign.current_date}`
            $zodiacCard.append($signCurrentDate)
        }

        function displayMood(sign) {
            const $signMood = document.createElement('p')
            $signMood.textContent = `Mood: ${sign.mood}`
            $zodiacCard.append($signMood)
        }

        function displayHoroscope(sign) {
            const $signHoroscope = document.createElement('p')
            $signHoroscope.classList.add('horoscope')
            $signHoroscope.textContent = `Today's Horoscope: ${sign.description}`
            $zodiacCard.append($signHoroscope)
        }

        function displayColor(sign){
            const $signColor = document.createElement('p')
            $signColor.textContent = `Color: ${sign.color}`
            $zodiacCard.append($signColor)
        }

        function displayCompatability(sign){
            const $signCompatibility = document.createElement('p')
            $signCompatibility.textContent = `Compatibility: ${sign.compatibility}`
            $zodiacCard.append($signCompatibility)
        }

        function displayLuckyTime(sign){
            const $signLuckyTime = document.createElement('p')
            $signLuckyTime.textContent = `Lucky Time: ${sign.lucky_time}`
            $zodiacCard.append($signLuckyTime)
        }

        function displayLuckyNumber(sign){
            const $signLuckyNumber = document.createElement('p')
            $signLuckyNumber.textContent = `Lucky Number: ${sign.lucky_number}`
            $zodiacCard.append($signLuckyNumber)
            
            }
        }
            
}
