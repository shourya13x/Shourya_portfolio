import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/shourya13x',
      icon: '🐙'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/shouryagupta13',
      icon: '💼'
    },
    {
      name: 'Twitter',
      url: 'https://x.com/Shourya_gupta13',
      icon: '🐦'
    },
    {
      name: 'Email',
      url: 'mailto:shourya@example.com',
      icon: '✉️'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="py-12 px-4 border-t border-primary/20 bg-dark-300/50 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-primary mb-3 font-mono">
              Shourya Gupta
            </h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Full-stack developer passionate about creating innovative solutions 
              and building scalable applications.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="text-2xl hover:text-primary transition-colors duration-200"
                  title={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-md font-semibold text-white mb-4 font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors duration-200 font-mono"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary/10 mb-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-400 font-mono">
            © {currentYear} Shourya Gupta. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer; 