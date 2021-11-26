/**
* Returns date format as string 'yyyy-MM-dd'
* @param date
*/
export function formatDate(date: string | Date): string {
  return (date instanceof Date)
    ? date.toISOString().split('T')[0]
    : new Date(date).toISOString().split('T')[0];
}

/**
 * Validates if the supplied date is valid.
 * @param date 
 * @returns 
 */
export function isValidDate(date: string | Date): boolean {
  if (!date) {
    return false;
  }
  return (date instanceof Date && !isNaN(date.getTime())) || (!isNaN(new Date(date).getTime()));
}