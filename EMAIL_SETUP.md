# Email Setup Guide

This guide will help you set up the "Get in Touch" functionality to make it fully functional.

## Option 1: EmailJS (Recommended)

EmailJS allows you to send emails directly from the frontend without a backend server.

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Set Up Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down your **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```html
Subject: New Contact Form Message from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Note down your **Template ID**

### Step 4: Get Public Key
1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

### Step 5: Configure Environment Variables
Create a `.env` file in your project root with:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Replace the values with your actual EmailJS credentials.

## Option 2: Backend API (Advanced)

If you prefer to use a backend server, you can create a simple API endpoint.

### Step 1: Create Backend Server
Create a simple Express.js server or use any backend framework of your choice.

### Step 2: Create Contact Endpoint
```javascript
// Example Express.js endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Send email using nodemailer or any email service
    // Example with nodemailer:
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'shouryaofficial1303@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `
    });
    
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});
```

### Step 3: Update Environment Variables
```env
VITE_API_BASE_URL=http://localhost:3000
```

## Option 3: Netlify Functions (Deployment Ready)

If you're deploying to Netlify, you can use Netlify Functions.

### Step 1: Create Netlify Function
Create `netlify/functions/contact.js`:

```javascript
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);
    
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'shouryaofficial1303@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Email sent successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Failed to send email' })
    };
  }
};
```

### Step 2: Install Dependencies
```bash
npm install nodemailer
```

### Step 3: Set Environment Variables in Netlify
In your Netlify dashboard, go to Site Settings → Environment Variables and add:
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail app password

## Testing

1. Start your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out the form and submit
4. Check your email to confirm receipt

## Troubleshooting

### EmailJS Issues
- Verify all environment variables are set correctly
- Check that your EmailJS service is properly configured
- Ensure your email template variables match the code

### CORS Issues (Backend API)
- Make sure your backend allows requests from your frontend domain
- Check that the API endpoint is accessible

### Gmail Authentication
- Use App Passwords instead of your regular password
- Enable 2-factor authentication on your Gmail account
- Generate an app password specifically for this application

## Security Considerations

1. **Environment Variables**: Never commit your `.env` file to version control
2. **Rate Limiting**: Consider implementing rate limiting on your backend
3. **Validation**: Always validate form data on both frontend and backend
4. **Spam Protection**: Consider adding CAPTCHA or other spam protection

## Fallback Options

The contact form includes several fallback options:
1. **Primary**: EmailJS service
2. **Secondary**: Backend API endpoint
3. **Tertiary**: Direct mailto link that opens the user's email client

This ensures that users can always reach you, even if one method fails. 