# Stripe Meta PayTrack

A lightweight service that listens to Stripe payment webhooks and forwards successful purchase events to Meta's Conversion API.

## Features

- 🔄 Stripe webhook integration
- 📊 Meta Pixel conversion tracking
- 🔒 Built-in security features:
  - Rate limiting
  - CORS protection
  - Security headers (Helmet)
  - Request validation
- ⚡ TypeScript support
- 🛡️ Error handling middleware
- 📝 API response standardization

## Prerequisites

- Node.js (v14 or higher)
- Stripe account
- Meta Business account
- Meta Pixel ID

## Installation

```bash
# Clone the repository
git clone https://github.com/fistix/stripe-meta-paytrack.git

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

## Environment Variables

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
META_ACCESS_TOKEN=your_meta_access_token
META_PIXEL_ID=your_meta_pixel_id
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

## Usage

```bash
# Development
npm run dev

```

## API Endpoints

- `POST /api/v1/stripe/webhook` - Stripe webhook endpoint
- `POST /api/v1/meta/pixel/conversion/event/purchased` - Meta conversion event endpoint

## Security

The application includes:
- Rate limiting (100 requests per 15 minutes per IP)
- CORS protection
- Security headers
- Request validation
- Error handling

## License

ISC

## Author

Fahad Rasool
