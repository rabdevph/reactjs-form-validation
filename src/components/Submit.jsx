const Submit = ({ type, value }) => {
  const handleClick = () => {
    console.log(`clicked submit`);
  };

  return (
    <button
      type={type}
      className="bg-emerald-400 border-2 border-black cursor-pointer outline-none py-2 text-white w-full active:bg-emerald-500"
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

export default Submit;
