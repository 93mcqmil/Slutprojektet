import React from "react";

export default function About() {
  return (
    <div className='max-w-3xl mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>About Open Library</h1>
      <p className='text-lg leading-relaxed mb-4'>
        Open Library is a database of over two million digitized books,
        including classic and public-domain texts, as well as a growing
        collection of books of all kinds donated by libraries around the
        country. Books can be downloaded or read online. Open Library's
        browser-based reader lets you flip through scanned pages, preserving the
        experience of a printed book, but keyword-searching in the text is also
        supported. To find books – fiction or nonfiction, juvenile or adult, on
        all subjects and in a variety of languages – visit the homepage to get
        started:
        <a
          href='https://openlibrary.org/subjects/in_library#ebooks=true'
          className='text-blue-500 hover:text-blue-700 ml-2'
        >
          Open Library
        </a>
      </p>
    </div>
  );
}
