#!/bin/bash

INPUT_FILE=v1/main.tex
DEFAULT_BIB_FILE=bib/bibtex.bib
BIBFILE_LOCAL_NAME=bibtex.bib # use a fixed name. "main.tex" should also be like this.
OUTPUT_PDF=/Users/greg/Code/bayes-star/paper/symbolic-logic-also-needed-DRAFT.pdf
OUTPUT_TEX=/Users/greg/Code/bayes-star/paper/symbolic-logic-also-needed-DRAFT.tex

# Exit immediately if a command exits with a non-zero status
set -e

cd workspace

cp main.pdf ${OUTPUT_PDF}
cp main.tex ${OUTPUT_TEX}

echo "Document packaging successful."

