let previousLanguageElement;

const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    const homeRect = document.getElementById('home').getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= (homeRect.width - 50) &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const randomLanguageElement = () => {
    const elements = document.getElementsByClassName('language');

    if (elements.length > 0) {
        return elements[Math.floor(Math.random() * (elements.length + 1))];
    }
}

const flashRandomElement = () => {
    let languageElement = randomLanguageElement();

    if (screen.width <= 805 || !!!languageElement) {
        return;
    }

    if (!isInViewport(languageElement)) {
        languageElement = randomLanguageElement();
    }


    if (!!previousLanguageElement) {
        previousLanguageElement.classList.remove('show');
    }

    languageElement.classList.add('show');

    previousLanguageElement = languageElement;
}


window.setInterval(() => {
    flashRandomElement();
}, 3000);

