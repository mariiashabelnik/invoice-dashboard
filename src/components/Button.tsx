export const Button = ({ color, title, disabled, opacity }: ButtonProps) => {
  return (
    <>
      <button style={{ color: color, opacity: opacity }} disabled={disabled}>
        {title}
      </button>
    </>
  );
};

<Button title="Click me!" color="#ff0000" disabled={false} />;
