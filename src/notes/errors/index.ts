import { HttpException } from "@nestjs/common";

export class NotesNotFoundException extends HttpException {
    name: "NotesNotFoundException";
}