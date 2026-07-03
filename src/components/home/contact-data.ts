export const contactAddress =
  "2nd floor, R.S. Tower, New Kalimati Rd, Hirasingh Bagan, Sakchi, Jamshedpur, Jharkhand 831001, India";

export const contactMapsQuery = encodeURIComponent(`Agamya Eduventure, ${contactAddress}`);
export const contactMapsLink = `https://www.google.com/maps/search/?api=1&query=${contactMapsQuery}`;

export const contactPhone = "7004704078";
export const contactPhoneHref = "tel:7004704078";
export const contactWhatsAppHref = "https://wa.me/917004704078";

export const contactProgramsText =
  "Technical Modules, Career Support, Projects & Certifications, and Corporate & Advanced Courses.";

export const heroHighlights = [
  {
    title: "Quick Response",
    detail: "Within 24 hrs",
    tone: "teal",
  },
  {
    title: "Expert Guidance",
    detail: "Programs & Career",
    tone: "orange",
  },
  {
    title: "Multiple Support",
    detail: "Chat • Call • Email",
    tone: "teal",
  },
  {
    title: "Trusted by",
    detail: "1000+ Students",
    tone: "blue",
  },
] as const;
