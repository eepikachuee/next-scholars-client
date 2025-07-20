"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function ContactSection() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Message sent successfully!");
    reset();
  };

  return (
    <section className="py-20  px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
        <p className=" mb-6">
          Whether you have a question or just want to say hi — I’ll try my best
          to get back to you!
        </p>
        {/* Left: Contact Info */}
        <div className="grid md:grid-cols-2 gap-10 items-center text-left">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6  p-8 rounded-2xl shadow-xl w-full bg-[#f8f4ee] dark:bg-[#2a2524]"
          >
            <div>
              <label className="text-sm font-medium block mb-1">Name</label>
              <Input
                placeholder="Your name"
                {...register("name", { required: true })}
                className=""
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <Input
                placeholder="your@email.com"
                type="email"
                {...register("email", { required: true })}
                className=""
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Message</label>
              <Textarea
                rows={4}
                placeholder="Type your message..."
                {...register("message", { required: true })}
                className=""
              />
            </div>

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>

          {/* Right: Contact Form */}
          <div className="space-y-4 text-sm ">
            <img src="https://i.ibb.co/xqxDWsMK/Online-pana.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
