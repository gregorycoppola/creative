const fs = require('fs');
const readline = require('readline');

// Function to search for a citation by a given keyword
const searchCitation = (fileName, searchString) => {
    const rl = readline.createInterface({
        input: fs.createReadStream(fileName),
        output: process.stdout,
        terminal: false
    });

    rl.on('line', (line) => {
        if (line.startsWith('@')) {
            const match = line.match(/@.+{(.+),/);
            if (match && match[1].toLowerCase().includes(searchString.toLowerCase())) {
                console.log(`Found citation ID: ${match[1]}`);
            }
        }
    });
};

// Using command line arguments for file name and search string
const fileName = process.argv[2];
const searchString = process.argv[3];

if (!fileName || !searchString) {
    console.log('Please provide both a file name and a search string.');
    process.exit(1);
}

searchCitation(fileName, searchString);
