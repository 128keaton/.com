let start, previousLanguageElement;

const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const randomLanguageElement = () => {
    const elements = document.getElementsByClassName('language');
    const element = elements[Math.floor(Math.random() * (elements.length + 1))];

    if (element === undefined || !isInViewport(element) || element === previousLanguageElement) {
        return randomLanguageElement();
    }

    return element;
}

const flashRandomElement = () => {
    const languageElement = randomLanguageElement();

    if (!!previousLanguageElement) {
        previousLanguageElement.classList.remove('show');
    }

    languageElement.classList.add('show');

    previousLanguageElement = languageElement;
}

const step = (timestamp) => {
    if (start === undefined)
        start = timestamp;

    const elapsed = timestamp - start;

    if (elapsed >= 2000) {
        start = undefined;
        flashRandomElement();
    }

    window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
flashRandomElement();
