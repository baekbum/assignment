import * as types from './ActionType';

interface IReturn {
    (): string;
}

export const saveProblems: IReturn = () => (types.SAVE_PROBLEMS);
export const updateProblems: IReturn = () => (types.UPDATE_PROBLEMS);
export const deleteProblems: IReturn = () => (types.DELETE_PROBLEMS);
export const saveSimilars: IReturn = () => (types.SAVE_SIMILARS);
export const updateSimilars: IReturn = () => (types.UPDATE_SIMILARS);
export const showSimilars: IReturn = () => (types.SHOW_SIMILARS);
export const hideSimilars: IReturn = () => (types.HIDE_SIMILARS);