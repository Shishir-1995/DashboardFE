export class PromiseUtil {
  public static debounce<Params extends unknown[]>(
    func: (...args: Params) => unknown,
    timeout: number
  ): (...args: Params) => void {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Params) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  }

  public static sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
