import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from "fs";
import { join } from "path";

@Injectable()
export class UploaderService {
  deleteFile(path: string): void {
    fs.access(path, (err) => {
      if (!err)
        fs.unlink(path, () => {
          console.log("Files was deleted!");
        });
    });
  }

  validateImgType(file: Record<any, any>): void {
    const types = ["png", "jpeg", "jpg,", "gif"];
    if (!types.includes(file.mimetype.split("/")[1])) {
      this.deleteFile(file.path);

      throw new HttpException(
        "Wrong format of file!",
        HttpStatus.NOT_ACCEPTABLE
      );
    }
  }

  renameImg(path: string, imagesFolder: string, newName: string): void {
    fs.access(path, (err) => {
      if (!err)
        fs.renameSync(
          path,
          join(__dirname, "..", "uploads", `${imagesFolder}`, `${newName}`)
        );
      else throw new HttpException("Image not found!", HttpStatus.BAD_REQUEST);
    });
  }
}
