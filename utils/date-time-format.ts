export class DateTimeFormat {
    public static getCurrentDateTime(): string {
      const currentDateTime: Date = new Date();
      return currentDateTime.toISOString().slice(0, -1) + 'Z';
    }
  }