const petInfoReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PET":
      return action.payload;
    case "GET_PET_DATA_SUCCESSFUL":
      return action.payload;
    case "UNSET_PET":
      return [];
    default:
      return state;
  }
};

export default petInfoReducer;
