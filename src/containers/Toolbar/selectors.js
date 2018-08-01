import { createSelector } from 'reselect'; 

import { 
    userBasicInfoSelector
} from 'collections/user/selectors'; 

import { sideMenuUI } from 'collections/ui/selectors';

const toolbarSelector = () => createSelector(
    [userBasicInfoSelector], 
    (userBasicInfo) => {
        return {
            user: {
                ...userBasicInfo
            }
        }
    }
);

const headerLinkSelector = () => createSelector(
    [userBasicInfoSelector], 
    (userBasicInfo) => {
        return {
            user: {
                ...userBasicInfo
            }
        }
    }
); 


const sideMenuSelector = () => createSelector(
    [sideMenuUI],
    (sideMenuUI) => sideMenuUI
);

export {
    toolbarSelector, 
    headerLinkSelector, 
    sideMenuSelector
}; 