import { TEST_ACTION } from './types';

const testAction = function(){
    return {
        type: TEST_ACTION,
        payload: 'b'
    }
}

export default testAction
