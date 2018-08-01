import { createSelector } from 'reselect'; 

const getUser = () => (state) => state.user.toJS(); 

const userBasicInfoSelector = createSelector(
    getUser(), 
    (user) => {
        return {
            first_name: user.first_name,
            last_name: user.last_name,
            _id: user._id,
            jwt: user.jwt
        }
    }
); 


export {
    userBasicInfoSelector
}; 