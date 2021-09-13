import React, { Suspense } from 'react';

const RenderItems = ({ children } : any) => {
    return (
        <Suspense fallback={<div>...loading</div>}>
            { children }
        </Suspense>
    );
};

export default RenderItems;