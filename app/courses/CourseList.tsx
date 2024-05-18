import React from 'react';
import { Course } from '../interfaces/coursesTypes';
import style from './CourseList.module.css';

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <section id={style.courses}>
      <div className={`container ${style.container}`}>
        <div>
          <h1 className={style.coursePageTitle}>Courses</h1>
        </div>
        <div className={`courseItems ${style.courseItems}`}>
          {courses && courses.length > 0 ? (
            courses.map((item) => (
              <div key={item.id} className={`course ${style.course}`}>
                {item.isBestSeller && <div className={`bestSeller text-s ${style.bestSeller}`}>Best Seller</div>}
                <img className={`courseImage ${style.courseImage}`} src={`/images/${item.imageUri}`} alt={item.title} />
                <div className={style.content}>
                  <div><h5 className={`courseTitle ${style.courseTitle}`}>{item.title}</h5></div>
                  <div className={`courseAuthor text-s ${style.courseAuthor}`}>{item.author}</div>
                  <div className={`coursePrice ${style.coursePrice}`}>
                    {item.prices.discount && item.prices.discount !== 0 ? (
                      <>
                        <div className={`discountPrice ${style.discountPrice}`}>{item.prices.discount}</div>
                        <div className={`originalPrice ${style.lineThrough}`}>{item.prices.price}</div>
                      </>
                    ) : (
                      <div>{item.prices.price}</div>
                    )}
                  </div>
                  <hr className={style.courseHr} />
                  <div className={`courseFooter ${style.courseFooter}`}>
                    <div className={`courseHours ${style.courseHours}`}><i className="fa-regular fa-clock"></i> {item.hours} hours</div>
                    <div className="course-likes">
                      <i className="fa-regular fa-thumbs-up"></i>
                      {`${item.likesInPercent}% (${item.likes})`}
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
