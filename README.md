# recup 

*   **check recup app** → [recup - just-recup.netlify.app](https://just-recup.netlify.app/)

*where the good stuff lives*

<img width="420" alt="image" src="https://github.com/user-attachments/assets/8eda20f4-a204-4f67-accd-b2548849c122">

**Welcome to recup**
=========

Your personal space to find, share, and celebrate content that truly matters.


**Overview**
------------

This is a platform dedicated to highlighting content worth sharing, bringing you genuine recommendations from real people. Cut through the noise and find what truly matters, all in one place.

**Pages**
---------

*   **Home** – your welcome page to recup, where the good stuff lives
    
*   **About** – a brief intro to recup's mission and values
    
*   **Help** – sign up, log in, and recup the magic; contact info included
    

**Logged-in Pages:**

*   **Dashboard** – find all your saved recups, with links to update your info (name, last name, and social link)
    
*   **Browse & recup** – search for content; if not found, add it yourself
    
*   **Created recups** – access all the recups you’ve created
    
*   **Add Content** – a form to add new content (automatically checks for duplicates)
    
*   **User Profiles** – explore user profiles with their created recups; name, last name, and social link if available
    

**Key Features**
----------------

*   **Authentication** – powered by Context, verifying user status and ID
    
*   **Bookmark Saves** – save/unsave with smooth toggle, and bookmarks don’t appear on your own recups
    
*   **recup Alerts** – alerts you to update instead of duplicating a recup
    
*   **Form Validation** – error messages guide you through any incomplete or incorrect submissions, with backend validation in place
    
*   **Content Cards** – each card gives access to all recups tied to that content
    
*   **recup Cards** – easily access the creator’s profile, or if it’s yours, a prompt takes you to “Created recups” instead
    

**Navigation**
--------------

recup is fully responsive with a smooth navbar (toggle for mobile) and footer links. The navbar logo is dynamic:

*   **Unlogged** – takes you back to Home
    
*   **Logged-in** – directs you to the Dashboard

**Extras:**

*   **Loading Spinners** – sleek animations keep you informed while pages load.
    
*   **Error Handling** – friendly error messages for seamless experience, with specific pages for **404** (lost page) and **500** (server error). Plus, the **404 page** features a rotating Rubik’s Cube!
    

**Backend Endpoints**
---------------------

|**Model**|**Route**|**Method**|**Description**|
|---|---|---|---|
|**User**|`/users/user-profile/:id`|`GET`|Fetch user profile data|
||`/users/:id/saved-recommendations`|`GET`|Get saved recommendations by user|
||`/users/:id/save/:recommendationId`|`PUT`|Save a recommendation for the user|
||`/users/:id/unsave/:recommendationId`|`PUT`|Unsave a recommendation|
||`/users/created/:username`|`GET`|Fetch user’s created recups by username|
||`/users/user-profile/:id`|`GET`|Get full profile data for the logged user|
||`/users/:id`|`PUT`|Update user profile data|
||`/users/:id`|`GET`|Fetch user profile|
|**Content**|`/contents`|`GET`|Fetch all content|
||`/contents/:id`|`GET`|Fetch details of specific content|
||`/upload/media`|`POST`|Upload media file via Cloudinary|
|**Recommendation**|`/recommendations/content/:id`|`POST`|Create a new recommendation for content|
||`/recommendations/:id`|`GET`|Fetch a single recommendation by ID|
||`/recommendations/:id`|`PUT`|Update an existing recommendation|
||`/recommendations/content/:contentId`|`GET`|Fetch all recommendations by content ID|
||`/recommendations/creator/:userId`|`GET`|Fetch all recommendations by the user|
||`/recommendations/new-content`|`POST`|Submit a new content and create a recup|
|**Auth**|`/auth/verify`|`GET`|Verify user’s authentication|
||`/auth/login`|`POST`|Login user and generate auth token|
||`/auth/signup`|`POST`|Sign up a new user|


---------------------


That's it. Now go recup the world.
