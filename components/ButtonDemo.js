import { useState } from "react";
import Button from "../components/Button";

const ButtonDemo = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <h2>Count: {count}</h2>

      <Button
        label="Increment"
        clickHandler={() => {
          setCount(count + 1);
        }}
      />
      <Button
        label="Decrement"
        clickHandler={() => {
          setCount(count - 1);
        }}
      />
      <Button label="Download" />
      <Button label="Register Now" />
      <Button label="Learn more" />

      {count > 5 && <div>Special Message</div>}

      <br />

      <Button
        label={isVisible ? "Hide message" : "show message"}
        clickHandler={() => {
          setIsVisible(!isVisible);
        }}
      />
      {isVisible && <p>hello, world</p>}
    </div>
  );
};
export default ButtonDemo;
