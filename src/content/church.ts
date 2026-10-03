// Centralized church content. Edit text and images here — components read from this file.
import hero from "@/assets/hero.jpg";
import community from "@/assets/community.jpg";
import youth from "@/assets/youth.jpg";
import children from "@/assets/children.jpg";
import guild from "@/assets/guild.jpg";
import men from "@/assets/men.jpg";
import choir from "@/assets/choir.jpg";
import project from "@/assets/project.jpg";

export const church = {
  name: "P.C.E.A Geoffrey Gathu Memorial Church",
  shortName: "Geoffrey Gathu Memorial",
  tagline: "Where Faith Meets Love",
  // Leave empty until verified — sections show a friendly "coming soon" note instead.
  address: "",
  phone: "",
  email: "",
  social: [] as { label: string; url: string }[],
};

export const images = { hero, community, youth, children, guild, men, choir, project };

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "ministries", label: "Ministries" },
  { id: "events", label: "Events" },
  { id: "projects", label: "Projects" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

export const scripture = {
  text: "For where two or three gather in my name, there am I with them.",
  reference: "Matthew 18:20",
};

export type Service = { name: string; day: string; time: string; description: string; verified: boolean; icon: "sun" | "flame" | "users" };

export const services: Service[] = [
  { name: "Sunday Worship", day: "Sunday", time: "10:00 AM – 12:00 PM", description: "Our main gathering of praise, prayer and the preaching of God's Word for the whole family.", verified: true, icon: "sun" },
  { name: "Youth Service", day: "Day to be confirmed", time: "10:00 AM – 12:00 PM", description: "A vibrant service where young people worship, ask honest questions and grow together.", verified: false, icon: "flame" },
  { name: "Midweek Fellowship", day: "Day to be confirmed", time: "4:00 PM", description: "A mid-week pause for prayer, Bible study and encouragement in smaller groups.", verified: false, icon: "users" },
];

export const officeHours = [
  { days: "Monday – Friday", hours: "8:00 AM – 5:00 PM" },
  { days: "Saturday", hours: "9:00 AM – 1:00 PM" },
  { days: "Sunday", hours: "Closed, except for services" },
];

export type Ministry = { id: string; name: string; full: string; image: string; intro: string; details: string };

export const ministries: Ministry[] = [
  { id: "pcmf", name: "PCMF", full: "Presbyterian Church Men's Fellowship", image: men, intro: "Men growing in faith, leadership and service to family and community.", details: "PCMF brings men together for Bible study, prayer, mentorship and practical service. Meeting times and leadership details will be shared by the church office." },
  { id: "guild", name: "Woman's Guild", full: "Woman's Guild", image: guild, intro: "Women united in prayer, fellowship and service.", details: "The Woman's Guild supports the spiritual growth of women through prayer, teaching and outreach to families and those in need. Contact the church office for meeting details." },
  { id: "youth", name: "Youth Ministry", full: "Youth Ministry", image: youth, intro: "A place for young people to belong, worship and lead.", details: "Our youth ministry creates space for worship, honest conversation and discipleship, helping young people grow into confident followers of Christ." },
  { id: "children", name: "Children Ministry", full: "Children Ministry (Sunday School)", image: children, intro: "Teaching children to know and love Jesus from an early age.", details: "Through Bible stories, songs and caring teachers, our Sunday School helps children build a strong foundation of faith in a safe environment." },
  { id: "lcc", name: "LCC", full: "LCC", image: choir, intro: "Serving the church through fellowship and ministry.", details: "Full details about the LCC ministry will be provided by the church. This introduction is temporary and will be replaced." },
];

// Example events only — replace with confirmed dates before launch. Set `example: false` for real events.
export type ChurchEvent = { title: string; date: string; time: string; location?: string; image: string; description: string; status?: string; example: boolean };

export const events: ChurchEvent[] = [
  { title: "Family Fellowship Sunday", date: "Date to be announced", time: "After Sunday Worship", image: community, description: "A time for families to share a meal and fellowship together after worship.", status: "Example event", example: true },
  { title: "Youth Worship Night", date: "Date to be announced", time: "Time to be announced", image: youth, description: "An evening of praise, prayer and teaching led by the youth ministry.", status: "Example event", example: true },
  { title: "Choir Thanksgiving Service", date: "Date to be announced", time: "Time to be announced", image: choir, description: "A special service of thanksgiving through music and song.", status: "Example event", example: true },
];

export type Project = { title: string; description: string; image: string; status: string; details: string };

// Add the swimming pool project here only once the church confirms it is active.
export const projects: Project[] = [
  { title: "Church Development Project", description: "Expanding our facilities to better serve worship, ministries and the wider community.", image: project, status: "Details to be confirmed", details: "Information on scope, timelines and how members can support this project will be shared by church leadership. Giving options will be added in a future update." },
];

export const gallery = [
  { src: hero, caption: "Sunday worship" },
  { src: choir, caption: "The church choir" },
  { src: community, caption: "Fellowship after service" },
  { src: children, caption: "Sunday School" },
  { src: youth, caption: "Youth worship" },
  { src: guild, caption: "Woman's Guild in prayer" },
  { src: men, caption: "Men's Bible study" },
  { src: project, caption: "Building for the future" },
];

export const history = {
  mission: "Mission statement to be provided by the church.",
  vision: "Vision statement to be provided by the church.",
  milestones: [
    { label: "Founding", text: "The founding story of the church will be shared here." },
    { label: "Growth", text: "Key milestones in the life of the congregation will be added." },
    { label: "Today", text: "A growing family of faith serving our community." },
  ],
  reverendMessage: "A welcome message from our Reverend will appear here once provided by the church.",
};
