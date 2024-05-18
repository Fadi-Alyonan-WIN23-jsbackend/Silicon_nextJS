import React from 'react';
import { Course } from '../interfaces/coursesTypes';
import CourseList from './CourseList';
import style from './CourseList.module.css';

async function fetchCourses(): Promise<Course[]> {
  const query = `
    {
      getCourses {
        id
        imageUri
        imageHeaderUri
        title
        author
        categories
        ingress
        starRating
        reviews
        likesInPercent
        likes
        hours
        prices {
          price
          discount
        }
        courseContent {
          description
          includes
          courseDetails {
            id
            title
            description
          }
        }
        isDigital
        isBestSeller
      }
    }
  `;

  const res = await fetch('', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error(`Could not fetch courses from CourseProvider: ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL error: ${json.errors.map((err: any) => err.message).join(', ')}`);
  }

  return json.data.getCourses;
}

const CoursesPage = async () => {
  const courses = await fetchCourses();

  return (
    <main className={style.main}>
      <CourseList courses={courses} />
    </main>
  );
};

export default CoursesPage;
