import { createSelector } from 'reselect'; 

import { 
    userBasicInfoSelector,
} from 'collections/user/selectors'; 

const appSelector = () => createSelector(
    [userBasicInfoSelector], 
    (userBasicInfo) => {
        return {
            user: {
                ...userBasicInfo
            }
        }
    }
);

export {
    appSelector
};