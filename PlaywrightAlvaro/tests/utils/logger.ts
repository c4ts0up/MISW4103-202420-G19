import pino from 'pino';

const logger = pino({
    prettyPrint: {
        colorize: true,
        levelFirst: true,
        translateTime: 'SYS:standard',
    },
});

export default logger;