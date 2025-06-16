// Set any item to undefined to remove it from the site or to use the default value

export const GLOBAL = {
  // Site metadata
  username: "Venkatesh Choppella",
  rootUrl: "https://vxc.github.io",
  email: "venkatesh.choppella@iiit.ac.in",
  longDescription: [
    "Associate Professor at the Software Engineering Research Centre, IIIT Hyderabad",
    "Associate Dean, Division of Flexible Learning, IIIT Hyderabad",
  ],
  shortDescription: "Associate Professor, SERC @ IIIT Hyderabad",

  // Assistive staff E-mail ids, leave blank to hide in contact section
  administrativeEmail: "adminass@iiit.ac.in",
  executiveAssistantEmail: "execass@iiit.ac.in",

  // Social media links
  githubProfile: null,
  twitterProfile: null,

  // publications related details
  publicationsName: "Publications",

  // Common text names used throughout the site
  articlesName: "Articles",
  projectsName: "Ongoing Projects",
  viewAll: "View All",

  // Common descriptions used throughout the site
  noArticles: "No featured articles yet.",
  noProjects: "No featured projects yet.",

  // Blog metadata
  blogTitle: "My Thoughts & Takes",
  blogShortDescription: "Practical wisdom, unfiltered thoughts, and hot takes.",
  blogLongDescription:
    "Web development, tech trends, and the occasional programming mishap.",

  // Project metadata
  projectTitle: "Projects and Code",
  projectShortDescription:
    "A list of my web development projects and developer tools.",
  projectLongDescription:
    "All of my projects, including both frontend and full-stack applications.",

  // Profile
  profileImage: "/images/venkatesh-chopella.png",
  officeHours:
    "Mondays: 4pm-5pm, Room 501, Himalaya D Block or by appointment.",

  // Poem Controls
  poemName: "Functional Programming for no Rhyme or Reason",
  poemDescription: "- Venkatesh Choppella",

  // Menu items
  menu: {
    home: "/",
    projects: "/projects",
    research: "/research",
    teaching: "/teaching",
    biography: "/biography",
    bibliography: "/bibliography",
    // blog: "/blog",
  },
};

export const bibSections = [
  {
    title: "Journal Publications",
    file: "journal.bib",
    description: "Peer-reviewed journal articles",
  },
  {
    title: "Conference Papers",
    file: "conf-papers.bib",
    description: "Conference proceedings and papers",
  },
  {
    title: "Technical Reports",
    file: "tr.bib",
    description: "Technical reports and institutional publications",
  },
  {
    title: "Theses Supervised",
    file: "supervision.bib",
    description: "PhD and Masters theses supervised",
  },
  {
    title: "Talks and Presentations",
    file: "talks.bib",
    description: "Invited talks and presentations",
  },
  {
    title: "Posters",
    file: "posters.bib",
    description: "Conference posters and demonstrations",
  },
  {
    title: "Patents",
    file: "patents.bib",
    description: "Filed and granted patents",
  },
  {
    title: "Work in Progress",
    file: "wip.bib",
    description: "Ongoing research and draft papers",
  },
];
