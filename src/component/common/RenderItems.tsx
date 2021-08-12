import React, { Suspense } from 'react';

type props = {
    children?: JSX.Element[];
};

const RenderItems = ({children}: props) => {
    return (
        <Suspense fallback={<div>...loading</div>}>
            { children }
        </Suspense>
    );
};

export default RenderItems;