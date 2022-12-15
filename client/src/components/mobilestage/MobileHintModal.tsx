import React, { useState } from 'react';
import classNames from 'classnames';
import volumehigh from '/public/assets/icons/volume.svg';
import vibrate from '/public/assets/icons/vibrate.svg';

export default function MobileHintModal() {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <div className={classNames('modal modal-bottom sm:modal-middle', { 'modal-open': open })}>
      <div className="modal-box">
        <div className="flex flex-col">
          <div className="flex flex-row justify-around">
            <img src={volumehigh} className="w-16 h-16" />
            <img src={vibrate} className="w-16 h-16" />
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
