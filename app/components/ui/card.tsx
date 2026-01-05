interface CardProps {
  title: string;
  children?: React.ReactNode;
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="card">
      <p className="card__title">{title}</p>
      <div>{children}</div>
    </div>
  );
};

export default Card;
