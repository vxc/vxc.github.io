SHELL = `which bash`
FILE=resume
#FILE=railway
SHAILAJA=shailaja
SHORT=short
VERY_SHORT=very-short
TEXHOME=${HOME}/tex/latex

TEXINPUTS=:.:${TEXHOME}/listcolor//:${TEXHOME}/lastpage//:

all: pdf

pdf: 
	(export TEXINPUTS=${TEXINPUTS}; pdflatex ${FILE}; pdflatex ${FILE})

short:
	(export TEXINPUTS=${TEXINPUTS}; pdflatex ${SHORT}; bibtex ${SHORT}; pdflatex ${SHORT}; pdflatex ${SHORT})

very-short:
	(export TEXINPUTS=${TEXINPUTS}; pdflatex ${VERY_SHORT}; bibtex ${VERY_SHORT}; pdflatex ${VERY_SHORT}; pdflatex ${VERY_SHORT})


shailaja: 
	(export TEXINPUTS=${TEXINPUTS}; pdflatex ${SHAILAJA})

clean:
	rm -f *.aux *.ps  *.pdf *.bbl *.blg *.tmp *.dvi *.lof *.log *.toc *.out *.idx *~
