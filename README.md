# Hour Tracker

An application that allows you to track the hours you have spent working. This is an in progress project.

# Table of Contents

Click on the links below to check out an explanation of each component of this app.

1. [📐Project Layout](#project-layout)
2. [🔒 Authentication](#authentication)

## 📐 Project Layout <a name="project-layout"></a>

## 🔒 Authentication <a name="authentication"></a>

### Tools

Authentication is handled by [Supabase Auth](https://supabase.com/auth).

### Credits

The authentication implementation was largely based on this [repository](https://github.com/mmvergara/react-supabase-auth-template). All credit for the authentication organization goes to [mmvergara](https://github.com/mmvergara).

### Description

The components of authentication are found in the [SessionContext.tsx](https://github.com/KyleHu14/hour-tracker/blob/main/src/context/SessionContext.tsx) file.

This file sets up a context that will store the user's session and be accessible to all pages in the project.

The file also creates a hook called `useSession`. This hook is a wrapper for accessing the `SessionContext`.

Lastly we create a component called the `SessionProvider` that sets up the session and isLoading useStates. The useEffect in the `SessionProvider` is used to set up an auth event listener which will update the session accordingly.
