SHELL = `which bash`
FILE=iiitmk-feedback

# TEXINPUTS=:.:lib/macros:${HOME}/tex/latex/texpower//:${HOME}/tex/latex/hyperref//:${HOME}/tex/latex/foiltex//:${HOME}/tex/latex/pdfpages//:${HOME}/tex/latex/listcolor//:${HOME}/tex/latex/mdwslides//:${HOME}/tex/latex/ifmslide//:

nup: 
	(export TEXINPUTS=${TEXINPUTS}; pdflatex ${FILE}.tex) 

clean:
	rm -f *.aux *.ps  *.pdf *.bbl *.blg *.tmp *.dvi *.lof *.log *.toc *.out *.idx *~
