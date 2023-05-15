export enum SearchParameterActions {
  Create = "CREATE",
  Edit = "EDIT",
  Delete = "DELETE",
}

export interface PlaceOfInterest {
  searchTerm: string;
  weight: number;
  distance: number;
  inMiles: boolean;
  transportMode: string;
}

interface PlaceOfInterestPayload {
  position: number;
  searchTerm?: string;
  weight?: number;
  distance?: number;
  inMiles?: boolean;
  transportMode?: string;
}

export interface PlaceOfInterestAction {
  type: SearchParameterActions;
  payload: PlaceOfInterestPayload;
}

export const reducer = (
  state: PlaceOfInterest[],
  action: PlaceOfInterestAction
) => {
  const { searchTerm, weight, position, distance, inMiles, transportMode } =
    action.payload;
  switch (action.type) {
    case SearchParameterActions.Edit:
      const newPlace = {
        searchTerm: searchTerm ?? state[position]?.searchTerm ?? "",
        weight: weight ?? state[position]?.weight ?? 0,
        distance: distance ?? state[position]?.distance ?? 0,
        inMiles: typeof inMiles === "boolean" ? inMiles : true,
        transportMode:
          transportMode ?? state[position]?.transportMode ?? "WALKING",
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
