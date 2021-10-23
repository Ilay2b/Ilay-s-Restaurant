import { createLogger } from 'redux-logger';

const reduxLogger = createLogger({
    predicate: (getState, action) => {
        return true;
    },
    collapsed: true,
});

export default reduxLogger;