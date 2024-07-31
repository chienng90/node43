import winston from "winston";
import config from "./CapstoneConfig.js";

class Logger {
  constructor() {
    this.logger = winston.createLogger({
      level: config.getServerConfig().env === "development" ? "debug" : "info",
      format: winston.format.combine(
        this.enumerateErrorFormat(),
        config.getServerConfig().env === "development"
          ? winston.format.colorize()
          : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level}: ${message}`)
      ),
      transports: [
        new winston.transports.Console({
          stderrLevels: ["error"],
        }),
      ],
    });
  }

  enumerateErrorFormat() {
    return winston.format((info) => {
      if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
      }
      return info;
    })();
  }

  info(message, meta) {
    this.logger.info(message, meta);
  }

  debug(message, meta) {
    this.logger.debug(message, meta);
  }

  error(message, meta) {
    this.logger.error(message, meta);
  }

  warn(message, meta) {
    this.logger.warn(message, meta);
  }
}

// Export an instance of the Logger class
const logger = new Logger();
export default logger;
