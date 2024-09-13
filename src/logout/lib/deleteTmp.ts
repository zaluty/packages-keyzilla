
import fs from "fs";
import { getAuditPath, getCachePath } from "../../auth/lib/authCache";

export function deleteTempFiles(): void {
  deleteFile(getCachePath());
  deleteFile(getAuditPath());
}

function deleteFile(filePath: string): void {
  try {
    fs.unlinkSync(filePath);
    console.log(`Successfully deleted ${filePath}`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.log(`File not found: ${filePath}`);
    } else {
      console.error(`Error deleting ${filePath}:`, error);
    }
  }
}

export function clearAuthData(): void {
  deleteTempFiles();
  console.log("All temporary authentication data has been cleared.");
}