const Form = ({ handleSubmit, children }) => {
  return (
    <form
      id="form"
      className="bg-white flex flex-col gap-8 border-2 border-black shadow-form shadow-black p-8 w-full md:w-96"
      onSubmit={handleSubmit}
      noValidate
    >
      {children}
    </form>
  );
};

export default Form;
