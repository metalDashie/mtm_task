export abstract class AppLogger {
  abstract log(msg: string): void;
  abstract error(id: string, error: Error): void;
}

export class ConsoleLogger implements AppLogger {
  log(msg: string) {
    console.log('LOG:', msg);
  }
  error(id: string, error: Error) {
    console.log(`ERROR (${id}):`, error, error.message);
  }
}

export class FileLogger implements AppLogger {
  log(msg: string) {
    console.log('LOG to file:', msg);
  }
  error(id: string, error: Error) {
    console.log(`ERROR (${id}) to file:`, error);
  }
}

export const appLogger: AppLogger = new ConsoleLogger();
