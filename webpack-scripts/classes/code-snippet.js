import hljs from 'highlight.js/lib/highlight';

class CodeSnippet {
    code;
    language;
    isShowing;

    constructor(code, language) {
        this.code = code;
        this.language = language;
    }

    getHighlightedCode() {
        return hljs.highlight(this.language, this.code).value;
    }
}

export default CodeSnippet;
