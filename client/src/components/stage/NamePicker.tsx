import React from 'react';

interface INamePickerProps {
  onNameChange: React.Dispatch<React.SetStateAction<any>>;
}
export default function NamePicker(props: INamePickerProps) {
  return (
    <div className="form-control w-full m-4">
      <label className="label">
        <span className="label-text">What is your name?</span>
      </label>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-primary w-full max-w-xs"
        onChange={(e) => {
          props.onNameChange(e.target.value);
        }}
        autoFocus
      />
    </div>
  );
}
