#SHELL := /bin/bash

CODE_DIR=build/code
PWD=$(shell pwd)
LINT_FILE=${PWD}/${CODE_DIR}/lint_output
EXIT_FILE=${PWD}/exit.txt
STATUS=0

all: build

init:
	./init.sh

build: init
	make -f tangle-make -k all

clean:
	make -f tangle-make clean
