import { 
    GET_ALL_TRANSLATIONS, 
    REFRESH_ALL_TRANSLATIONS,
    RESET_TRANSLATIONS, 
    CREATE_TRANSLATION,
    CREATE_TRANSLATION_SUCCEEDED,
    UPDATE_TRANSLATION,
    UPDATE_TRANSLATION_SUCCEEDED,
    DELETE_TRANSLATION,
    DELETE_TRANSLATION_SUCCEEDED
} from "./constants";


export function getAllTranslations() {
    return {
        type: GET_ALL_TRANSLATIONS
    }
}

export function refreshAllTranslations(translations) {
    return {
        type: REFRESH_ALL_TRANSLATIONS, 
        translations
    }
}

export function resetTranslations() {
    return {
        type: RESET_TRANSLATIONS
    }
}

export function createTranslation(translation) {
    return {
        type: CREATE_TRANSLATION, 
        translation
    }
}

export function createTranslationSucceeded(translation) {
    return {
        type: CREATE_TRANSLATION_SUCCEEDED, 
        translation
    }
}

export function updateTranslation(translation) {
    return {
        type: UPDATE_TRANSLATION, 
        translation
    }
}

export function updateTranslationSucceeded(translation) {
    return {
        type: UPDATE_TRANSLATION_SUCCEEDED,
        translation
    }
}

export function deleteTranslation(translation) {
    return {
        type: DELETE_TRANSLATION, 
        translation
    }
}

export function deleteTranslationSucceeded(translation) {
    return {
        type: DELETE_TRANSLATION_SUCCEEDED, 
        translation
    }
}