import { Course } from '../interfaces/coursesTypes';
export default function Courses() {

    const courses:Course[] = [
        {
            id: 'fasdqw2324324',
            title: "Introduction to JavaScript",
            author: "Jane Doe",
            image: "javascript-course.jpg",
            originalPrice: "$199",
            discountPrice: "$99",
            isDigital: true,
            isBestseller: true,
            hours: 20,
            likesInProcent: '93',
            numberOfLikes: '430'
        },{
            id: 'fasdqw2324324',
            title: "Introduction to JavaScript",
            author: "Jane Doe",
            image: "javascript-course.jpg",
            originalPrice: "$199",
            discountPrice: "$99",
            isBestseller: true,
            isDigital: true,
            hours: 20,
            likesInProcent: '93',
            numberOfLikes: '430'
        }
    ]
    return (
        <section id="courses">
            <div className="container">
                <div><h1 className="d6">Courses</h1></div>
                <div className="all-courses">
                    {courses && courses.length > 0 ? (
                        courses.map((item, index) => (
                            <div key={index} className="course">
                                {item.isBestseller && <div className="best-seller text-s">Best Seller</div>}
                                <img className="course-image" src={`/images/${item.image}`} alt={item.image} />
                                <div className="content">
                                    <div><h5 className="course-title text-lead">{item.title}</h5></div>
                                    <div className="course-author text-s">{item.author}</div>
                                    <div className="course-prices">
                                        {item.discountPrice && item.discountPrice !== "0" ? (
                                            <>
                                                <div className="discount-price">{item.discountPrice}</div>
                                                <div className="original-price">{item.originalPrice}</div>
                                            </>
                                        ) : (
                                            <div>{item.originalPrice}</div>
                                        )}
                                    </div>
                                    <div className="course-footer">
                                        <div className="course-hours"><i className="fa-regular fa-clock"></i> {item.hours} hours</div>
                                        <div className="course-likes">
                                            <i className="fa-regular fa-thumbs-up"></i>
                                            {`${item.likesInProcent}% (${item.numberOfLikes})`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <>
                            <h2>No courses found</h2>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
  }
  