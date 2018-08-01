import { createSelector } from 'reselect'; 

import { loginUI } from 'collections/ui/selectors';

const loginSelector = () => createSelector(
    [loginUI],
    (loginUI) => loginUI
);

export {
    loginSelector
}