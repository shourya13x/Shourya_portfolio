# Portfolio Contact Form Server

This is a local Express.js server that handles contact form submissions for your portfolio.

## Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Create environment file:**
   Create a `.env` file in the server directory:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=3001
   NODE_ENV=development
   ```

3. **Configure Gmail:**
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password (not your regular password)
   - Use the App Password in the `EMAIL_PASS` environment variable

4. **Start the server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### POST /api/contact
Handles contact form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully! I'll get back to you soon."
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Features

- ✅ CORS support for frontend integration
- ✅ Input validation
- ✅ Rate limiting (5 requests per 15 minutes per IP)
- ✅ Error handling
- ✅ Email sending via Nodemailer
- ✅ Health check endpoint

## Security

- Rate limiting prevents spam
- Input validation on all fields
- CORS configured for specific origins
- Environment variables for sensitive data

## Troubleshooting

### Gmail Authentication Issues
1. Make sure 2FA is enabled on your Gmail account
2. Generate a new App Password specifically for this application
3. Use the App Password, not your regular password

### CORS Issues
If you're getting CORS errors, update the `origin` array in `server.js` to include your frontend URL.

### Port Already in Use
Change the `PORT` environment variable or kill the process using the port.

## Production Deployment

For production, consider:
1. Using a proper email service (SendGrid, AWS SES, etc.)
2. Adding more robust rate limiting
3. Implementing CAPTCHA
4. Using HTTPS
5. Setting up proper logging 