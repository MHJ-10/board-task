export interface Option {
  label: string;
  message: string;
  onClick: () => void;
}

export interface Comment {
  id: string;
  author: string;
  timestamp: string;
  message: string;
}

export interface Task {
  id: string;
  title: string;
  comments: Comment[];
}
