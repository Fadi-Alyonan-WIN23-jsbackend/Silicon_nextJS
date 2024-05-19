"use client";

import React, { useEffect } from 'react';
import { Course } from '../interfaces/coursesTypes';
import styles from './CourseList.module.css';


interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  useEffect(() => {
    console.log('Rendering courses:', courses); 
  }, [courses]);

  return (
    <section id={styles.courses}>
      <div className={`container ${styles.container}`}>
        <div>
          <h1 className={styles.coursePageTitle}>Courses</h1>
        </div>
        <div className={`courseItems ${styles.courseItems}`}>
          {courses && courses.length > 0 ? (
            courses.map((item) => {
              console.log('Rendering course item:', item); 
              return (
                <div key={item.id} className={`course ${styles.course}`}>
                  <a href={`/SingleCourse${item.id}` }>
                    {item.isBestSeller && <div className={`bestSeller text-s ${styles.bestSeller}`}>Best Seller</div>}
                    <img className={`courseImage ${styles.courseImage}`} src={item.imageUri} alt={item.title} />
                    <div className={styles.content}>
                      <div><h5 className={`courseTitle ${styles.courseTitle}`}>{item.title}</h5></div>
                      <div className={`courseAuthor text-s ${styles.courseAuthor}`}>{item.author}</div>
                      <div className={`coursePrice ${styles.coursePrice}`}>
                        {item.prices.discount && item.prices.discount !== 0 ? (
                          <>
                            <div className={`discountPrice ${styles.discountPrice}`}>{item.prices.discount} €</div>
                            <div className={`originalPrice ${styles.lineThrough}`}>{item.prices.price} €</div>
                          </>
                        ) : (
                          <div>{item.prices.price}</div>
                        )}
                      </div>
                      <hr className={styles.courseHr} />
                      <div className={`courseFooter ${styles.courseFooter}`}>
                        <div className={`courseHours ${styles.courseHours}`}><i className="fa-regular fa-clock"></i> {item.hours} hours</div>
                        <div className="course-likes">
                          <i className="fa-regular fa-thumbs-up"></i>
                          {`${item.likesInPercent} (${item.likes})`}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })
          ) : (
            <h2>No courses found</h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseList;
