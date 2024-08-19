import { createLogger, format, transports, Logger } from "winston";
import { TransformableInfo } from "logform";

const { combine, timestamp, printf } = format;

// Custom log format
const logFormat = printf((info: TransformableInfo) => {
  const { level, message, timestamp } = info;
  return `${timestamp || ""} [${level}]: ${message}`;
});

// Create the logger
const logger: Logger = createLogger({
  format: combine(
    timestamp(), // Adds a timestamp to each log
    logFormat // Uses the custom log format
  ),
  transports: [
    new transports.File({ filename: "logs/error.log", level: "error" }), // Log errors to a file
    new transports.File({ filename: "logs/combined.log" }), // Log all messages to a file
  ],
});

// If we're in production, log errors to a separate file
if (process.env.NODE_ENV === "production") {
  logger.add(new transports.File({ filename: "logs/production.log" }));
}

export default logger;
