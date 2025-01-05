const fs = require('fs');
const path = require('path');
const logger = require('./logger')
const INCLUDE_DIRECTIVE = '@include';

function processFile(filePath, baseDir, fileExtension) {
    logger.dump({ filePath, baseDir, fileExtension }, processFile)
    const fullPath = filePath // path.join(baseDir, filePath);

    if (!fs.existsSync(fullPath)) {
        console.error(`File not found: ${fullPath}`);
        process.exit(1);
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\n');
    let result = '';

    for (const line of lines) {
        if (line.startsWith(INCLUDE_DIRECTIVE)) {
            const includeFile = line.split(' ')[1];
            if (includeFile) {
                const includeFilePath = path.join(baseDir, includeFile + fileExtension); // Assuming the files are .gs
                const currentDir = path.dirname(includeFilePath);

                result += processFile(includeFilePath, currentDir, fileExtension);
            }
        } else {
            result += line + '\n';
        }
    }

    return result;
}

async function main() {
    const fileName = process.argv[2];

    if (!fileName) {
        console.error('No file name provided. Usage: node render.js <filename>');
        process.exit(1);
    }

    const fileExtension = path.extname(fileName);

    if (fileExtension !== '.tex' && fileExtension !== '.md') {
        console.error('Invalid file extension. Only .tex and .md files are supported.');
        process.exit(1);
    }

    const baseDir = path.dirname(fileName);
    const processedContent = processFile(fileName, baseDir, fileExtension);
    const compiledName = 'workspace/main.tex'
    logger.dump({ compiledName, size:processedContent.length }, main)
    fs.writeFileSync(compiledName, processedContent);
}

main()