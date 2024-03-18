src=./content
docs=./build/docs
code=./build/code
 # force=t|nil
force=t

all: publish

publish:
	emacs -Q  --batch --eval="(progn (load-file \"publish.el\") (publish-project \"${src}\" \"${docs}\" \"${code}\" ${force}))"
	python3 ./content/research/bib_org.py


clean-build:
		\rm -rf build/*

