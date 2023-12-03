# -*- Mode: makefile -*-
#
# 
SHELL = `which bash`
FILE = report

TOP=/home/choppell/tex/latex
# TEXINPUTS=.:$(TOP)/pdfscreen-1.5//:$(TOP)/truncate//:$(TOP)/fancyvrb//:$(TOP)/llncs//:$(TOP)/epigraph//:

TEXINPUTS=.:$(TOP)/epigraph//:

all: paper

paper: 
	(export TEXINPUTS=$(TEXINPUTS); pdflatex $(FILE); bibtex $(FILE); bibtex $(FILE); pdflatex $(FILE); pdflatex $(FILE))

clean:
	/bin/rm -f *.aux $(FILE).bbl $(FILE).blg *.cfg $(FILE).dvi $(FILE).log $(FILE).lot  $(FILE).out $(FILE).ps 2up-$(FILE).ps $(FILE).pdf  $(FILE).rel $(FILE).toc texput.log *~

