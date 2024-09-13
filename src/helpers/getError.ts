import * as Sentry from '@sentry/node';

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        Sentry.captureException(error); // Capture the error with Sentry
        return error.message;
    }
    Sentry.captureMessage(String(error)); // Capture non-Error objects as messages
    return String(error);
}