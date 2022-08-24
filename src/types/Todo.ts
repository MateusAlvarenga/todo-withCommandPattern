import generateUUID from "../lib/UUID";

export class Todo {
  private id: string;
  private title: string;
  private completed: boolean;

  constructor(title: string) {
    this.id = generateUUID();
    this.title = title;
    this.completed = false;
  }

  getId(): string {
    return this.id;
  }
  getTitle(): string {
    return this.title;
  }
  isCompleted(): boolean {
    return this.completed;
  }

  setCompleted(completed: boolean): void {
    this.completed = completed;
  }
}
