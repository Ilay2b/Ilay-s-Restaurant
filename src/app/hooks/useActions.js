import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';

export default function useActions(actions, deps) {
    const dispatch = useDispatch();
    return useMemo(() => {
            if (Array.isArray(actions)) {
                return actions.map(action => bindActionCreators(action, dispatch));
            }
            return bindActionCreators(actions, dispatch);
        }, deps ? [dispatch, ...deps] : [dispatch]
    );
};