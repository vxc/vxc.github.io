// utils/bibliography.ts
import fs from "fs";
import path from "path";

export interface BibEntry {
  id: string;
  type: string;
  title: string;
  author?: string;
  year?: string;
  journal?: string;
  booktitle?: string;
  publisher?: string;
  volume?: string;
  number?: string;
  pages?: string;
  doi?: string;
  url?: string;
  venue?: string;
  month?: string;
  editor?: string;
  address?: string;
  organization?: string;
  school?: string;
  note?: string;
  abstract?: string;
  keywords?: string;
  issn?: string;
  category?: string;
}

export interface BibCategory {
  name: string;
  entries: BibEntry[];
  count: number;
  description?: string;
}

// Parse a single BibTeX entry
export function parseBibEntry(entry: string): BibEntry | null {
  try {
    // Extract entry type and ID
    const typeMatch = entry.match(/@(\w+)\s*\{\s*([^,\s]+)/);
    if (!typeMatch) return null;

    const type = typeMatch[1].toLowerCase();
    const id = typeMatch[2];

    // Extract fields
    const fields: Record<string, string> = {};

    // Match field = {value} or field = "value"
    const fieldRegex = /(\w+)\s*=\s*[{"']([^}"']*)[}"']/g;
    let match;

    while ((match = fieldRegex.exec(entry)) !== null) {
      const fieldName = match[1].toLowerCase();
      let fieldValue = match[2].trim();

      // Clean up common LaTeX commands
      fieldValue = fieldValue
        .replace(/\\&/g, "&")
        .replace(/\\_/g, "_")
        .replace(/\\textbf\{([^}]+)\}/g, "$1")
        .replace(/\\textit\{([^}]+)\}/g, "$1")
        .replace(/\\emph\{([^}]+)\}/g, "$1")
        .replace(/\{([^}]+)\}/g, "$1")
        .replace(/~/g, " ")
        .trim();

      fields[fieldName] = fieldValue;
    }

    // Create BibEntry object
    const bibEntry: BibEntry = {
      id,
      type,
      title: fields.title || "Untitled",
      author: fields.author,
      year: fields.year,
      journal: fields.journal,
      booktitle: fields.booktitle,
      publisher: fields.publisher,
      volume: fields.volume,
      number: fields.number,
      pages: fields.pages,
      doi: fields.doi,
      url: fields.url,
      venue: fields.journal || fields.booktitle || fields.publisher,
      month: fields.month,
      editor: fields.editor,
      address: fields.address,
      organization: fields.organization,
      school: fields.school,
      note: fields.note,
      abstract: fields.abstract,
      keywords: fields.keywords,
      isbn: fields.isbn,
      issn: fields.issn,
    };

    return bibEntry;
  } catch (error) {
    console.error("Error parsing bib entry:", error);
    return null;
  }
}

// Parse a BibTeX file
export function parseBibFile(content: string): BibEntry[] {
  const entries: BibEntry[] = [];

  // Split by @ symbols to get individual entries
  const rawEntries = content.split("@").filter((entry) => entry.trim());

  for (const rawEntry of rawEntries) {
    const fullEntry = "@" + rawEntry;
    const parsed = parseBibEntry(fullEntry);
    if (parsed) {
      entries.push(parsed);
    }
  }

  return entries;
}

// Load all bibliography files
export async function loadBibliography(
  bibDirectory: string,
): Promise<BibCategory[]> {
  const categories: BibCategory[] = [];

  // Define category mappings
  const categoryMappings: Record<
    string,
    { name: string; description: string }
  > = {
    "journal.bib": {
      name: "Journal Articles",
      description: "Peer-reviewed journal publications",
    },
    "conf-papers.bib": {
      name: "Conference Papers",
      description: "Conference proceedings and presentations",
    },
    "ws-papers.bib": {
      name: "Workshop Papers",
      description: "Workshop papers and short communications",
    },
    "ws.bib": {
      name: "Workshops",
      description: "Workshop organization and participation",
    },
    "talks.bib": {
      name: "Talks & Presentations",
      description: "Invited talks and presentations",
    },
    "posters.bib": {
      name: "Posters",
      description: "Conference posters and demonstrations",
    },
    "thesis.bib": { name: "Theses", description: "PhD and Master's theses" },
    "tr.bib": {
      name: "Technical Reports",
      description: "Technical reports and white papers",
    },
    "supervision.bib": {
      name: "Student Supervision",
      description: "Supervised student projects and theses",
    },
    "patents.bib": {
      name: "Patents",
      description: "Patent applications and grants",
    },
    "accepted.bib": {
      name: "Recently Accepted",
      description: "Recently accepted publications",
    },
    "submitted.bib": {
      name: "Under Review",
      description: "Papers currently under review",
    },
    "wip.bib": {
      name: "Work in Progress",
      description: "Ongoing research and drafts",
    },
    "unpublished.bib": {
      name: "Unpublished Work",
      description: "Unpublished manuscripts and preprints",
    },
    "ref.bib": { name: "References", description: "Reference collection" },
    "rest.bib": {
      name: "Other Publications",
      description: "Miscellaneous publications",
    },
    "misc.bib": {
      name: "Miscellaneous",
      description: "Other academic contributions",
    },
    "other.bib": {
      name: "Additional Work",
      description: "Additional academic work",
    },
  };

  try {
    const files = fs.readdirSync(bibDirectory);
    const bibFiles = files.filter((file) => file.endsWith(".bib"));

    for (const bibFile of bibFiles) {
      const filePath = path.join(bibDirectory, bibFile);
      const content = fs.readFileSync(filePath, "utf-8");

      if (content.trim()) {
        // Only process non-empty files
        const entries = parseBibFile(content);

        if (entries.length > 0) {
          const categoryInfo = categoryMappings[bibFile] || {
            name: bibFile
              .replace(".bib", "")
              .replace("-", " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            description: `Publications from ${bibFile}`,
          };

          // Sort entries by year (newest first)
          entries.sort((a, b) => {
            const yearA = parseInt(a.year || "0");
            const yearB = parseInt(b.year || "0");
            return yearB - yearA;
          });

          categories.push({
            name: categoryInfo.name,
            entries,
            count: entries.length,
            description: categoryInfo.description,
            category: bibFile.replace(".bib", ""),
          });
        }
      }
    }

    // Sort categories by importance/size
    const categoryOrder = [
      "journal.bib",
      "conf-papers.bib",
      "talks.bib",
      "supervision.bib",
      "thesis.bib",
      "tr.bib",
      "ws-papers.bib",
      "ws.bib",
      "posters.bib",
      "accepted.bib",
      "submitted.bib",
      "wip.bib",
      "patents.bib",
      "unpublished.bib",
      "rest.bib",
      "misc.bib",
      "other.bib",
    ];

    categories.sort((a, b) => {
      const aIndex = categoryOrder.findIndex(
        (cat) => cat.replace(".bib", "") === a.category,
      );
      const bIndex = categoryOrder.findIndex(
        (cat) => cat.replace(".bib", "") === b.category,
      );

      if (aIndex === -1 && bIndex === -1) return b.count - a.count;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  } catch (error) {
    console.error("Error loading bibliography:", error);
  }

  return categories;
}

// Format author names
export function formatAuthors(authors: string): string {
  if (!authors) return "";

  return authors
    .split(" and ")
    .map((author) => {
      const parts = author.trim().split(",");
      if (parts.length >= 2) {
        const lastName = parts[0].trim();
        const firstName = parts[1].trim();
        return `${firstName} ${lastName}`;
      }
      return author.trim();
    })
    .join(", ");
}

// Generate citation string
export function formatCitation(entry: BibEntry): string {
  let citation = "";

  if (entry.author) {
    citation += formatAuthors(entry.author);
  }

  if (entry.year) {
    citation += ` (${entry.year})`;
  }

  citation += `. "${entry.title}"`;

  if (entry.journal) {
    citation += ` ${entry.journal}`;
    if (entry.volume) citation += ` ${entry.volume}`;
    if (entry.number) citation += `(${entry.number})`;
    if (entry.pages) citation += `: ${entry.pages}`;
  } else if (entry.booktitle) {
    citation += ` In ${entry.booktitle}`;
    if (entry.pages) citation += `, pp. ${entry.pages}`;
  } else if (entry.publisher) {
    citation += ` ${entry.publisher}`;
  }

  citation += ".";

  return citation;
}

// Get statistics
export function getBibliographyStats(categories: BibCategory[]) {
  const totalEntries = categories.reduce((sum, cat) => sum + cat.count, 0);
  const yearStats: Record<string, number> = {};
  const typeStats: Record<string, number> = {};

  categories.forEach((category) => {
    category.entries.forEach((entry) => {
      if (entry.year) {
        yearStats[entry.year] = (yearStats[entry.year] || 0) + 1;
      }
      typeStats[entry.type] = (typeStats[entry.type] || 0) + 1;
    });
  });

  return {
    totalEntries,
    totalCategories: categories.length,
    yearStats,
    typeStats,
    recentYears: Object.keys(yearStats)
      .sort((a, b) => parseInt(b) - parseInt(a))
      .slice(0, 5),
  };
}
