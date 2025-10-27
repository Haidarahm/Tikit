import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import FloatingInput from "./ui/FloatingInput";
import SVGComponent from "../assets/logo";
import { useTheme } from "../store/ThemeContext.jsx";

const Footer = ({ className }) => {
  const { theme } = useTheme();
  const social = [
    { href: "https://facebook.com", label: "Facebook", Icon: FaFacebookF },
    { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
    { href: "https://linkedin.com", label: "LinkedIn", Icon: FaLinkedinIn },
    { href: "https://x.com", label: "X (Twitter)", Icon: FaXTwitter },
  ];
  return (
    <footer
      data-scroll-section
      className={`w-full  px-[15px]  md:px-[80px]  flex flex-col text-[var(--foreground)] font-hero-light ${className}`}
    >
      <div className="top-section  w-full mx-auto border-b-[1px] border-[#5D5D5D] py-8 flex items-center justify-between  md:gap-6">
        <div className="logo w-[70px] md:w-[220px] h-[30px] md:h-[80px]">
          <SVGComponent
            color={theme === "dark" ? "#FFFFFF" : "#363737"}
            logoJumpColor={theme === "dark" ? "#FFFFFF" : "#52C3C5"}
            className="p-1 md:p-2 h-full overflow-visible"
          />
        </div>
        <nav aria-label="social" className="flex items-center gap-3">
          {social.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className="group inline-flex
               items-center
                justify-center
                 w-10 h-10 rounded-full
                  border border-[var(--base)]
                 bg-white text-[var(--base)]
                 hover:bg-[var(--base)]
                 hover:text-white 
                 transition-colors duration-200"
            >
              <Icon
                size={18}
                className="transition-transform duration-200 group-hover:scale-110"
              />
            </a>
          ))}
        </nav>
      </div>
      <div className="bottom-section justify-between w-full pt-[30px] md:pt-[80px] pb-[20px] md:pb-[60px]  flex flex-1 flex-col md:flex-row gap-8 md:gap-0">
        <div className="left-section gap-[20px] flex flex-col justify-around">
          <p className="text-[15px] md:text-start text-center md:text-[24px] text-gray-500 leading-[30px]">
            If you would like to work with us or just want to get
            <br className="hidden md:block" /> in touch, we’d love to hear from
            you!
          </p>
          <h1 className="text-[24px] md:text-[48px] text-center  md:text-start">
            <span className="font-bold">Contact –</span> for Client or <br />
            Influencer throughout
          </h1>
          <div className="location  flex font-light justify-around text-gray-500 md:gap-[40px] text-[20px]">
            {" "}
            <p>Dubai- UAE</p> <p>London - UK</p>
          </div>
          <div className="copyright hidden md:block text-[16px] text-gray-500">
            © Copyright 2025 | Alrights reserved by Tikit
          </div>
        </div>
        <div className="right-section md:mt-[30px] md:w-[30%]  flex flex-col">
          <div className="items w-full justify-between flex font-light ">
            <ul className="items-1 md:text-start text-center flex flex-col gap-4">
              <li>About Us</li>
              <li>Services</li>
              <li>Work</li>
              <li>Contact</li>
            </ul>
            <ul className="items-2 md:text-start text-center flex flex-col gap-4">
              <li>Influencer Marketing</li>
              <li>Social Media</li>
              <li>Branding</li>
              <li>Production</li>
            </ul>
          </div>
          <div className="subscription w-full flex items-end">
            <FloatingInput
              id="contact-standard"
              label="Email"
              containerClassName="mt-8 flex-1"
            />
            <button
              className="bg-[var(--secondary)] 
            hover:text-[var(--secondary)]
            hover:bg-transparent
            border-[var(--secondary)]
            text-[var(--background)]
            ml-4 transition 
              cursor-pointer border   px-2 text-[14px] h-[30px] rounded-full"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="terms pb-[40px] flex justify-center items-center">
        <ul className="flex gap-2  md:gap-4 text-[12px] md:text-[16px] text-gray-500">
          <li>Privacy Policy</li>
          <div className="point">•</div>
          <li>About Us</li>
          <div className="point">•</div>
          <li>Cookie Settings</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
