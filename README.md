# SIS Props Rental

A modern, minimalist web application for renting film and TV props. Built with Next.js, MongoDB, and featuring automatic background removal for product images.

## Features

- Minimalist monochrome design
- Automatic background removal for product images using rembg
- CSV upload functionality for bulk product addition
- MongoDB integration for data storage
- Responsive product grid layout
- Weekly pricing calculation

## Tech Stack

- Next.js 14
- TypeScript
- MongoDB
- Tailwind CSS
- rembg for image processing

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up MongoDB connection in `.env.local`
4. Install rembg: `pip install rembg`
5. Run the development server: `npm run dev`

## Environment Variables

Create a `.env.local` file with:

```env
MONGODB_URI=your_mongodb_connection_string
```

## CSV Upload Format

The CSV file should include the following columns:
- name (required)
- price (required, numeric)
- image_url (required)
- category (required)
- subcategory (required)
- quantity (required, numeric)
- dimensions (required)
