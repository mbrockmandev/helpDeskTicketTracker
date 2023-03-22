
# Help Desk Ticket Tracker

Help Desk Ticket Tracker is a web application that allows users to create help desk tickets and track their progress, and administrators to manage and resolve them. The application is built using MongoDB, Express, React, and Node (MERN stack).

## Features

- Users can create new tickets and view their existing tickets
- Administrators can view all tickets, update their status, and add notes for communication with users
- Tickets can be filtered by status and assigned user
- Geofencing services (coming soon) will allow administrators to track the location of assigned users and ensure timely resolution of tickets
- Offline sync (coming soon) will allow users and administrators to continue working even without an internet connection
- Pictures can be added to tickets (coming soon) to verify work was completed


## Getting Started

To run the application locally, you will need to have Node.js and MongoDB installed on your machine. Clone this repository, navigate to the root directory, and run the following commands:

    npm install
    npm run dev

The application will start running on http://localhost:3000.

## Usage
### Users
To create a new ticket, go to the "New Ticket" page and fill out the form with the required information. Once the ticket is created, you can view its details and track its progress on the "My Tickets" page.

### Administrators
To view all tickets, go to the "All Tickets" page. From there, you can filter the tickets by status and assigned user. To update the status of a ticket or add notes, click on the ticket to view its details and use the corresponding buttons.

### Contributing
We welcome contributions to the Help Desk Ticket Tracker project. To get started, fork the repository and create a new branch for your feature or bug fix. Once your changes are ready, submit a pull request for review.

### License
Help Desk Ticket Tracker is open source software licensed under the MIT License.
