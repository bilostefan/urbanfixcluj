# Bilo Renovations Website

This is a premium interior renovation website built with HTML, CSS, and JavaScript. It features a dynamic gallery that loads images directly from a Google Drive folder.

## 📁 Project Structure

- `index.html`: The main website structure.
- `styles.css`: All styling and responsiveness rules.
- `script.js`: Handles navigation, smooth scrolling, and the gallery image fetching.
- `google_apps_script.js`: **Server-side code** for Google Drive integration.

## 🚀 Setup Guide

### 1. Google Drive Integration (Required for Gallery)
To make the gallery work, you need to set up a Google Apps Script that acts as a bridge between your Google Drive folder and this website.

1.  Open [Google Apps Script](https://script.google.com/).
2.  Click **New Project**.
3.  Copy the content of `google_apps_script.js` from this project.
4.  Paste it into the editor (`Code.gs`), replacing any existing code.
5.  **Crucial Step**: Get the ID of the Google Drive folder containing your gallery images.
    - Open the folder in Google Drive.
    - The ID is the long string of random characters at the end of the URL (e.g., `.../folders/1ABCmT...`).
6.  In the script, replace `"REPLACE_WITH_YOUR_FOLDER_ID"` with your actual Folder ID.
7.  Click **Deploy** > **New deployment**.
8.  Click the "Select type" gear icon > **Web app**.
9.  Set **Who has access** to **Anyone**. (This is important so your website can read the images).
10. Click **Deploy**.
11. Copy the **Web App URL** (it starts with `https://script.google.com/macros/...`).

### 2. Connect the Script to the Website
1.  Open `script.js` in your code editor.
2.  Find the line:
    ```javascript
    const GAS_URL = "";
    ```
3.  Paste your Web App URL inside the quotes:
    ```javascript
    const GAS_URL = "https://script.google.com/macros/s/AKfycb.../exec";
    ```
4.  Save the file.

## 🌐 Deployment (Free Hosting)

You can host this site for free using **GitHub Pages**.

1.  Upload these files to a GitHub repository.
2.  Go to the repository **Settings**.
3.  Click on **Pages** in the left sidebar.
4.  Under **Build and deployment** / **Source**, select **Deploy from a branch**.
5.  Select your `main` (or `master`) branch and the root folder `/`.
6.  Click **Save**.
7.  Wait a minute, and GitHub will provide you with a live URL for your website!

## 🎨 Customizing
- **Images**: Simply add or remove images from your Google Drive folder. The website will update automatically on refresh!
- **Colors**: Edit the `:root` variables at the top of `styles.css` to change the theme colors.
