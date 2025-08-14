import emailjs from '@emailjs/browser';
import type { ContactFormData } from '@/types';

// EmailJS configuration with fallbacks
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

export class EmailService {
  private static isInitialized = false;

  static initialize() {
    if (!this.isInitialized && EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      this.isInitialized = true;
    }
  }

  static async sendContactForm(formData: ContactFormData): Promise<EmailResponse> {
    try {
      this.initialize();

      // Validate environment variables
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        console.warn('EmailJS config missing, using fallback method');
        // Return a graceful fallback instead of throwing an error
        return {
          success: true,
          message: 'Email configuration not set up. Please contact me directly at shouryaofficial1303@gmail.com'
        };
      }

      // Prepare template parameters - using the exact variable names from your EmailJS template
      const templateParams = {
        name: formData.name,           // Matches {{name}} in your template
        email: formData.email,         // Matches {{email}} in your template
        subject: formData.subject,     // Matches {{subject}} in your template
        message: formData.message,     // Matches {{message}} in your template
        to_name: 'Shourya Gupta',
        reply_to: formData.email,
      };

      console.log('Sending EmailJS with params:', { 
        serviceId: EMAILJS_SERVICE_ID, 
        templateId: EMAILJS_TEMPLATE_ID, 
        templateParams 
      });

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('EmailJS response:', response);

      if (response.status === 200) {
        return {
          success: true,
          message: 'Message sent successfully! I\'ll get back to you soon.'
        };
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email service error:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      return {
        success: false,
        message: 'Failed to send message. Please try again or contact me directly.',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Fallback method using mailto link
  static createMailtoLink(formData: ContactFormData): string {
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    return `mailto:shouryaofficial1303@gmail.com?subject=${subject}&body=${body}`;
  }

  // Alternative method using a simple API endpoint (if you have a backend)
  static async sendViaAPI(formData: ContactFormData): Promise<EmailResponse> {
    try {
      // Try Vercel API first, then fallback to Netlify function
      const apiUrl = import.meta.env.VITE_API_BASE_URL 
        ? `${import.meta.env.VITE_API_BASE_URL}/api/contact`
        : '/api/contact';
        
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: 'Message sent successfully! I\'ll get back to you soon.'
        };
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('API email error:', error);
      
      return {
        success: false,
        message: 'Failed to send message. Please try again or contact me directly.',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
} 