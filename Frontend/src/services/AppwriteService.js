// src/services/AppwriteManager.js
import { Client, Storage } from "appwrite";

class AppwriteManager {
  constructor() {
    this.client = new Client()
      .setEndpoint(import.meta.env.VITE_APPWRITE_URL) // e.g., http://localhost/v1
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

    this.storage = new Storage(this.client);

    // Default bucket for media uploads
    this.bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID || "media";
  }

  /**
   * Uploads a File (image, video, etc.) to Appwrite storage
   * @param {File} file - The file object from input
   * @param {string} [fileId] - Optional custom file ID, or "unique()"
   * @returns {Promise<string>} - Returns Appwrite file ID
   */
  async uploadFile(file, fileId = "unique()") {
    if (!file) throw new Error("No file provided for upload");

    const response = await this.storage.createFile(
      this.bucketId,
      fileId,
      file
    );

    return response.$id;
  }

  /**
   * Generates a public view URL for a file by its Appwrite ID
   * @param {string} fileId - The Appwrite file ID
   * @returns {string} - The URL to view/download the file
   */
  async getFileViewURL(fileId) {
    if(!fileId) return
    try {
        return this.storage.getFileView(this.bucketId, fileId);
    } catch (err) {
        console.error("Failed to get Appwrite file view URL", err);
    }
  }

  /**
   * Deletes a file from Appwrite by its ID
   * @param {string} fileId - The Appwrite file ID
   * @returns {Promise<void>}
   */
  async deleteFile(fileId) {
    if (!fileId) throw new Error("No file ID provided for deletion");
    await this.storage.deleteFile(this.bucketId, fileId);
  }
}

// Export a singleton instance
export default new AppwriteManager();
