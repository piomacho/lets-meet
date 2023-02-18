export const firebaseErrors: Record<string, string> = {
    'auth/wrong-password': 'The password is invalid or the user does not have a password.',
    'auth/user-not-found': 'The user does not exist',
    'auth/email-already-exists':
        'The provided email is already in use by an existing user. Each user must have a unique email.',
    'auth/id-token-expired': 'The provided Firebase ID token is expired.',
    'auth/id-token-revoked': 'The Firebase ID token has been revoked.',
    'auth/invalid-password':
        'The provided value for the password user property is invalid. It must be a string with at least six characters.',

    'auth/credential-already-in-use': 'This credential is already associated with a different user account.',
    'auth/email-already-in-use': 'The email address is already in use by another account.',
    'auth/internal-error': 'An internal AuthError has occurred.',
    'auth/invalid-email': 'The email address is badly formatted.',
    'auth/account-exists-with-different-credential':
        'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.',
    'auth/too-many-requests':
        'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
};
