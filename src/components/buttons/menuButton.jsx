export const MenuButton = ({ color, children }) => {
  return (
    <button className={`bg-${color} text-black font-bold py-2 px-4 rounded-2xl border shadow-md w-full m-2 hover:bg-gray-100`}>
      {children}
    </button>
  );
};



// Usage
// <Button color="red">Click Me</Button>
