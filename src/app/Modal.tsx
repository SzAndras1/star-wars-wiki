'use client'

import {useEffect, useRef} from "react";
import {Button} from "@/components/ui/button";

export function Modal({openModal, closeModal, children}) {
    const ref = useRef();

    useEffect(() => {
        if (openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openModal]);

    return (
        <dialog className="border-none rounded-s w-[350px] h-[250px]" ref={ref} onCancel={closeModal}>
            <div className="flex flex-col justify-center items-center mt-10">
                {children}
                <Button
                    className="mt-4 w-[110px] text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                    onClick={closeModal}>Close</Button>
            </div>
        </dialog>
    );
}