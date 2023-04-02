import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSnackbar } from 'notistack';


export const FailSafe: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();
    const onError = (err: unknown) => {

        console.error('lolo', err);
    }
    return (
        <ErrorBoundary onError={onError} fallback={<>err</>}>{children}</ErrorBoundary>
    );
}