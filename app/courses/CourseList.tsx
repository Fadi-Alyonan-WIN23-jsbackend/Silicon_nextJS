"use client";

import React, { useEffect, useState } from 'react';
import { Course } from '../interfaces/coursesTypes';
import style from './CourseList.module.css'

async function fetchCourses(): Promise<Course[]> {
  const res = await fetch('');
  if (!res.ok) {
    throw new Error('Could not fetch courses from CourseProvider');
  }
  return res.json();
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const courses = await fetchCourses();
        console.log('Fetched courses:', courses);
        setCourses(courses);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section id={style.courses}>
      <div className={`container ${style.container}`}>
        <div>
          <h1 className={style.coursePageTitle}>Courses</h1>
        </div>
        <div className={`courseItems ${style.courseItems}`}>
          {courses && courses.length > 0 ? (
            courses.map((item) => (
              <div key={item.Id} className={`course ${style.course}`}>
                {item.IsBestseller && <div className={`bestSeller text-s ${style.bestSeller}`}>Best Seller</div>}
                <img className={`courseImage ${style.courseImage}`} src={`/images/${item.Image}`} alt={item.Image} />
                <div className={style.content}>
                  <div><h5 className={`courseTitle ${style.courseTitle}`}>{item.Title}</h5></div>
                  <div className={`courseAuthor text-s ${style.courseAuthor}`}>{item.Author}</div>
                  <div className={`coursePrice ${style.coursePrice}`}>
                    {item.DiscountPrice && item.DiscountPrice !== "0" ? (
                      <>
                        <div className={`discountPrice ${style.discountPrice}`}>{item.DiscountPrice}</div>
                        <div className={`originalPrice ${style.lineThrough}`}>{item.OriginalPrice}</div>
                      </>
                    ) : (
                      <div>{item.OriginalPrice}</div>
                    )}
                  </div>
                  <hr className={style.courseHr} />
                  <div className={`courseFooter ${style.courseFooter}`}>
                    <div className={`courseHours ${style.courseHours}`}><i className="fa-regular fa-clock"></i> {item.Hours} hours</div>
                    <div className="course-likes">
                      <i className="fa-regular fa-thumbs-up"></i>
                      {`${item.LikesInProcent}% (${item.NumberOfLikes})`}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2>No courses found</h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseList;
