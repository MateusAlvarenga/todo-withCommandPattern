export interface Exacutable {
  execute(): void;
}

export interface Command extends Exacutable {
  undo(): void;
}

export class CommandStack {
  private commands: Command[] = [];

  public addAndExecute(command: Command): void {
    this.commands.push(command);
    command.execute();
  }

  public undo(): void {
    if (this.commands == undefined) return;

    if (this.commands.length == 0) return;

    this.commands.pop().undo();
  }

  public getCommands(): Command[] {
    return this.commands;
  }
}
