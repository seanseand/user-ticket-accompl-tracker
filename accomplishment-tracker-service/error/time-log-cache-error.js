class TimeLogCacheError extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeLogCacheError";

    Error.captureStackTrace(this, TimeLogCacheError);
  }
}

class TimeLogNotFoundError extends TimeLogCacheError {
  constructor(userId, date) {
    super(`No time log found for user ${userId} on date ${date}`);
    this.name = "TimeLogNotFoundError";

    Error.captureStackTrace(this, TimeLogNotFoundError);
  }
}

class TimeLogSaveError extends TimeLogCacheError {
  constructor(userId, date, originalError) {
    super(
      `Failed to save time log for user ${userId} on date ${date}: ${originalError.message}`
    );
    this.name = "TimeLogSaveError";
    this.originalError = originalError;
    
    Error.captureStackTrace(this, TimeLogSaveError);
  }
}

export { TimeLogCacheError, TimeLogNotFoundError, TimeLogSaveError };