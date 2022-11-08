import React from 'react';

export default function NamePicker() {
  return (
    <div className="form-control w-full m-4">
      <label className="label">
        <span className="label-text">What is your name?</span>
      </label>
      <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
    </div>
  );
}
