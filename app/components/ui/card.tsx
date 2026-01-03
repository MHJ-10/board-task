interface CardProps {
  title: string;
  children?: React.ReactNode;
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="card">
      <p className="cardTitle">{title}</p>
      <div>{children}</div>
    </div>
  );
};

export default Card;
