const Filter = ({ name, handler }) => {
  return (
    <p>
      Filter shown with: <input value={name} onChange={handler} />
    </p>
  );
};

export default Filter;
