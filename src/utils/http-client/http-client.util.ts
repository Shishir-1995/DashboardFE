export interface HttpErrorResponse {
  response?: {
    data?: {
      code: string;
      message: string;
    };
    status?: number;
  };
}

export class ApiError {
  messageKey?: string;
  error?: Error;

  // eslint-disable-next-line no-useless-constructor
  private constructor(messageKey?: string) {
    this.messageKey = messageKey;
  }

  public static fromError(error: Error, msgKey?: string): ApiError {
    const apiErr = new ApiError(msgKey);
    apiErr.error = error;

    return apiErr;
  }
}

export class HttpClientUtil {
  public static getErrorMsgKey(error: unknown): string {
    const defaultMessage = 'something_went_wrong';

    if (error instanceof ApiError) {
      return (
        error.messageKey ??
        (error.error as HttpErrorResponse).response?.data?.message ??
        defaultMessage
      );
    }
    if (error instanceof Error) {
      return (
        (error as HttpErrorResponse).response?.data?.message ?? error.message ?? defaultMessage
      );
    }

    return defaultMessage;
  }
}
