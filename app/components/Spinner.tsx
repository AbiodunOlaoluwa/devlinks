"use client"
import "./spinner.css"

type Props = {
  color: string;
}

const Spinner = ({color}: Props) => {
  return (
    <div className="spinner_bg">
      <div className={`spinner ${color}`}></div>
    </div>
  );
};

export default Spinner;