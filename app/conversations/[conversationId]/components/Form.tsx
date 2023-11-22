"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
    const {conversationId} = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message:''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', {shouldValidate: true});

        axios.post('/api/messages', {
            ...data,
            conversationId
        })
    };

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
    }
    return ( 
        <div className="
        py-4
        px-4
        bg-stone-200
        border-t
        flex
        items-center
        gap-2
        lg:gap-4
        w-full
        ">
            <CldUploadButton
            options={{maxFiles: 1}}
            onUpload={handleUpload}
            uploadPreset="k01ytrt6"
            >
               <HiPhoto size={30} className="text-stone-500" />
            </CldUploadButton>
            <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-2 lg:gap-4 w-full"
            >
                <MessageInput 
                id="message"
                register={register}
                errors={errors}
                required
                placeholder="Write a message..."
                />
                <button
                type="submit"
                className="
                rounded-full
                p-2
                bg-stone-300
                cursor-pointer
                hover:bg-stone-400
                transition
                ">
                    <HiOutlinePaperAirplane 
                    size={18}
                    className="text-black"
                    />
                </button>

            </form>
        </div>
     );
}
 
export default Form ;