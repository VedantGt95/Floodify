Problem Statement Given:- Shelter Locator
List/Map of nearby shelters or hospitals during heavy rain.

Floodify
Problem Statement
Flooding is a major problem during the monsoon season in many regions. People often struggle to locate safe shelters, nearby hospitals, or identify flooded areas in real-time. Floodify is a web-based platform designed to enhance flood reporting, monitoring, and transparency. It allows users to report flooded areas and view live flood markers, while administrators can verify, manage, and remove reports and mark essential locations such as hospitals and shelters. Additionally, users can see current weather updates on the homepage using the Open-Meteo API, helping them make informed decisions during floods.
________________________________________
Tech Stack
•	Frontend: React.js, Tailwind CSS, React Router DOM, React Hook Form, Axios, Leaflet.js
•	Backend: Spring Boot, Spring Web, Spring Data JPA
•	Database: MySQL (tables auto-generated via JPA)
•	API: Open-Meteo API for weather data
Frontend Dependencies (Exact Versions)
npm install react@18.2.0 react-dom@18.2.0
npm install react-leaflet@4.2.1 leaflet@1.9.4
npm install react-router-dom@7.9.1
________________________________________
Team Members
•	Arnav Jadhav
•	Vedant Gharat
________________________________________
Setup Instructions
Backend (Spring Boot)
1.	Clone the repository:
2.	git clone https://github.com/VedantGt95/Floodify.git
3.	cd floodify_backend
4.	Open the project in IntelliJ IDEA
5.	Configure MySQL database in application.properties or application.yml
6.	Run the application:
7.	./mvnw spring-boot:run
Tables are automatically created via Spring Data JPA
Frontend (React) – made using CRA
1.	Navigate to the frontend folder.	2. Install dependencies:
3.	npm install
4.	Run the development server:
5.	npm start
6.	Access the app at http://localhost:3000
________________________________________
Features
User Features
•	Register and log in
•	Location prompt after login
•	Homepage with current weather information using Open-Meteo API
•	View nearby hospitals and shelters on a map (read-only)
•	Mark flooded regions on the map
•	Fetch and view all flooded regions submitted by users
Admin Features
•	Mark hospitals and shelters on the map
•	Verify, manage, or delete user-submitted flood reports
________________________________________
Screenshots of the projects were told to place it in PPT
________________________________________
Future Enhancements
•	Real-time notifications for newly reported floods
•	Mobile-friendly UI
•	Advanced flood prediction using historical data
•	Integration with more weather APIs for enhanced forecasting

