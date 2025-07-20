// components/Footer.jsx
import { Separator } from "@/components/ui/separator";
import { Facebook, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#f8f4ee] dark:bg-[#2a2524] border-t dark:border-gray-800 text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo + Description */}
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              NextScholars
            </h2>
            <p className="mt-2 text-sm">
              Your gateway to global scholarships. Find, apply, and succeed —
              all in one place.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-medium text-foreground mb-2">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/scholarships" className="hover:text-foreground">
                  Scholarships
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground">About</Link>
              </li>
              <li>
                <Link className="hover:text-foreground">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="font-medium text-foreground mb-2">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="hover:text-foreground">FAQ</Link>
              </li>
              <li>
                <Link className="hover:text-foreground">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground">Privacy Policy</Link>
              </li>
              <li>
                <Link className="hover:text-foreground">Help Center</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Links */}
          <div>
            <h3 className="font-medium text-foreground mb-2">Connect</h3>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="hover:text-foreground">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-foreground">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-foreground">
                <Facebook size={20} />
              </a>
              <a
                href="mailto:info@nextscholars.com"
                className="hover:text-foreground"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} NextScholars. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">Crafted with ❤️ by NextScholars</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
