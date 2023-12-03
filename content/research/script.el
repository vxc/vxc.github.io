(defvar org-file (elt argv 0))
(find-file org-file)
(org-latex-export-to-latex)
