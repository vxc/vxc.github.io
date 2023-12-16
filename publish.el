(defvar exclude-rx (rx (or "figs" "bib")))

(require 'org)
;; (require 'htmlize)
;; (load-file "org-infra/themes/math/org-templates/insert-latex-macros.el")
;; (require 'latex-macros)

;; See http://xahlee.info/emacs/emacs/emacs_file_encoding.html
;; UTF-8 as default encoding
(set-language-environment "UTF-8")
(set-default-coding-systems 'utf-8)
(set-keyboard-coding-system 'utf-8-unix)

(defun publish-project (src-dir docs-dir code-dir force)
  "publish project"
  (interactive)
  (setq org-babel-load-languages '((latex . t) (latex-macros . t)))
  ;;; exports  org files html and leaves them in  docs
  (setq org-docs
	  `("org-docs"
		:base-directory ,src-dir
		:base-extension "org"
		:publishing-directory ,docs-dir
		:recursive t
		:exclude ,exclude-rx
		:html-doctype "html5"
		:with-broken-links t
		:publishing-function org-html-publish-to-html
		:headline-levels 6		  ; Just the default for this project.
		:auto-preamble t
;		:auto-postamble 'my-postamble-function
		:auto-sitemap t
		:sitemap-title " "
		))
  (message "org-docs = %s" org-docs)
;;; copies non org (static) files  to docs
  (setq org-static
	  `("org-static"
		:base-directory ,src-dir
		:exclude ,exclude-rx
		:base-extension "png\\|css\\|js\\|txt\\|jpg\\|zip\\|svg\\|pdf"
		:publishing-directory ,docs-dir
		:recursive t
		:publishing-function org-publish-attachment
		))

;;; tangles code out from the *src-dir*
  (setq org-code
	  `("org-code"
		:base-directory ,src-dir
		:base-extension "org"
		:exclude ,exclude-rx
		:publishing-directory ,code-dir
		:recursive t
		;;		:publishing-function tangle-wrapper
		:publishing-function org-babel-tangle-publish
		))
  (message "org-code = %s" org-code)
  (setq prj
      '("prj" :components 
		(
		 "org-docs" 
		 "org-static" 
		 "org-code"
		 )))

  (setq org-publish-project-alist
		(list org-docs org-static org-code prj))

  (message "org-publish-project-alist = %s" org-publish-project-alist)    

  (org-publish-project  
   prj  ; project name
   force ; force
   ))

(defun publish-with-defaults ()
  (interactive)
  (publish-project "./src" "./build/docs" "./build/code" t))

(provide 'publish)
; (publish-project "./src" "./build/docs" "./build/code" t)
