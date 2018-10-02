import { TEST_ACTION } from './types';

const testAction = function(){
    return function(dispatch){
        dispatch({
            type: TEST_ACTION,
            payload: 'b'
        })
    }
}
