import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from "react";

type AttendanceStatus = "present" | "absent";

interface DemoMessage {
  id: string;
  author: "teacher" | "guardian";
  text: string;
}

interface DemoState {
  student: {
    id: string;
    name: string;
    className: string;
    attendanceStatus: AttendanceStatus;
  };
  guardianUnread: number;
  messages: DemoMessage[];
  payment: {
    id: string;
    amount: number;
    status: "pending" | "validated";
  };
}

type Action =
  | { type: "MARK_ABSENT" }
  | { type: "SEND_MESSAGE"; author: "teacher" | "guardian"; text: string }
  | { type: "VALIDATE_PAYMENT" }
  | { type: "RESET" };

const initialState: DemoState = {
  student: {
    id: "COLUS-2026-001",
    name: "Amélia Mondlane",
    className: "11ª A",
    attendanceStatus: "present",
  },
  guardianUnread: 0,
  messages: [
    {
      id: "message-1",
      author: "teacher",
      text: "A Amélia tem demonstrado uma boa evolução em Matemática.",
    },
  ],
  payment: {
    id: "PAY-DEMO-001",
    amount: 8500,
    status: "pending",
  },
};

function reducer(state: DemoState, action: Action): DemoState {
  switch (action.type) {
    case "MARK_ABSENT":
      return {
        ...state,
        student: { ...state.student, attendanceStatus: "absent" },
        guardianUnread: state.guardianUnread + 1,
      };
    case "SEND_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: `message-${state.messages.length + 1}`,
            author: action.author,
            text: action.text,
          },
        ],
        guardianUnread:
          action.author === "teacher"
            ? state.guardianUnread + 1
            : state.guardianUnread,
      };
    case "VALIDATE_PAYMENT":
      return {
        ...state,
        payment: { ...state.payment, status: "validated" },
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface DemoContextValue {
  state: DemoState;
  markAbsent: () => void;
  sendMessage: (author: "teacher" | "guardian", text: string) => void;
  validatePayment: () => void;
  reset: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<DemoContextValue>(
    () => ({
      state,
      markAbsent: () => dispatch({ type: "MARK_ABSENT" }),
      sendMessage: (author, text) =>
        dispatch({ type: "SEND_MESSAGE", author, text }),
      validatePayment: () => dispatch({ type: "VALIDATE_PAYMENT" }),
      reset: () => dispatch({ type: "RESET" }),
    }),
    [state],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemoStore() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemoStore must be used within DemoProvider");
  }
  return context;
}
