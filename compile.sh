#!/bin/bash

INPUT_FILE=v1/main.tex
DEFAULT_BIB_FILE=bib/bibtex.bib
BIBFILE_LOCAL_NAME=bibtex.bib # use a fixed name. "main.tex" should also be like this.
OUTPUT_PDF=/Users/greg/Code/bayes-star/paper/symbolic-logic-also-needed-DRAFT.pdf
OUTPUT_TEX=/Users/greg/Code/bayes-star/paper/symbolic-logic-also-needed-DRAFT.tex

# Exit immediately if a command exits with a non-zero status
set -e

# Delete the workspace directory if it exists and create a new one
if [ -d "workspace" ]; then
  rm -rf workspace
fi
mkdir workspace

# Note: You always have to use "bibtex.bib" in your latex file because of this line.
# In other words, the interface is: it's configurable.
cp $DEFAULT_BIB_FILE workspace/${BIBFILE_LOCAL_NAME}

# Run the node command
node render/render.js $INPUT_FILE

# Create a symbolic link to the images directory inside workspace
ln -s $(pwd)/images workspace/images

# Change directory to workspace
cd workspace

pdflatex main.tex
bibtex main.aux
pdflatex main.tex
pdflatex main.tex

cp main.pdf ../coppola-creativity-working-2025.pdf

echo "Document compilation successful."

