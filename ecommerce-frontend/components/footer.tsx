"use client";

import Link from "next/link";
import { useCombinedDataContext } from "@/providers/combined-data-provider";

const footerSections = [
  {
    title: "SERVICES",
    links: [
      { label: "Store locator", href: "/store-locator" },
      { label: "Book an event", href: "#" },
      { label: "Book a class", href: "#" },
      // { label: "Returns", href: "#" },
      { label: "Size guide", href: "#" },
    ],
  },
  {
    title: "Fragrances",
    links: [
      { label: "All fragrances", href: "/collections" },
      { label: "For women", href: "#" },
      { label: "For men", href: "#" },
      { label: "Unisex", href: "#" },
    ],
  },
  // {
  //   title: "ACCOUNT & LEGAL",
  //   links: [
  //     { label: "My account", href: "#" },
  //     { label: "Order tracking", href: "#" },
  //     { label: "Privacy policy", href: "#" },
  //     { label: "Terms of service", href: "#" },
  //     { label: "Cookie policy", href: "#" },
  //     { label: "Legal notice", href: "#" }
  //   ],
  // },
  {
    title: "COMPANY",
    links: [
      { label: "About us", href: "/about" },
      { label: "Become a distributor", href: "#" },
      { label: "Contact us", href: "/contact" },
      { label: "Store locator", href: "/store-locator" },
    ],
  },
];
const Footer = () => {
  const { settings } = useCombinedDataContext();
  const siteBranding = settings?.siteBranding;

  return (
    <footer className="bg-muted py-16 pb-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8 mb-12">
          {footerSections.map((section, index) => (
            <div
              key={section.title}
              className={`animate-fade-in-up mx-auto animate-delay-${
                index * 200
              }`}
            >
              <h4 className="font-bold text-sm text-center tracking-wide mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label} className="text-center">
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 {siteBranding?.siteName || "Perfume House"}. All rights reserved. | Privacy Policy |
            Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
