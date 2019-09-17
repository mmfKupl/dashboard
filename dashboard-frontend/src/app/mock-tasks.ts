import { Task } from './task';
import { Subtask } from './subtask';

export const TASKS: Task[] = [
  {
    id: '1',
    title: 'test 1  task ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, eligendi.',
    status: false,
    subtasks: [
      { id: '1', title: 'ny subtask', status: false },
      { id: '2', title: 'ny subtask 2', status: true }
    ]
  },
  {
    id: '2',
    title: 'test 2  task',
    description: 'Lorem ipsum dolor sit amet.',
    status: true,
    subtasks: []
  },
  {
    id: '3',
    title: 'test 3  task',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita sunt.',
    status: true,
    subtasks: []
  },
  {
    id: '4',
    title: 'test 4  task',
    description: 'Lorem, ipsum dolor.',
    status: false,
    subtasks: []
  }
];
