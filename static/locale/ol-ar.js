
// make it run on both platforms
(function (global) {

  const _LocaleId = 'ar-JO';
  const _Language = 'ar';


  // TODO: translate
  const keys = {
    NoRes: '', // if resource is not found
    Required: 'مطلوب',
    Error: 'حدث خطأ ما',
    Dismiss: '',
    Unknown: 'لم نستطع تنفيذ الأمر المطلوب لخطأ ما. نحن نتحقق من هذا الأمر حالًا.',
    DONE: 'تمّ الأمر',
    UNAUTHORIZED: 'ليس لديك الصلاحية لمشاهدة هذه الصفحة.',
    SAVED: 'حُفظ',
    INVALID_TOOLONG: 'Too long',
    INVALID_TOOSHORT: 'قصير جدًا',
    INVALID_TOOLARGE: 'Too large',
    INVALID_TOOSMALL: 'Too small',
    INAVLID_NUMBER: 'ليس رقمًا',
    INVALID_email_FORMAT: 'صيغة البريد الإلكتروني غير صحيحة',
    INVALID_url_FORMAT: 'صيغة الرابط غير صحيحة',
    INVALID_phone_FORMAT: 'صيغة غير صحيحة لرقم الهاتف',
    INVALID_password_FORMAT: 'كلمة مرور بصيغة غير صحيحة',
    INVALID_shortname_FORMAT: 'صيغة الاسم القصير غير صيحية',
    INVALID_FILE_FORMAT: 'صيغة الملف غير مقبولة. الصيغ المقبولة هي: $0',
    INVALID_date_FORMAT: 'Invalid date format',
    ALREADY_EXISTS: 'هذا البريد مسجّل لدينا. حاول الدخول أو استخدم عنوانًا آخر.',
    INVALID_VALUE: 'ليس ضمن القيم المسموح بها',
    INVALID_LENGTH: 'طول القيمة المدخلة ليس ضمن النطاق المسموح به',
    INVALID_FORMAT: 'صيغة غير صحيحة',
    FILE_LARGE: 'حجم الملف أكبر من المسموح به. ($0 KB)',
    PAGE_NOT_FOUND: 'أهلًا. هذا العنوان أصبح خاليًا.',
    INVALID_FORM: 'بعض الحقول بها أخطاء. أصلحها وحاول مجددًا.',
    INVALID_LOGIN: 'اسم المستخدم أو كلمة المرور غير صحيحة. حاول مجددًا.',
    Login: 'دخول',
    SECONDS: { 1: 'ثاينة واحدة', 2: 'ثوانٍ', 11: '$0 ثانية' },
    MINUTES: { 1: 'دقيقة واحدة', 2: 'دقائق', 11: '$0 دقيقة' },
    HOURS: { 1: 'ساعة واحدة', 2: 'ساعتين', 3: '$0 ساعات', 11: '$0 ساعة' },
    DAYS: { 1: 'يوم واحد', 2: 'يومين', 3: '$0 ايام', 11: '$0 يوما' },
    MONTHS: { 1: 'شهر واحد', 2: 'عدة أشهر', 11: '$0 شهرًا' },
    YEARS: { 1: 'سنة واحدة', 2: 'سنتين', 3: '$0 سنوات', 5: 'سنين' },
    TIMEAGO: 'قيل $0',
    INTIME: 'في $0',
    Results: { 0: 'لا نتائج', 1: 'نتيجة واحدة', 2: 'نتيجتين', 3: '$0 نتائج', 11: '$0 نتيجة' },
    PAGE_TITLES: {
      ERROR: 'حدث خطأ ما!',
      NOT_FOUND: '404! أهلاً. هذا العنوان أصبح خاليًا.'
    },
    RECORDS: 'محتويات',
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
