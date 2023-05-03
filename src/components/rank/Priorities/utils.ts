export enum SearchParameterActions {
  Create = "CREATE",
  Edit = "EDIT",
  Delete = "DELETE",
}
export interface PlaceOfInterest {
  searchTerm: String;
  weight: number;
}

interface PlaceOfInterestPayload {
  position: number;
  searchTerm?: String;
  weight?: number;
}

export interface PlaceOfInterestAction {
  type: SearchParameterActions;
  payload: PlaceOfInterestPayload;
}

export const reducer = (
  state: PlaceOfInterest[],
  action: PlaceOfInterestAction
) => {
  const { searchTerm, weight, position } = action.payload;
  switch (action.type) {
    case SearchParameterActions.Edit:
      const newPlace = {
        searchTerm: searchTerm ?? state[position]?.searchTerm ?? "",
        weight: weight ?? state[position]?.weight ?? 0,
      };
      const newState = [...state];
      if (newState[position]) {
        newState[position] = newPlace;
      }
      return newState;
    default:
      throw new Error();
  }
};
