type Props = {
  selectedPrice?: number;
  onChange: (value: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4>Max price</h4>
      <select
        value={selectedPrice ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          console.log("Selected value:", value);
          if (value) {
            console.log("Calling onChange with:", parseInt(value));
            onChange(parseInt(value));
          }
        }}
      >
        <option value="">Select a price</option>
        {[50, 100, 150, 200, 250, 300].map((price) => (
          <option key={price} value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
