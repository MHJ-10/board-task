import { EllipsisIcon } from "lucide-react";

interface ListProps {
  onOptionsClick?: () => void;
  titleNode: React.ReactNode;
  children?: React.ReactNode;
}

const List = (props: ListProps) => {
  const { titleNode, onOptionsClick, children } = props;

  return (
    <div className="list">
      <div className="listHeader">
        {titleNode}
        {onOptionsClick && (
          <EllipsisIcon className="cursor-pointer" onClick={onOptionsClick} />
        )}
      </div>
      {children}
    </div>
  );
};

export default List;
