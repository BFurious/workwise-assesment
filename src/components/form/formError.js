
'use client';

import React from 'react';

const ErrorComponent = ({ error }) => {
    return (
        <div className='my-px'>
            <p className="text-red-500 text-sm mt-1">{error}</p>
        </div>
    )
}
export default ErrorComponent;