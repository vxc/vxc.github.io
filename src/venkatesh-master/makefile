SHELL:=/bin/sh
prj=.
build=${prj}/build
build-biblio=${build}/docs/biblio


date=$(shell date)
footer="$(date)"

# misc.bib
# talks.bib
# ws.bib
# submitted.bib

bibfiles= \
accepted.bib \
conf-papers.bib \
journal.bib \
patents.bib \
posters.bib \
thesis.bib \
tr.bib \
unpublished.bib \
ws-papers.bib


allbib=all.bib
css_file=${prj}/style/css/main.css

# all=main
all=all
index=index
emacs=emacs

bibtex2html=bibtex2html
bibtex2html-options= --title "Venkatesh Choppella bibliography" \
         -o index \
         --footer $(footer) \
         --sort-by-date \
         --reverse-sort \
         --revkeys \
		 -both \
         -multiple \
         -css  ${css_file}



all: pdf 

init:
	(mkdir -p ${build-biblio})

pdf: 
	latexmk -pdf -pdflatex="pdflatex --shell-escape %O %S"  ${all}


html: init
	(\rm -rf ${allbib}; cat ${bibfiles} > ${allbib}; ${bibtex2html} $(bibtex2html-options) $(allbib); mv *.html ${build-biblio}; rsync -a papers ${build-biblio}; rsync -a style ${build-biblio})


clean:
	(rm -rf ${build} *.aux *.bcf  *.bbl  *.blg  *.dvi  *.fdb_latexmk \
	*.fls *.html *.log *.out *.pdf *.ps *.toc *.run.xml)

date:
	echo $(footer)

