'use client'
import React, { forwardRef } from 'react';

// this component will show the extra features when the option is selcted as per the Ids
const ExpandableOptions = ((props, ref) => {
    return (
        <div ref={ref} className="mt-4 space-y-4 transition-max-height duration-500 ease-in-out flex flex-row items-center">
            <div className="mt-2 space-y-2 flex flex-col items-center flex-1">
                <div className="flex w-full px-5 space-x-2 items-left text-sm">

                    <h6>Description</h6>
                </div>
                <div className="flex flex-row space-x-2 flex-1 items-center">
                    <p type="textarea">{props.description}</p>
                </div>
            </div>

            <div className="mt-2 space-y-2 flex flex-col items-center text-center flex-1" style={{ width: "30%" }}>
                <div className="flex w-full px-5 space-x-2 items-left text-sm">

                    <h6>Category</h6>
                </div>
                <div className="flex flex-row space-x-2 flex-1 items-center">
                    <p type="textarea">{props.category}</p>
                </div>
            </div>
            {props.showCart && <div className="mt-2 space-y-2 flex flex-col items-center text-center flex-1" style={{ width: "30%" }}>
                <div className="flex w-full px-5 space-x-2 items-left text-sm">

                    <h6>Quantity</h6>
                </div>
                <div className="flex flex-row space-x-2 flex-1 items-center">
                    <p type="textarea">{props.quantity}</p>
                </div>
            </div>
            }
        </div>
    );
});

export default ExpandableOptions;
