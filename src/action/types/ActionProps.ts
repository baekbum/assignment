export type problemsType = {
  save_problems: string;
  update_problems: string;
  delete_problems: string;
};

export type similarsType = {
  save_similars: string;
  update_similars: string;
};

export type isShowType = {
  show_similars: string;
  hide_similars: string;
};

export type jsonData = {
  id: number;
  unitCode: number;
  answerData: string;
  problemLevel: number;
  problemType: string;
  problemURL: string;
  unitName: string;
  needCheckLayout: number;
  source: number;
  hide: number;
  curriculumNumber: number;
  cebuCode: number;
  totalTimes: number;
  correctTimes: number;
  hwpExist: number;
  scorable: number;
  tagTop: null;
  bookDataId: number;
};
