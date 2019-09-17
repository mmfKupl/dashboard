import { Subtask } from './subtask';

export class Task {
  constructor(
    public id: number | string,
    public title: string,
    public description: string,
    public status: boolean,
    public subtasks: Subtask[]
  ) {}
}
