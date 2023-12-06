const Button = ({ color, children }) => {
  return (
    <button className={`bg-${color}-500 text-white font-bold py-2 px-4 rounded`}>
      {children}
    </button>
  );
};

export default Button;


// Usage
// <Button color="red">Click Me</Button>
