"use client";

import { categories } from "@/libs/utils";
import { TMongoTicket } from "@/types/generalTypes";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function TicketForm({ ticket }: { ticket: TMongoTicket }) {
  const EDIT_MODE = ticket._id !== "new";
  const router = useRouter();
  const initialTicketData = {
    title: "",
    description: "",
    priority: 4,
    progress: 0,
    status: "not started",
    category: "HardwareProblem",
  };

  if (EDIT_MODE) {
    initialTicketData["title"] = ticket.title;
    initialTicketData["description"] = ticket.description;
    initialTicketData["priority"] = ticket.priority;
    initialTicketData["progress"] = ticket.progress;
    initialTicketData["status"] = ticket.status;
    initialTicketData["category"] = ticket.category;
  }

  const [formData, setFormData] = useState(initialTicketData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const url = EDIT_MODE ? `/api/Tickets/${ticket._id}` : "/api/Tickets";
    const method = EDIT_MODE ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      body: JSON.stringify({ formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to ${EDIT_MODE ? "update" : "create"} ticket`);
    }
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDIT_MODE ? "Update" : "Create"} Ticket</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows={5}
        />
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        <input
          type="submit"
          className="btn max-w-xs"
          value={EDIT_MODE ? "Update Ticket" : "Create Ticket"}
        />
      </form>
    </div>
  );
}
