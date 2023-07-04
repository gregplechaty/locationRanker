import { uniqueId, isArray } from "lodash";
import { MAX_NUMBER_PLACES } from "./";

export enum SearchParameterActions {
  Create = "CREATE",
  Edit = "EDIT",
  Delete = "DELETE",
}

export interface PlaceOfInterest {
  id: string;
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

export const createNewPlaceOfInterest = (): PlaceOfInterest => {
  return {
    id: uniqueId("id-"),
    searchTerm: "",
    weight: 100,
    distance: 1,
    inMiles: true,
    transportMode: "WALKING",
  };
};

export const reducer = (
  state: PlaceOfInterest[],
  action: PlaceOfInterestAction
) => {
  const { searchTerm, weight, position, distance, inMiles, transportMode } =
    action.payload;
  const newState = [...state];
  switch (action.type) {
    case SearchParameterActions.Create:
      if (isArray(newState) && newState.length > MAX_NUMBER_PLACES) {
        // TODO: toast error limiting adds. This shouldn't
        // hit in theory if I disable the add button at 5
        return newState;
      }
      newState.push(createNewPlaceOfInterest());
      return newState;
    case SearchParameterActions.Edit:
      const newDistance =
        typeof distance === "number"
          ? distance
          : typeof state[position]?.distance === "number"
          ? state[position]?.distance
          : 0;
      const newPlace = {
        id: state[position]?.id,
        searchTerm: searchTerm ?? state[position]?.searchTerm ?? "",
        weight: weight ?? state[position]?.weight ?? 0,
        distance: newDistance,
        inMiles: typeof inMiles === "boolean" ? inMiles : true,
        transportMode:
          transportMode ?? state[position]?.transportMode ?? "WALKING",
      };
      if (newState[position]) {
        newState[position] = newPlace;
      }
      return newState;
    case SearchParameterActions.Delete:
      if (newState?.length && newState.length === 1) {
        // todo: fire off toast error
        return newState;
      }
      newState.splice(action.payload.position, 1);
      return newState;
    default:
      throw new Error();
  }
};
