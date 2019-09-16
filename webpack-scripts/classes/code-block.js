class CodeBlock {
    element;
    currentSnippet;

    constructor(selector) {
        this.element = $(selector);

        if (!this.element) {
            console.error('Invalid selector ' + selector);
        }
    }

    update(snippet) {
        this.currentSnippet = snippet;
        this.element.empty();
        this.element.append(snippet.getHighlightedCode());
        this.element.append('<i class="blink">█</i>')
    }
}

export default CodeBlock;
