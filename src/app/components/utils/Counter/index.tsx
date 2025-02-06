"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/";
import { increment, decrement } from "@/store/counterSlice";
import styles from "./Counter.module.scss";
export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())} className={styles.button}>
        +
      </button>
      <button onClick={() => dispatch(decrement())} className={styles.button}>
        -
      </button>
    </div>
  );
}
