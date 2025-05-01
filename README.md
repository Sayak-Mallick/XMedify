# Medify

Medify is a modern healthcare web application designed to connect patients with medical centers, hospitals, and doctors. It provides a seamless experience for users to search for healthcare facilities, book appointments, and access medical services online.

## Features

- **Search Functionality**: Users can search for hospitals, doctors, and laboratories by state, city, or name.
- **Appointment Booking**: Book appointments with minimal wait times and verified doctor details.
- **Specialization Finder**: Explore medical centers by specialization such as cardiology, dentistry, and more.
- **Responsive Design**: Fully responsive UI for a seamless experience across devices.
- **User-Friendly Navigation**: Intuitive navigation with a clean and modern interface.
- **Context Management**: State management using React Context API for bookings and search results.
- **Integration with APIs**: Fetch real-time data for cities and hospitals using external APIs.

## Project Structure

Scripts
npm run dev: Start the development server.
npm run build: Build the project for production.
npm run preview: Preview the production build.
npm run lint: Run ESLint to check for code quality.
Technologies Used
Frontend: React, React Router, Material-UI, Swiper.js
Styling: CSS Modules, Responsive Design
Build Tool: Vite
State Management: React Context API
API Integration: Axios
Components Overview
Key Components
Navbar: Navigation bar with links to different sections.
SearchBar: Allows users to search for hospitals and doctors.
ResultCard: Displays search results for hospitals and doctors.
Slots: Displays available appointment slots for booking.
Specialization: Displays medical specializations with icons.
PatientCaring: Highlights patient care features.
FAQ: Frequently Asked Questions section.
MainFooter: Footer with links and social media icons.
Contexts
BookingsContext: Manages user bookings.
FoundHospitalsContext: Manages search results for hospitals.
API Endpoints
Cities API: Fetches cities for a given state.
Hospitals API: Fetches hospitals based on state and city.
Deployment
To deploy the application, build the project using:

The production-ready files will be available in the dist folder. You can deploy these files to any static hosting service like Netlify, Vercel, or AWS S3.

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Commit your changes and push them to your fork.
Submit a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any inquiries or support, please contact:

Email: support@medify.com
Website: Medify
