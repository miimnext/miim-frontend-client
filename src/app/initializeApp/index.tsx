"use client"
import { initializeAuth } from "@/store/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "@/components/utils/Modal";
import PwaServiceWorker from "./PwaServiceWorker";
export default function initializeApp() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);
    return (
        <>
            <Modal />
            <PwaServiceWorker />
        </>
    )
}