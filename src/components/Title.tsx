export const Title = ({ title }: TitleProps) => {
  return (
    <>
      <div aria-label="Titlebox" className="header title">
        {title}
      </div>
      <hr />
    </>
  );
};
