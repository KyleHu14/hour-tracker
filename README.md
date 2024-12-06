# Hour Tracker

An application that allows you to track the hours you have spent working. This is an in progress project.

# Table of Contents

Click on the links below to check out an explanation of each component of this app.

1. [📐Project Layout](#project-layout)
2. [🔒 Authentication](#authentication)
3. [Credits](#credits)

## 💻 Techstack

-   **Authentication** is handled by [Supabase Auth](https://supabase.com/auth).

-   The **database** is built with [Supabase](https://supabase.com).

-   **Routing** is handled with [React Router](https://reactrouter.com/home).

-   **Data fetching** is handled with [TanStack Query](https://tanstack.com/query/latest).

-   **Frontend Styling & UI** is built with [Tailwind](https://tailwindcss.com) and [Shadcn](https://ui.shadcn.com).

-   The **Frontend Framework** is React.js using [Vite](https://vite.dev).

## 📖 Documentation

### 🔒 Authentication <a name="authentication"></a>

#### Description

The components of authentication are found in the [SessionContext.tsx](https://github.com/KyleHu14/hour-tracker/blob/main/src/context/SessionContext.tsx) file.

This file sets up a context that will store the user's session and be accessible to all pages in the project.

The file also creates a hook called `useSession`. This hook is a wrapper for accessing the `SessionContext`.

Lastly we create a component called the `SessionProvider` that sets up the session and isLoading useStates. The useEffect in the `SessionProvider` is used to set up an auth event listener which will update the session accordingly.

### 📺 Frontend <a name="frontend"></a>

#### Description

The frontend file structure is below. Components, context, and hooks are fairly straightforward.

1. components
2. context
3. hooks
4. lib - Used for shadcn utilities
5. pages - Contains all pages in the application
6. router - Contains the router used for routing pages
7. supabase - Contains all supabase related files such as initializing clients and API functions

### 🗄️ Backend <a name="backend"></a>

#### Description

The database is built with Supabase. It is a PostgreSQL database with a an authentication table and a work_logs table that stores users' entries.

#### Design

The work_logs table is fairly straightforward. It stores every user's log / entry. Each log is associated with it's user through a foreign key. This illustrates a **one to many relationship**.

#### Querying from the Frontend

Supabase automatically exposes an API that can be used to query a database. I use the Supabase API to write queries to my database.

I chose to use the Supabase API as adding another layer of complexity like a REST API would over complicate the project. I have also encountered latency issues with hosting my own API through free services. Due to these reasons, I chose to use the Supabase API.

## Credits <a name="credits"></a>

-   The icon of this site is sourced from here
    <a href="https://www.flaticon.com/free-icons/clock" title="clock icons">Clock icons created by Kirill Kazachek - Flaticon</a>

-   The authentication implementation was largely based on this [repository](https://github.com/mmvergara/react-supabase-auth-template).
