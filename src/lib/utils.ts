const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** تبدیل ارقام فارسی/عربی به لاتین و نرمال‌سازی جداکننده‌ی اعشار */
export const normalizeDigits = (value: string): string =>
  value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/[٫،,]/g, ".");

/** مقدار عددیِ ورودی کاربر (یا null اگر نامعتبر باشد) */
export const parseNum = (value: string): number | null => {
  const n = parseFloat(normalizeDigits(value.trim()));
  return Number.isFinite(n) ? n : null;
};

export const toFaDigits = (value: string | number): string =>
  String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);

/** «18.6» -> «۱۸٫۶» */
export const faNumber = (value: number, decimals = 0): string =>
  toFaDigits(value.toFixed(decimals)).replace(".", "٫");
