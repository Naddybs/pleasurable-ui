// De domcontentloaded event listener zorgt ervoor dat de code wordt uitgevoerd wanneer de DOM is geladen.
// De querySelectorAll functie zoekt naar alle formulieren die beginnen met de id scoreForm-.

// De forEach methode wordt gebruikt om door elk formulier te loopen.
// In de forEach methode wordt een event listener toegevoegd aan elk formulier.
// De querySelectorAll functie zoekt naar alle radio buttons binnen de rating-group.

// De forEach methode wordt gebruikt om door elke radio button te loopen.
// De addEventListener methode wordt gebruikt om een event listener toe te voegen aan elke radio button.
// De change event wordt gebruikt om te controleren of de waarde van de radio button is veranderd.
// De textContent eigenschap wordt gebruikt om de waarde van de radio button weer te geven in de rating-value div.

document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form[id^="scoreForm-"]');

    forms.forEach(form => {
        const ratingGroups = form.querySelectorAll('.rating-group');
        
        ratingGroups.forEach(group => {
            const radios = group.querySelectorAll('input[type="radio"]');
            const ratingValue = group.querySelector('.rating-value');

            radios.forEach(radio => {
                radio.addEventListener('change', function() {
                    ratingValue.textContent = this.value;
                });
            });
        });
    });
});
// Selecteer alle formulieren
let forms = document.querySelectorAll('.scoreForm');

// Loop door alle formulieren
forms.forEach(function (form) {
    // Luister naar het submit event
    form.addEventListener('submit', function (event) {

        // Het this object refereert hier naar het formulier zelf
        // Lees de data van het formulier in
        let data = new FormData(this);

        // Voeg een extra eigenschap aan de formulierdata toe
        // Deze gaan we server-side gebruiken om iets anders terug te sturen
        data.append('enhanced', true);

        // Console.log om te controleren of de beoordelingsgegevens correct worden opgehaald
        console.log(data.get('beoordeling'));

        // Gebruik een client-side fetch om een POST te doen naar de server
        fetch(this.action, {
            // Gebruik de juiste method (waarschijnlijk POST)
            method: this.method,
            // Geef de data van het formulier mee als body
            body: new URLSearchParams(data),
        })
        .then(function (response) {
            // Als de server een antwoord geeft, krijgen we een stream terug
            // We willen hiervan de text gebruiken, wat in dit geval HTML teruggeeft
            return response.text();
        })
        .then(function (responseHTML) {
            // Update de DOM met de ontvangen HTML
            document.querySelector('.showResults').innerHTML = responseHTML;
        })
        .catch(function (error) {
            // Handel eventuele fouten af
            console.error('Error:', error);
        });

        // Voorkom het standaardgedrag van het formulier (pagina herladen)
        event.preventDefault();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const ratingButtons = document.querySelectorAll('.rating-button');
    const blurOverlay = document.querySelector('.blur-overlay');
    const popOverContainers = document.querySelectorAll('.pop-over-container');

    ratingButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Verberg alle pop-overcontainers eerst
            popOverContainers.forEach(container => container.classList.remove('show-pop-over'));
            blurOverlay.classList.remove('show');
            
            // Toon de bijbehorende pop-overcontainer
            popOverContainers[index].classList.add('show-pop-over');
            blurOverlay.classList.add('show');
        });
    });

    blurOverlay.addEventListener('click', function() {
        popOverContainers.forEach(container => container.classList.remove('show-pop-over'));
        blurOverlay.classList.remove('show');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const ratingButtons = document.querySelectorAll('.rating-button');
    const ratingPopOver = document.querySelector('.beoordeling');

    ratingButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toon of verberg de beoordelingssectie op basis van de huidige zichtbaarheid
            if (ratingPopOver.classList.contains('show-pop-over')) {
                ratingPopOver.classList.remove('show-pop-over');
            } else {
                ratingPopOver.classList.add('show-pop-over');
            }

            // Voeg een klasse toe aan de body om het vervaagde achtergrondeffect te activeren
            document.body.classList.toggle('blur-background');
        });
    });
});
