import React, { ReactNode } from 'react';

export default function CharacterLayout(props: { children: ReactNode }) {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img src="https://images6.alphacoders.com/691/691559.jpg" className="max-w-sm rounded-lg shadow-2xl" />
                    <div className="DialogWindow">
                        <div className="DialogBox">
                        <div className="dialogTitle">Harry</div>
                            <div className="max-w-md">{props.children}</div>
                        </div>
                    </div>
            </div>
        </div>
    );
}
