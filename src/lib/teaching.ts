import { useState } from "react";
import {
  Calendar,
  GraduationCap,
  BookOpen,
  Code,
  Layers,
  Database,
  Globe,
  Brain,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define course types for color coding
export const courseTypes = {
  programming: {
    color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    icon: Code,
  },
  languages: {
    color: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    icon: BookOpen,
  },
  compilers: {
    color: "bg-amber-100 text-amber-800 hover:bg-amber-200",
    icon: Layers,
  },
  web: {
    color: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
    icon: Globe,
  },
  algorithms: {
    color: "bg-rose-100 text-rose-800 hover:bg-rose-200",
    icon: Brain,
  },
  database: {
    color: "bg-cyan-100 text-cyan-800 hover:bg-cyan-200",
    icon: Database,
  },
  workshop: {
    color: "bg-lime-100 text-lime-800 hover:bg-lime-200",
    icon: GraduationCap,
  },
  other: {
    color: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    icon: Calendar,
  },
};

// Helper function to determine course type
export function getCourseType(title: string) {
  const lowerTitle = title.toLowerCase();
  if (
    lowerTitle.includes("programming") ||
    lowerTitle.includes("problem solving")
  )
    return "programming";
  if (lowerTitle.includes("language")) return "languages";
  if (lowerTitle.includes("compiler") || lowerTitle.includes("interpreter"))
    return "compilers";
  if (lowerTitle.includes("web")) return "web";
  if (lowerTitle.includes("algorithm") || lowerTitle.includes("data structure"))
    return "algorithms";
  if (lowerTitle.includes("database")) return "database";
  if (lowerTitle.includes("workshop") || lowerTitle.includes("short course"))
    return "workshop";
  return "other";
}

// Course data organized by year
export const courseData = [
  {
    year: 2024,
    courses: [
      {
        title: "Principles of Programming Languages",
        season: "Summer",
        institution: "eMasters",
        type: "programming",
      },
      {
        title: "Principles of Programming Languages",
        season: "Monsoon",
        institution: "IIITH",
        type: "languages",
      },
      {
        title: "Compilers",
        season: "Spring",
        institution: "IIITH",
        type: "compilers",
      },
      {
        title: "Software Foundations",
        season: "Spring",
        institution: "IIITH",
        type: "programming",
      },
    ],
  },
  {
    year: 2023,
    courses: [
      {
        title: "Principles of Programming Languages",
        season: "Monsoon",
        institution: "IIITH",
        type: "languages",
      },
      {
        title: "Compilers",
        season: "Spring",
        institution: "IIITH",
        type: "compilers",
      },
      {
        title: "Software Foundations",
        season: "Spring",
        institution: "IIITH",
        type: "programming",
      },
    ],
  },
  {
    year: 2022,
    courses: [
      {
        title: "Principles of Programming Languages",
        season: "Monsoon",
        institution: "IIITH",
        type: "languages",
      },
      {
        title: "Software Foundations",
        season: "Spring",
        institution: "IIITH",
        type: "programming",
      },
    ],
  },
  {
    year: 2020,
    courses: [
      {
        title: "Principles of Programming Languages",
        season: "Monsoon",
        institution: "IIITH",
        type: "languages",
      },
      {
        title: "Program Verification",
        season: "Spring",
        institution: "IIITH",
        type: "programming",
      },
    ],
  },
  {
    year: 2019,
    courses: [
      {
        title: "Principles of Programming Languages",
        season: "Monsoon",
        institution: "IIITH",
        type: "languages",
      },
      {
        title: "Program Verification",
        season: "Spring",
        institution: "IIITH",
        type: "programming",
      },
    ],
  },
  {
    year: 2018,
    courses: [
      {
        title: "Principles of Programming Languages",
        season: "Monsoon",
        institution: "IIITH",
        type: "languages",
      },
      {
        title: "Advanced Problem Solving",
        season: "Monsoon",
        institution: "IIITH",
        type: "programming",
      },
    ],
  },
  {
    year: 2017,
    courses: [
      {
        title: "IT Workshop 2",
        season: "Spring",
        institution: "IIITH",
        type: "other",
      },
      {
        title: "Git Version Control",
        season: "July",
        institution: "DRDO Hyderabad",
        type: "workshop",
        description: "3 day short course July 24th–26th, 2017",
      },
      {
        title: "Virtual Labs on the College Cloud",
        season: "May",
        institution: "JUIT, Waknaghat",
        type: "workshop",
        description: "2 day workshop for college teachers May 9th–10th 2017",
      },
    ],
  },
  {
    year: 2016,
    courses: [
      {
        title: "Principles of Programming Languages",
        season: "Monsoon",
        institution: "IIITH",
        type: "languages",
      },
      {
        title: "Software Foundations",
        season: "Spring",
        institution: "IIITH",
        type: "programming",
      },
      {
        title: "Building a web application from Ground Up to the Cloud",
        season: "May-June",
        institution: "IIITH",
        type: "workshop",
        description:
          "3 week short course May 16th-Jun 4th 2016 for Virtual Labs summer interns",
      },
    ],
  },
  {
    year: 2015,
    courses: [
      {
        title: "Principles of Programming Languages",
        season: "Monsoon",
        institution: "IIITH",
        type: "languages",
      },
      {
        title: "Software Foundations",
        season: "Spring",
        institution: "IIITH",
        type: "programming",
      },
      {
        title: "Computer Problem Solving",
        season: "Monsoon",
        institution: "IIITH",
        type: "programming",
      },
    ],
  },
  {
    year: 2014,
    courses: [
      {
        title: "Principles of Programming Languages",
        season: "Monsoon",
        institution: "IIITH",
        type: "languages",
      },
      {
        title: "Semantics of Programming Languages",
        season: "Spring",
        institution: "IIITH",
        type: "languages",
      },
      {
        title: "Dynamical Systems, Automata and Functional Programming",
        season: "January",
        institution: "Goa University ASC",
        type: "workshop",
        description: "2 day short course for college teachers. 13-14 Jan, 2014",
      },
    ],
  },
  {
    year: 2013,
    courses: [
      {
        title: "Principles of Programming Languages",
        season: "Monsoon",
        institution: "IIITH",
        type: "languages",
      },
      {
        title: "Semantics of Programming Languages",
        season: "Spring",
        institution: "IIITH",
        type: "languages",
      },
      {
        title: "Mapcode and Computer Problem Solving",
        season: "May",
        institution: "VNR Vignan Jyothi College",
        type: "workshop",
        description: "3 day short course for College Teachers. May 27-29, 2013",
      },
    ],
  },
  {
    year: 2012,
    courses: [
      {
        title: "Principles of Programming Languages",
        season: "Monsoon",
        institution: "IIITH",
        type: "languages",
      },
      {
        title: "Topics in Programming Languages",
        season: "Spring",
        institution: "IIITH",
        type: "languages",
      },
    ],
  },
  {
    year: 2011,
    courses: [
      {
        title: "Principles of Programming Languages",
        season: "Monsoon",
        institution: "IIITH",
        type: "languages",
      },
      {
        title: "IT Workshop 2",
        season: "Spring",
        institution: "IIITH",
        type: "other",
      },
    ],
  },
  {
    year: 2010,
    courses: [
      {
        title: "Principles of Programming Languages",
        season: "Monsoon",
        institution: "IIITH",
        type: "languages",
      },
      {
        title: "IT Workshop 2",
        season: "Spring",
        institution: "IIITH",
        type: "other",
      },
      {
        title: "Principles of Programming for the Web",
        season: "May",
        institution: "IIITH",
        type: "workshop",
        description:
          "11 day short course for Andhra Pradesh College Teachers under the Govt. India TEQIP Project. May 3-13, 2010",
      },
    ],
  },
  {
    year: 2009,
    courses: [
      {
        title: "Principles of Programming Languages",
        season: "Monsoon",
        institution: "IIITH",
        type: "languages",
      },
      {
        title: "Programming Application Software",
        season: "Fall",
        institution: "IIIT Bangalore",
        type: "programming",
      },
      {
        title: "Data Structures and Algorithms",
        season: "Spring",
        institution: "IIITM Kerala",
        type: "algorithms",
      },
    ],
  },
  {
    year: 2008,
    courses: [
      {
        title: "Web Technologies",
        season: "Fall",
        institution: "IIITM-K",
        type: "web",
      },
      {
        title: "Practical Program Verification",
        season: "February",
        institution: "TCS Hyderabad",
        type: "workshop",
        description:
          "4 day short course under the Tata Excellence in Computer Science (TECS) Programme. 14-18th February, 2008",
      },
    ],
  },
  {
    year: 2007,
    courses: [
      {
        title: "Web Technologies",
        season: "Fall",
        institution: "IIITM-K",
        type: "web",
      },
      {
        title: "Computational Biology",
        season: "Fall",
        institution: "IIITM-K",
        type: "other",
        description: "Co-instructor",
      },
    ],
  },
  {
    year: 2006,
    courses: [
      {
        title: "Web Technologies",
        season: "Fall",
        institution: "IIITM-K",
        type: "web",
      },
      {
        title: "Scientific Computing",
        season: "Fall",
        institution: "IIITM-K",
        type: "other",
        description: "Co-instructor",
      },
      {
        title: "Database Systems",
        season: "Spring",
        institution: "IIITM-K",
        type: "database",
        description: "Co-instructor",
      },
    ],
  },
  {
    year: 2005,
    courses: [
      {
        title: "Database Systems",
        season: "Spring",
        institution: "IIITM-K",
        type: "database",
        description: "Co-instructor",
      },
    ],
  },
  {
    year: 2004,
    courses: [
      {
        title: "Interpreters and Compilers",
        season: "Spring",
        institution: "IIITM-K",
        type: "compilers",
      },
      {
        title: "Advanced Web Technologies",
        season: "Spring",
        institution: "IIITM-K",
        type: "web",
      },
      {
        title: "Mathematical Foundations of Information Technology",
        season: "Winter",
        institution: "IIITM-K",
        type: "other",
      },
    ],
  },
  {
    year: 2003,
    courses: [
      {
        title: "Web Technologies",
        season: "Winter",
        institution: "IIITM-K",
        type: "web",
      },
    ],
  },
];
