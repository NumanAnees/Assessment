# Calo Assessment

## Getting Started

These instructions will guide you through setting up the app on your local machine.

### Prerequisites

Make sure you have the following installed on your system:

- **npm**  
  To install npm globally, use the following command:
  ```sh
  npm install -g npm
  ```
  You can refer to the official [npm documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for more details.

### Installation

1. **Clone the repository**  
   Run the following command to clone the repository:

   ```sh
   git clone https://github.com/NumanAnees/Calo-Assessment.git
   ```

2. **Navigate to the project directory**  
   Move into the project folder:

   ```sh
   cd Calo-Assessment
   ```

3. **Set up both the backend and frontend applications**

   Navigate to the backend directory:

   ```sh
   cd Backend
   ```

   Then, open a new terminal and navigate to the frontend directory:

   ```sh
   cd Frontend
   ```

4. **Install the necessary NPM packages**  
   In both the backend and frontend directories, install the required packages:

   ```sh
   npm install
   ```

5. **Add `.env` file in both Frontend and Backend and copy content from `.env.example`**
   Create `.env` file in both directories and copy content from `.env.example` and give your values to the environment variables.

6. **Start the applications**
   - **For the Frontend**  
     In the `Frontend` directory, run:
     ```sh
     npm run dev
     ```
   - **For the Backend**  
     In the `Backend` directory, run:
     ```sh
     npm run start
     ```

### Tech Stack

- **Frontend**

  - Next.js
  - TailwindCSS
  - Schadcn
  - Tanstack/table
  - Jest

- **Backend**
  - Nest.js
  - BullMQ
  - Cron jobs using `@nestjs/schedule`

### Directory Structure

The project directory is organized as follows:

```
├── calo
│   ├── Backend
│   │   ├── src
│   │   │   ├── jobs
|   |   |   |   ├── jobs.controller.spec.ts
|   |   |   |   ├── jobs.controller.ts
|   |   |   |   ├── jobs.interface.ts
|   |   |   |   ├── jobs.module.ts
|   |   |   |   ├── jobs.processor.ts
|   |   |   |   ├── jobs.service.spec.ts
|   |   |   |   ├── jobs.service.ts
│   │   │   ├── app.controller.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app.service.ts
│   │   │   └── main.ts
│   ├── Frontend
│   │   ├── src
│   │   │   ├── assets
|   |   |   ├── __mocks__
|   |   |   ├── __tests__
│   │   │   ├── app
│   │   │   ├── actions
│   │   │   ├── components
│   │   │   ├── lib
|   |   |   ├── hooks
│   │   │   ├── next-env.d.ts
│   │   │   └── types.d.ts
└── README.md
```

### Time Report

- **Understanding the requirements** (1 hour):
  Worked on understanding the requirements and created a plan to implement the features.
- **API Implementation** (1.5 hours):
  Created the following API endpoints.

  - GET `/jobs`
  - POST `/jobs`
  - GET `/jobs/:id`
  - GET `/jobs/pending`

- **BullMQ for handling background jobs** (4 hours):
  Learned how to set up BullMQ in a NestJS app, used it to handle background jobs, and added bull-board to monitor the jobs in real-time.
- **User Interface development** (2 hours):
  Created a simple UI table to display jobs, using TailwindCSS and Shadcn.
- **API integration** (1 hour):
  Integrated the frontend with the backend, ensuring seamless communication between the two.
- **Optimizing the app using efficient polling and concurrency\*** (2 hours):
  Implemented polling and attempted to increase the number of active jobs from 1 to 5 using concurrency in BullMQ. While the concurrency worked as expected, it led to a higher failure rate, so I decided to revert to the original configuration.
- **Testing** (2 hours):
  Wrote some unit tests for both the frontend and backend to verify the functionality.
- **Documentation and final Review** (0.5 hour):
  Wrote documentation and thoroughly tested the functionality of both the frontend and backend to ensure all features worked as expected.

## Video:
