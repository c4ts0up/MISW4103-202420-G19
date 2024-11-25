import pino from 'pino';

// Create a Pino logger instance with pino-pretty
const logger = pino({
    level: 'info', // Set the default log level
    transport: {
        target: 'pino-pretty', // Use pino-pretty for formatted output
        options: {
            colorize: true, // Enable colorized output
            translateTime: true, // Add timestamps
            ignore: 'pid,hostname', // Remove unnecessary fields
        },
    },
});

export default logger;