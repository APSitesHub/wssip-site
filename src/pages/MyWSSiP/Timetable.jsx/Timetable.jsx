import { useState } from 'react';
import eyesImg from '../../../img/quiz/eyes.png';
import { CalendarIcon } from '../Attendance/Attendance.styled';
import {
  EyesEmoji,
  PointsPlaceHolder,
  PointsPlaceHolderText,
} from '../Points/Points.styled';
import {
  TimetableBody,
  TimetableBox,
  TimetableChangeCourseBtn,
  TimetableChangeCourseBtnText,
  TimetableDaysCell,
  TimetableDaysItem,
  TimetableHead,
  TimetableHeading,
  TimetableLessonLink,
  TimetableLessonLinkText,
  TimetableLessonType,
  TimetableTable,
  TimetableWebinars,
  TimetableWebinarsHead,
} from './Timetable.styled';

export const Timetable = ({ user, timetable }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [marathonId, setMarathonId] = useState('83761');
  const [personalTimetable, setPersonalTimetable] = useState(
    timetable.find(timeline => marathonId === timeline.marathon)
  );

  const changeTimetable = () => {
    setIsAnimated(true);
    setMarathonId(marathonId => (marathonId === '83761' ? '83765' : '83761'));
    setPersonalTimetable(
      personalTimetable =>
        (personalTimetable = timetable.find(timeline =>
          marathonId === '83761'
            ? '83568' === timeline.marathon
            : '83761' === timeline.marathon
        ))
    );
    setTimeout(() => {
      setIsAnimated(false);
    }, 3000);
  };

  const getLink = () => {
    const baseStreamUrl = 'https://wssip.ap.education/lesson/';

    return marathonId === '83761'
      ? baseStreamUrl + 'logistics'
      : baseStreamUrl + 'prep';
  };

  const link = getLink();

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <TimetableBox style={{ top: '142px' }}>
      <TimetableHeading>
        <CalendarIcon />
        Class schedule
        <TimetableChangeCourseBtn onClick={changeTimetable}>
          <TimetableChangeCourseBtnText>
            Change course
          </TimetableChangeCourseBtnText>
        </TimetableChangeCourseBtn>
      </TimetableHeading>
      {!personalTimetable ? (
        <PointsPlaceHolder>
          <EyesEmoji src={eyesImg} alt="Eyes emoji" width="80" />
          <PointsPlaceHolderText>
            Looking for your schedule!
          </PointsPlaceHolderText>
          <PointsPlaceHolderText>
            Please, try again later!
          </PointsPlaceHolderText>
        </PointsPlaceHolder>
      ) : (
        <TimetableBody>
          <TimetableWebinars>
            <TimetableWebinarsHead>
              <TimetableLessonType
                className={isAnimated ? 'animated' : undefined}
              >
                {marathonId === '83761' ? 'Logistics' : 'Preparation Course'}
              </TimetableLessonType>
              <TimetableLessonLink href={link} target="_blank">
                <TimetableLessonLinkText>Go to lesson</TimetableLessonLinkText>
              </TimetableLessonLink>
            </TimetableWebinarsHead>
            <TimetableTable>
              <thead>
                <tr>
                  <TimetableHead className="day">Day</TimetableHead>
                  <TimetableHead className="time">Time</TimetableHead>
                  <TimetableHead className="lessonNumber">
                    Lesson №
                  </TimetableHead>
                  <TimetableHead className="topic">Topic</TimetableHead>
                </tr>
              </thead>
              <tbody>
                {personalTimetable.schedule
                  .filter(
                    lesson =>
                      lesson.type.toLowerCase() === 'webinar' ||
                      lesson.type.toLowerCase() === 'webinar, repeat'
                  )
                  .sort((a, b) => a.day - b.day)
                  .map((lesson, i) => (
                    <TimetableDaysItem
                      key={i}
                      style={
                        lesson.day === new Date().getDay()
                          ? { backgroundColor: '#0088f780' }
                          : {}
                      }
                    >
                      <TimetableDaysCell className="day">
                        {DAYS[lesson.day - 1]}
                      </TimetableDaysCell>
                      <TimetableDaysCell className="time">
                        {lesson.time}
                      </TimetableDaysCell>
                      <TimetableDaysCell className="lessonNumber">
                        {lesson.lessonNumber}
                      </TimetableDaysCell>
                      <TimetableDaysCell className="topic">
                        {lesson.topic}
                      </TimetableDaysCell>
                    </TimetableDaysItem>
                  ))}
              </tbody>
            </TimetableTable>
          </TimetableWebinars>{' '}
        </TimetableBody>
      )}
    </TimetableBox>
  );
};
