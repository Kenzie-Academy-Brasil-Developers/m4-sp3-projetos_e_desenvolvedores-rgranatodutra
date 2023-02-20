export function convertDateToPostgreFormat(stringDate: string): string {
    const date = new Date(stringDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    const formatedDate = `${year}/${month}/${day}`;

    return formatedDate;
};