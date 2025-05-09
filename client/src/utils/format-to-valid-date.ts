const yyMmDdToHtmlDate = (str: string): string => {
  const parts = str.split("/");
  if (parts.length !== 3) return "";
  // eslint-disable-next-line prefer-const
  let [yy, mm, dd] = parts;

  // validate 2-digit year:
  if (!/^\d{2}$/.test(yy)) return "";
  // validate month/day numeric:
  if (!/^\d{1,2}$/.test(mm) || !/^\d{1,2}$/.test(dd)) return "";

  const year = `20${yy}`;
  mm = mm.padStart(2, "0");
  dd = dd.padStart(2, "0");

  return `${year}-${mm}-${dd}`;
};

export default yyMmDdToHtmlDate;
