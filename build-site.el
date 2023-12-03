;; Set the package installation directory so that packages aren't stored in the
;; ~/.emacs.d/elpa path.
(require 'package)
(setq package-user-dir (expand-file-name "./.packages"))
(setq package-archives '(("melpa" . "https://melpa.org/packages/")
                         ("elpa" . "https://elpa.gnu.org/packages/")))

;; Initialize the package system
(package-initialize)
(unless package-archive-contents
  (package-refresh-contents))

;; Install dependencies
(package-install 'htmlize)

;; Load the publishing system
(require 'ox-publish)
(setq org-publish-project-alist
      '(
        ;; Project "my-blog"
        ("content-notes"
         :base-directory "~/org/org-website/contents"
         :base-extension "org"
         :publishing-directory "~/org/org-website/public_html/"
         :publishing-function org-html-publish-to-html
         :headline-levels 4
         :auto-preamble t
         )

        ;; Project "my-notes"
        ("content-static"
         :base-directory "~/org/org-website/contents/"
         :base-extension "css\\|png\\|jpg\\|pdf\\|ogg\\|txt"
         :publishing-directory "~/org/org-website/public_html/"
         :publishing-function org-html-publish-to-html
         :headline-levels 4
         :auto-preamble t
         )
        ))

(org-publish-all t)

(message "Build complete!")
