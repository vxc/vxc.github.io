import re

def parse_bibtex(bibtex):
    entries = []
    current_entry = {}
    lines = iter(bibtex.splitlines())
    
    for line in lines:
        line = line.strip()
        if not line.startswith('@'):
            continue
        
        match_obj = re.match(r'@(\w+)\s*{\s*(\w+),', line)
        if match_obj:
            try:
                entry_type, entry_key = match_obj.groups()
                current_entry = {'type': entry_type, 'key': entry_key}
            except AttributeError:
                continue
        
        for line in lines:
            line = line.strip()
            if line == '}':
                entries.append(current_entry)
                current_entry = {}
                break
            
            if '=' in line:
                key, value = line.split('=', 1)
                key = key.strip().lower()
                # Concatenate lines until the end of the author field
                if key == 'author':
                    author_value = value.strip().strip('{').strip('},')
                    for next_line in lines:
                        next_line = next_line.strip()
                        if next_line.endswith('},'):
                            author_value += ' ' + next_line.strip().strip('},')
                        else:
                            author_value += ' ' + next_line.strip()
                            if '}' in next_line:
                                break
                    current_entry[key] = author_value
                
                else:
                    value = value.strip().strip('{').strip('},')
                    current_entry[key] = value

    return entries

def format_orgmode(entries):
    orgmode_entries = []
    
    for entry in entries:

        authors = entry.get('author', 'Unknown author')
        title = entry.get('title', 'Untitled')
        journal = entry.get('journal', 'Unknown journal')
        booktitle = entry.get('booktitle', 'Unknown book title')
        publisher = entry.get('publisher', 'Unknown publisher')
        pages = entry.get('pages', 'Unknown pages')
        year = entry.get('year', 'Unknown year')
        doi = entry.get('doi', 'Unknown DOI')
        url = entry.get('url', '#')
        
        org_entry = f"#+BEGIN_EXPORT html\n"
        org_entry += f"<li>\n"
        org_entry += f"  <p>{authors}. \"{title}\". In {journal}, pp. {pages}, {year}. <a href=\"{url}\">DOI: {doi}</a>.</p>\n"
        org_entry += f"</li>\n"
        org_entry += f"#+END_EXPORT\n\n"
        
        orgmode_entries.append(org_entry)
    
    return '\n'.join(orgmode_entries)

if __name__ == "__main__":
    with open('./content/research/vxc.bib', "r", encoding="utf-8") as f:
        bibtex_content = f.read()
    
    # print("BibTeX content:")
    # print(bibtex_content)
    
    entries = parse_bibtex(bibtex_content)
    print(f"Number of bib entries parsed: {len(entries)}")
    # print("Parsed bib entries:")
    # for entry in entries:
    #     print(entry)
    
    orgmode_content = format_orgmode(entries)
    # print("Org-mode content:")
    # print(orgmode_content)

    with open("./content/research/vxc.org", "w", encoding="utf-8") as f:
        f.write(orgmode_content)
