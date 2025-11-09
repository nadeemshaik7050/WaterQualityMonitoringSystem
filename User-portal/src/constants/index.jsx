

import { FaXTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";

export const LINKS = [
  { text: "Home", targetId: "home" },
  { text: "Projects", targetId: "projects" },
  { text: "About", targetId: "about" },
  { text: "Skills", targetId: "skills" },
  { text: "Contact", targetId: "contact" },
];

export const ABOUT = {
  header: "About Me",
  content:
    "Hello! I'm an experienced React developer with a passion for creating dynamic, responsive, and user-friendly web applications. My expertise lies in managing state, implementing modern design patterns, and utilizing advanced libraries to enhance application performance. With a solid foundation in HTML, CSS, and JavaScript, I have built and maintained scalable web applications using React and Next.js.",
};



export const CONTACT = [
  { key: "address", value: "Address: 123 Main Street, Paris, France, 345678" },
  { key: "phone", value: "Phone: 123-456-7890" },
  { key: "email", value: "Email: contact@restaurant.com" },
];

export const SOCIAL_MEDIA_LINKS = [
  {
    href: "https://x.com/",
    icon: <FaFacebook fontSize={30} className="hover:opacity-80" />,
  },

  {
    href: "https://x.com/",
    icon: <FaInstagram fontSize={30} className="hover:opacity-80" />,
  },
  {
    href: "https://x.com/",
    icon: <FaXTwitter fontSize={30} className="hover:opacity-80" />,
  },
];
