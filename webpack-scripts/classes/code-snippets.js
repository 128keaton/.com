import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/hopscotch.css';
import CodeSnippet from './code-snippet';
import CodeBlock from './code-block';

class CodeSnippets {
    codeBlock;
    snippets = [
        new CodeSnippet('print("is a developer")', 'swift'),
        new CodeSnippet('console.log("is a developer")', 'typescript'),
        new CodeSnippet('echo "is a developer"', 'php'),
        new CodeSnippet('puts "is a developer"', 'ruby'),
    ];
    initialSnippet = this.snippets[0];
    currentSnippet;

    constructor(selector) {
        this.codeBlock = new CodeBlock(selector);
        ['typescript', 'php', 'swift', 'ruby'].forEach((langName) => {
            // Using require() here because import() support hasn't landed in Webpack yet
            const langModule = require(`highlight.js/lib/languages/${langName}`);
            hljs.registerLanguage(langName, langModule);
        });
    }

    setInitialSnippet() {
        this.setSnippet(this.initialSnippet);
    }

    showNextSnippet() {
        const currentSnippetIndex = this.snippets.indexOf(this.currentSnippet);
        const nextSnippetIndex = currentSnippetIndex + 1;
        let nextSnippet = this.snippets[nextSnippetIndex];

        if (!this.snippets[nextSnippetIndex]) {
            nextSnippet = this.snippets[0];
        }

        this.setSnippet(nextSnippet);
    }

    showLastSnippet() {
        const currentSnippetIndex = this.snippets.indexOf(this.currentSnippet);
        const lastSnippetIndex = currentSnippetIndex - 1;
        let lastSnippet = this.snippets[lastSnippetIndex];

        if (!this.snippets[lastSnippetIndex]) {
            lastSnippet = this.snippets[this.snippets.length - 1];
        }

        this.setSnippet(lastSnippet);
    }

    setSnippet(snippet) {
        if (!snippet.isShowing) {
            if (!!this.currentSnippet) {
                this.currentSnippet.isShowing = false;
            }

            this.codeBlock.update(snippet);

            snippet.isShowing = true;
            this.currentSnippet = snippet;
        }
    }
}

export default CodeSnippets;
