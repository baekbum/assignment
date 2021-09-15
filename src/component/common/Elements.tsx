import { Suspense } from 'react';

export const Div = (props?: any) => {
    return (
        <div {...props}>{props.children}</div>
    )
};

export const Span = (props?: any) => {
    return (
        <span {...props}>{props.children}</span>
    )
};

export const RenderItems = ({ children } : any) => {
    return (
        <Suspense fallback={<div>...loading</div>}>
            { children }
        </Suspense>
    );
};