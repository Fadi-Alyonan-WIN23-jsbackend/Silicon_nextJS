"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Course } from '../../interfaces/coursesTypes';


const fetchCourseById = async (id: string): Promise<Course | null> => {
  const res = await fetch(`/SingleCourse/getCourseById?id=${id}`);

  if (!res.ok) {
    throw new Error(`Could not fetch course: ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL error: ${json.errors.map((err: any) => err.message).join(', ')}`);
  }

  return json.data.getCourseById;
};

const SingleCourse = () => {
  const { id } = useParams() as { id: string };
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchCourseById(id)
        .then((data) => {
          setCourse(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <div>
      <h1>{course.title}</h1>
      <img src={course.imageHeaderUri} alt={course.title} />
      <p>{course.author}</p>
      <p>{course.ingress}</p>
      
    </div>
  );
};

export default SingleCourse;
