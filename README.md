This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Supabase Setup Guide

This guide will walk you through setting up Supabase for storing and retrieving chart data in a Next.js project.

## Prerequisites

- Ensure you have **Node.js** installed on your system.
- You should already have a **Supabase account** and be logged in.
- A Next.js project set up locally.

---

## 1. Create a Supabase Project

1. Log in to your Supabase account and navigate to the dashboard.
2. Click on **New Project** to create a new project.
3. Enter a name for your project and select the region closest to you.
4. Wait for the project to initialize and load the dashboard.

---

## 2. Set Up a Database Table

1. In the **Supabase dashboard**, go to the **Database** section.
2. Open the **Table Editor** and click on **New Table**.
3. Name the table `chat_data`.
4. Add the following columns:
   - `id`: Primary key (auto-generated, UUID).
   - `type`: A text field to define the type of chart (e.g., `line_and_bar_chat`, `pie_chat`).
   - `data`: A JSONB field to store the chart data as JSON.

Follow exact structure like the given screenshot:
![Screenshot 2024-10-12 221211](https://github.com/user-attachments/assets/cd521b1c-7233-49bf-8e3d-7c70fd7cecf0)

Here the json obj of -

**line_and_bar_chat_data**:
```bash
[
  {
    "name": "Page A",
    "uv": "2000",
    "pv": "1000",
    "amt": "2000"
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page B",
    "uv": 2000,
    "pv": 4000,
    "amt": 2000
  }
]
```

**pie_chat**:
```bash
[
  {
    "name": "Group A",
    "value": 400
  },
  {
    "name": "Group B",
    "value": 300
  },
  {
    "name": "Group C",
    "value": 300
  },
  {
    "name": "Group D",
    "value": 200
  }
]
```

5. Save the table.

Here’s a summary of the table schema:
| Column Name | Type   | Description                                      |
|-------------|--------|--------------------------------------------------|
| `id`        | UUID   | Primary key (auto-generated by Supabase)         |
| `type`      | TEXT   | Type of chart (e.g., `line_and_bar_chat`)       |
| `data`      | JSONB  | The JSON data for the chart                      |

---

## 3. Get Supabase API Keys

1. Navigate to the **Settings** section of your Supabase dashboard.
2. Click on the **API** tab.
3. Copy the **Project URL** and **Anon Key**. These will be used to connect your Next.js app to Supabase.

---

## 4. Install Supabase Client in Your Next.js Project

1. Open your terminal and navigate to your Next.js project directory.
2. Install the Supabase client package using the following command:

```bash
npm install @supabase/supabase-js
# or
yarn add @supabase/supabase-js
```

3. Create a file to initialize the Supabase client and configure it using your project URL and anon key.

---

## 5. Configure Environment Variables

1. In your Next.js project, create a **`.env.local`** file (if it doesn’t already exist).
2. Add the Supabase **Project URL** and **Anon Key** to this file. These values should not be hard-coded in your app.

Here's a example: 
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 6. Implement API Routes

1. Set up API routes in your Next.js project to handle **GET** and **PUT** requests for retrieving and updating chart data.
2. Use the API keys and database setup from Supabase to manage the data flow between the front end and the Supabase database.

---

## 7. Test Your API

1. Use a tool like **Postman** or **cURL** to test the endpoints you created.
2. You should be able to retrieve and update the chart data stored in Supabase via the API routes.

---

## 8. Optional: Configure SMTP for Auth (if using Supabase Auth)

1. Go to the **Authentication** tab in your Supabase project.
2. In **Settings**, configure your SMTP provider if you need to send authentication emails.
3. Provide your SMTP server credentials and enable **Custom SMTP** to avoid the rate limits imposed by the built-in email service.

---

## Notes

- Ensure your Supabase project is properly secured.
- Use **Row-Level Security (RLS)** in Supabase if you need finer control over database access.
- The **Project URL** and **Anon Key** should never be exposed publicly, especially in production environments.

---

This completes the Supabase setup for your Next.js project!



# API Documentation
# Supabase Chart Data API

This API allows clients to **retrieve** and **update** chart data stored in a Supabase database. It supports two types of charts:
- **Line and Bar Chart**
- **Pie Chart**

## Base URL

```
http://localhost:3000/api/data/
```

---

## Endpoints

### 1. Line and Bar Chart Data API

#### **GET /api/data/line_and_bar_chat**

- **Description**: Fetches the stored data for the line and bar chart from the Supabase table.
- **Response**:
  - **Success (200)**: Returns an array of objects representing the chart data.
  - **Error (500)**: Returns an error message if something goes wrong.

##### Example Response:

```json
[
  { "name": "Page A", "uv": 4000, "pv": 2400, "amt": 2400 },
  { "name": "Page B", "uv": 3000, "pv": 1398, "amt": 2210 },
  { "name": "Page C", "uv": 2000, "pv": 9800, "amt": 2290 },
  { "name": "Page D", "uv": 2780, "pv": 3908, "amt": 2000 }
]
```

#### **PUT /api/data/line_and_bar_chat**

- **Description**: Updates the stored data for the line and bar chart in the Supabase table.
- **Request Body**:
  - An array of objects representing the chart data to be updated.
  - **Content-Type**: `application/json`
  
##### Example Request:

```json
[
  { "name": "Page A", "uv": 4000, "pv": 2400, "amt": 2400 },
  { "name": "Page B", "uv": 3000, "pv": 1398, "amt": 2210 },
  { "name": "Page C", "uv": 2000, "pv": 9800, "amt": 2290 },
  { "name": "Page D", "uv": 2780, "pv": 3908, "amt": 2000 }
]
```

- **Response**:
  - **Success (200)**: Returns a success message.
  - **Error (500)**: Returns an error message if the update fails.

##### Example Response:

```json
{
  "message": "Success"
}
```

---

### 2. Pie Chart Data API

#### **GET /api/data/pie_chat**

- **Description**: Fetches the stored data for the pie chart from the Supabase table.
- **Response**:
  - **Success (200)**: Returns an array of objects representing the pie chart data.
  - **Error (500)**: Returns an error message if something goes wrong.

##### Example Response:

```json
[
  { "name": "Group A", "value": 400 },
  { "name": "Group B", "value": 300 },
  { "name": "Group C", "value": 300 },
  { "name": "Group D", "value": 200 }
]
```

#### **PUT /api/data/pie_chat**

- **Description**: Updates the stored data for the pie chart in the Supabase table.
- **Request Body**:
  - An array of objects representing the pie chart data to be updated.
  - **Content-Type**: `application/json`
  
##### Example Request:

```json
[
  { "name": "Group A", "value": 400 },
  { "name": "Group B", "value": 300 },
  { "name": "Group C", "value": 300 },
  { "name": "Group D", "value": 200 }
]
```

- **Response**:
  - **Success (200)**: Returns a success message.
  - **Error (500)**: Returns an error message if the update fails.

##### Example Response:

```json
{
  "message": "Success"
}
```

---

## Error Handling

If any errors occur during the API requests, the server will return a **500 Internal Server Error** response along with a JSON error message.

#### Example Error Response:

```json
{
  "message": "Internal Server Error"
}
```

---

## Notes

- Ensure that the `chat_data` table in your Supabase database is set up with two columns:
  - `type` (string): Stores the chart type (`line_and_bar_chat` or `pie_chat`).
  - `data` (JSONB): Stores the chart data as JSON.
