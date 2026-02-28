import { defineField, defineType } from "sanity";

export const talk = defineType({
  name: "talk",
  title: "Talk",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "event",
      title: "Event / Conference",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "tags",
      title: "Topics",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "slidesUrl",
      title: "Slides URL",
      type: "url",
    }),
    defineField({
      name: "recordingUrl",
      title: "Recording URL",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Date (Newest First)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "event",
      date: "date",
      media: "image",
    },
    prepare({ title, subtitle, date }) {
      const year = date ? new Date(date).getFullYear() : "";
      return {
        title,
        subtitle: year ? `${subtitle} · ${year}` : subtitle,
      };
    },
  },
});
