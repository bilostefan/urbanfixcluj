// ------------------------------------------------------------------------------------------------
// COPY THIS CODE INTO A NEW GOOGLE APPS SCRIPT PROJECT
// 1. Go to https://script.google.com/
// 2. Create a new Project
// 3. Paste this code into "Code.gs"
// 4. IMPORTANT: Change the FOLDER_ID below to your specific Google Drive Folder ID
// 5. Click "Deploy" -> "New Deployment" -> Select type "Web app"
// 6. Set "Who has access" to "Anyone"
// 7. Click "Deploy" and Copy the URL
// ------------------------------------------------------------------------------------------------

// REPLACE THIS WITH YOUR FOLDER ID
// You can get this from the URL when you open the folder in Drive: drive.google.com/drive/folders/YOUR_FOLDER_ID_IS_HERE
const FOLDER_ID = "REPLACE_WITH_YOUR_FOLDER_ID";

function doGet() {
  const result = getFilesFromFolder(FOLDER_ID);
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function getFilesFromFolder(folderId) {
  try {
    const folder = DriveApp.getFolderById(folderId);
    const files = folder.getFiles();
    const fileList = [];

    while (files.hasNext()) {
      const file = files.next();
      // Only get images
      if (file.getMimeType().includes("image")) {
        fileList.push({
          name: file.getName(),
          // Build a direct link format that works for <img> tags
          url: "https://lh3.googleusercontent.com/d/" + file.getId()
        });
      }
    }
    return { success: true, data: fileList };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}
