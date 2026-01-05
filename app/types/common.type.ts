export interface Option {
  label: string;
  message: string;
  onClick: () => void;
}

export interface Comment {
  id: string;
  author: string;
  date: string;
  message: string;
}

export interface Task {
  id: string;
  listId: string;
  title: string;
  comments: Comment[];
}

export interface List {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Board {
  title: string;
  lists: List[];
}
