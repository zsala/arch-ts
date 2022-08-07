import * as fs from "fs";
import * as path from "path";

export const readProjectFiles = (directoryPath: string): string[] => {
  const files: string[] = [];

  function traverse(dir: string) {
    fs.readdirSync(dir).forEach((file: any) => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        traverse(filePath);
      } else if (filePath.endsWith(".ts") && !filePath.endsWith(".spec.ts")) {
        files.push(filePath);
      }
    });
  }

  traverse(directoryPath);
  return files;
};
