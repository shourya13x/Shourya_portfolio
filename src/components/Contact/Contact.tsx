import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { useVisibility, useForm } from '@/hooks';
import { validateEmail, cn } from '@/utils';
import { EmailService } from '@/services';
import type { ContactFormData, FormErrors } from '@/types';

const Contact: React.FC = () => {
  const { isVisible, elementRef } = useVisibility(0.2);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const validateForm = (values: ContactFormData): FormErrors => {
    const errors: FormErrors = {};
    
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    } else if (values.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(values.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!values.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!values.message.trim()) {
      errors.message = 'Message is required';
    } else if (values.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
  };
  
  const {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    handleSubmit,
    reset
  } = useForm<ContactFormData>(
    {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validateForm
  );
  
  const onSubmit = async (formData: ContactFormData) => {
    setSubmitStatus('loading');
    
    try {
      // Try EmailJS first
      const emailResponse = await EmailService.sendContactForm(formData);
      
      if (emailResponse.success) {
        setSubmitStatus('success');
        reset();
        
        // Reset success status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        // If EmailJS fails, try API endpoint
        const apiResponse = await EmailService.sendViaAPI(formData);
        
        if (apiResponse.success) {
          setSubmitStatus('success');
          reset();
          setTimeout(() => setSubmitStatus('idle'), 5000);
        } else {
          throw new Error(apiResponse.error || 'Failed to send message');
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      
      // Reset error status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };
  
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'shouryaofficial1303@gmail.com',
      href: 'mailto:shouryaofficial1303@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91-8272070100',
      href: 'tel:+918272070100'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Chandigarh University, Mohali',
      href: 'https://maps.google.com/?q=Chandigarh+University,+Mohali'
    }
  ];
  
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/shourya13x',
      icon: Github,
      color: 'hover:text-white'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/shouryagupta13',
      icon: Linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Twitter',
      url: 'https://x.com/Shourya_gupta13',
      icon: Twitter,
      color: 'hover:text-blue-400'
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  return (
    <section id="contact" ref={elementRef} className="py-20 lg:py-32 relative">
              <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              <span className="text-primary">04.</span>{' '}
              <span className="text-white">Get In Touch</span>
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              I'm always interested in hearing about new opportunities and interesting projects. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                        <info.icon size={20} />
                      </div>
                      <div>
                        <div className="text-sm text-white/60 mb-1">
                          {info.label}
                        </div>
                        <a
                          href={info.href}
                          className="text-white hover:text-primary transition-colors duration-300"
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {info.value}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  Connect With Me
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'p-3 rounded-lg glass hover:glass-strong transition-all duration-300',
                        'text-white/70 hover:scale-110',
                        social.color
                      )}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                      aria-label={`Visit my ${social.name} profile`}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
              
              {/* Response Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 }}
                className="p-6 glass rounded-lg"
              >
                <h4 className="text-lg font-semibold text-white mb-2">
                  Response Time
                </h4>
                <p className="text-white/80">
                  I typically respond to emails within 24-48 hours during business days. 
                  For urgent inquiries, please include "URGENT" in the subject line.
                </p>
              </motion.div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                Send Me a Message
              </h3>
              
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(onSubmit);
                }}
                className="space-y-6"
              >
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={values.name}
                    onChange={(e) => setValue('name', e.target.value)}
                    onBlur={() => setFieldTouched('name')}
                    className={cn(
                      'w-full px-4 py-3 bg-white/5 border rounded-lg transition-all duration-300',
                      'text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-300',
                      errors.name && touched.name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-white/20 focus:border-primary focus:ring-primary'
                    )}
                    placeholder="Enter your full name"
                  />
                  {errors.name && touched.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>
                
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={values.email}
                    onChange={(e) => setValue('email', e.target.value)}
                    onBlur={() => setFieldTouched('email')}
                    className={cn(
                      'w-full px-4 py-3 bg-white/5 border rounded-lg transition-all duration-300',
                      'text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-300',
                      errors.email && touched.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-white/20 focus:border-primary focus:ring-primary'
                    )}
                    placeholder="Enter your email address"
                  />
                  {errors.email && touched.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
                
                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={values.subject}
                    onChange={(e) => setValue('subject', e.target.value)}
                    onBlur={() => setFieldTouched('subject')}
                    className={cn(
                      'w-full px-4 py-3 bg-white/5 border rounded-lg transition-all duration-300',
                      'text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-300',
                      errors.subject && touched.subject
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-white/20 focus:border-primary focus:ring-primary'
                    )}
                    placeholder="What's this about?"
                  />
                  {errors.subject && touched.subject && (
                    <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
                  )}
                </div>
                
                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={values.message}
                    onChange={(e) => setValue('message', e.target.value)}
                    onBlur={() => setFieldTouched('message')}
                    className={cn(
                      'w-full px-4 py-3 bg-white/5 border rounded-lg transition-all duration-300 resize-none',
                      'text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-300',
                      errors.message && touched.message
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-white/20 focus:border-primary focus:ring-primary'
                    )}
                    placeholder="Tell me about your project or just say hello!"
                  />
                  {errors.message && touched.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>
                
                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'loading'}
                  className={cn(
                    'w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300',
                    'flex items-center justify-center gap-2',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-300',
                    submitStatus === 'success'
                      ? 'bg-green-600 text-white focus:ring-green-500'
                      : submitStatus === 'error'
                      ? 'bg-red-600 text-white focus:ring-red-500'
                      : 'btn-primary focus:ring-primary'
                  )}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {submitStatus === 'loading' && (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  )}
                  {submitStatus === 'success' && <CheckCircle size={20} />}
                  {submitStatus === 'error' && <AlertCircle size={20} />}
                  {submitStatus === 'idle' && <Send size={20} />}
                  
                  <span>
                    {submitStatus === 'loading' && 'Sending...'}
                    {submitStatus === 'success' && 'Message Sent!'}
                    {submitStatus === 'error' && 'Failed to Send'}
                    {submitStatus === 'idle' && 'Send Message'}
                  </span>
                </motion.button>
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400"
                  >
                    Thank you for your message! I'll get back to you as soon as possible.
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
                  >
                    <div className="space-y-3">
                      <p>Sorry, there was an error sending your message through the form.</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Alternative:</span>
                        <a
                          href={EmailService.createMailtoLink(values)}
                          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                        >
                          <ExternalLink size={16} />
                          Send via email client
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
};

export default Contact;