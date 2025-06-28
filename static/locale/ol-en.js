


// make it run on both platforms
(function (global) {

  const _LocaleId = 'en';
  const _Language = 'en';


  const keys = {
    NoRes: '',
    Required: 'Required',
    Error: 'An error occurred',
    Dismiss: 'Dismiss',
    Unknown: 'Oops! We could not perform the required action for some reason. We are looking into it right now.',
    DONE: 'Done',
    UNAUTHORIZED: 'You are not authorised to view this page.',
    SAVED: 'Saved successfully',
    INVALID_TOOLONG: 'Too long',
    INVALID_TOOSHORT: 'Too short',
    INVALID_TOOLARGE: 'Too large',
    INVALID_TOOSMALL: 'Too small',
    INAVLID_NUMBER: 'Not a number',
    INVALID_email_FORMAT: 'Invalid email format',
    INVALID_url_FORMAT: 'Invalid URL format',
    INVALID_phone_FORMAT: 'Invalid phone format',
    INVALID_password_FORMAT: 'Invalid password format',
    INVALID_shortname_FORMAT: 'Invalid shortname format',
    INVALID_FILE_FORMAT: 'The format of the file is not allowed. Allowed formats are: $0',
    INVALID_date_FORMAT: 'Invalid date format',
    ALREADY_EXISTS: 'The email you used has already been signed up. Use another one, or try to sign in.',
    INVALID_VALUE: 'Value entered is not within the range allowed',
    INVALID_LENGTH: 'The length of the value entered is not within range allowed',
    INVALID_FORMAT: 'Invalid format',
    FILE_LARGE: 'The size of the file is larger than the specified limit ($0 KB)',
    PAGE_NOT_FOUND: 'Hmm! Once in a while, we change address and forget to update the mailman.',
    INVALID_FORM: 'Some fields are not valid, fix and submit again.',
    INVALID_LOGIN: 'Wrong username or password.',
    Login: 'Sign in',
    SECONDS: { 1: 'one second', 2: 'few seconds', 10: '$0 seconds' },
    MINUTES: { 1: 'one minute', 2: 'few minutes', 9: '$0 minutes' },
    HOURS: { 1: 'one hour', 2: 'few hours', 9: '$0 hours' },
    DAYS: { 1: 'one day', 2: 'few days', 9: '$0 days' },
    MONTHS: { 1: 'one month', 2: 'few months', 4: '$0 months' },
    YEARS: { 1: 'one year', 2: '$0 years', 5: 'many years' },
    TIMEAGO: '$0 ago',
    INTIME: 'in $0',
    Results: { 0: 'no results', 1: 'one result', 2: 'two results', 3: '$0 results' },

    PAGE_TITLES: {
      ERROR: 'Oh oh, an error occurred',
      NOT_FOUND: '404! Hmm! Once in a while, we change address and forget to update the mailman.'
    },
    RECORDS: 'Records',
    ERRORS: {
      NOT_ALLOWED: 'Not authorized to execute this action.',
      VALIDATION_ERROR: 'General validation error occurred, please fix and try again.',
      UNPROCESSABLE_ENTITY: 'Unprocessable entity',
      INVALID_IDENTIFIER: 'Invalud identifier',
      INVALID_CONFIRMATION: 'Invalid confirmation.',
      SHORTNAME_ALREADY_EXIST: 'Shortname already exists',
      SHORTNAME_DOES_NOT_EXIST: 'Oppse, could not find the resource you are looking for.',
      INVALID_DATA: 'Invalid data',
      SOMETHING_WRONG: 'Something went wrong',
      INVALID_HEALTH_CHECK: 'Invalid health check',
      INVALID_APP_KEY: 'Invalid app key',
      INVALID_ROUTE: 'Invalid route',
      OBJECT_NOT_FOUND: 'Object not found',
      INVALID_SPACE_NAME: 'Invalid space shortname. Use lowercase alphanumeric characters with no spaces.',
      CANNT_DELETE: 'Cannot delete',
      ALREADY_EXIST_SPACE_NAME: 'Space name already exists',
      MISSING_DATA: 'Missing data',
      NOT_ALLOWED_LOCATION: 'Not allowed location',
      PROVID_SOURCE_PATH: 'Provide source path',
      MISSING_DESTINATION_OR_SHORTNAME: 'Missing destination or shortname',
      EMAIL_OR_MSISDN_REQUIRED: 'Email or MSISDN is required',
      MISSING_METADATA: 'Missing metadata',
      MISSING_FILTER_SHORTNAMES: 'Missing filter shortnames',
      WORKFLOW_BODY_NOT_FOUND: 'Workflow body not found',
      NOT_SUPPORTED_TYPE: 'Not supported type',
      SOME_SUPPORTED_TYPE: 'Some supported type',
      TICKET_ALREADY_CLOSED: 'Ticket is already closed',
      INVALID_TICKET_STATUS: 'Invalid ticket status',
      DIR_NOT_FOUND: 'Directory not found',
      LOCK_UNAVAILABLE: 'Lock is unavailable',
      LOCKED_ENTRY: 'Locked entry',
      QR_ERROR: 'QR error',
      QR_EXPIRED: 'QR expired',
      QR_INVALID: 'QR invalid',
      INVALID_INVITATION: 'Invalid invitation',
      INVALID_PASSWORD_RULES: 'Invalid password rules',
      INVALID_USERNAME_AND_PASS: 'Invalid username and password',
      USER_ISNT_VERIFIED: 'User is not verified',
      PASSWORD_NOT_VALIDATED: 'Password is not validated',
      PASSWORD_RESET_ERROR: 'Password reset error',
      UNMATCHED_DATA: 'Unmatched data',
      USERNAME_NOT_EXIST: 'Username does not exist',
      OTP_INVALID: 'Invalid OTP',
      OTP_EXPIRED: 'Expired OTP',
      OTP_FAILED: 'Failed OTP',
      OTP_ISSUE: 'OTP issue',
      OTP_RESEND_BLOCKED: 'OTP resend blocked',
      INVALID_STANDALONE_DATA: 'Invalid standalone data',
      ONE_ARGUMENT_ALLOWED: 'Only one argument is allowed',
      DATA_SHOULD_BE_UNIQUE: 'Data should be unique',
      INVALID_TOKEN: 'Invalid token',
      EXPIRED_TOKEN: 'Expired token',
      NOT_AUTHENTICATED: 'Not authenticated',
      SESSION: 'Session',
      OBJECT_NOT_SAVED: 'Object not saved',
    },
    // inject:translations
    // endinject
  };

  global.cl = global.cl || {};
  global.cl.resources = {
    language: _Language,
    keys,
    localeId: _LocaleId
  }

  // for nodejs
  global.cl[_Language] = global.cl.resources;



// @ts-ignore
})(typeof globalThis !== 'undefined' && globalThis || typeof global !== 'undefined' && global ||
  typeof window !== 'undefined' && window);

