const colors = [
  {
    name: "red",
    value: "#ff0000",
  },
];
const ColorPicker = () => {
  return (
    <div
      style={{
        backgroundColor: colors[0].value,
      }}
    >
      color picker
    </div>
  );
};
export default ColorPicker;
