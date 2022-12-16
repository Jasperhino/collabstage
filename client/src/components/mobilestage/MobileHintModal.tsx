import React, { useState } from 'react';
import classNames from 'classnames';

export default function MobileHintModal() {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <div className={classNames('modal modal-bottom sm:modal-middle', { 'modal-open': open })}>
      <div className="modal-box">
        <div className="flex flex-col">
          <div className="flex flex-row justify-around">
            <img src="/assets/icons/volume.svg" className="w-16 h-16" />
            <img src="/assets/icons/vibrate.svg" className="w-16 h-16" />
          </div>
          <p className="py-4">To enjoy the best experience turn sound and vibration on.</p>
        </div>
        <div className="modal-action">
          <button className="btn" onClick={() => setOpen(false)}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
