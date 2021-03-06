import {
  ADD_NOTES,
  NOTE_VALIDATE,
  CURRENT_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  ACHIVED_NOTE,
} from "../../types/index";
export default (state, action) => {
  switch (action.type) {
    case ADD_NOTES:
      return {
        ...state,
        notes: [...state.notes, action.payload],
        errornote: false,
      };

    case NOTE_VALIDATE:
      return {
        ...state,
        errornote: true,
      };

    case CURRENT_NOTE:
      return {
        ...state,
        selectednote: action.payload,
      };

    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
        //! Si fuera === nos traeria el que le di click ver si cuando quiero archivarlas
      };

    case ACHIVED_NOTE:
      return {
        ...state,
        achivednotes: [...state.achivednotes, action.payload],
      
      };

    default:
      return state;
  }
};
