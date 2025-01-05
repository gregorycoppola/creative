const fs = require('fs');
const readline = require('readline');

// Function to search for unused citations
const searchUnusedCitations = (bibtexFileName, latexFileName) => {
    fs.readFile(latexFileName, 'utf8', (err, latexContent) => {
        if (err) {
            console.error(`Error reading the LaTeX file: ${err}`);
            return;
        }

        const rl = readline.createInterface({
            input: fs.createReadStream(bibtexFileName),
            output: process.stdout,
            terminal: false
        });

        rl.on('line', (line) => {
            if (line.startsWith('@')) {
                const match = line.match(/@.+{(.+),/);
                if (match) {
                    const citationID = match[1].trim();
                    const regex = new RegExp(`\\b${citationID}\\b`);
                    if (!latexContent.match(regex)) {
                        console.log(`Unused citation ID: ${citationID}`);
                    }
                }
            }
        });
    });
};

// Using command line arguments for file names
const bibtexFileName = process.argv[2];
const latexFileName = process.argv[3];

if (!bibtexFileName || !latexFileName) {
    console.log('Please provide both a BibTeX file name and a LaTeX file name.');
    process.exit(1);
}

searchUnusedCitations(bibtexFileName, latexFileName);

