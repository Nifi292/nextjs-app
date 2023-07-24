import { Menu, Transition} from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO, // Add this line to import parseISO
  startOfToday,
} from 'date-fns';
import { Fragment, useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const specialEvents = [
  {
    date: '2023-08-15', // Format: 'YYYY-MM-DD'
    title: "Independence Day",
  },
  {
    date: '2023-07-28', // Format: 'YYYY-MM-DD'
    title: "Muharram",
  },
  // Add more special events here if needed
];
const Tooltip = ({ content, hasEvent, children }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      {hasEvent && isHovering && (
        <div className="absolute -bottom-8 left-full ml-1 w-32 p-2 text-white text-xs bg-gray-700 rounded-full">
          <div className="flex justify-center"> {/* Center the content */}
            {content}
          </div>
        </div>
      )}
      {hasEvent && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500"></div>
      )}
    </div>
  );
};

/*const Tooltip = ({ content, hasEvent, children }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      {hasEvent && isHovering && (
        <div className="absolute -bottom-6 left-full ml-1 w-32 p-1 text-white text-xs bg-gray-800 rounded-full">
          {content}
        </div>
      )}
      {hasEvent && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500"></div>
      )}
    </div>
  );
};

*/
/*const Tooltip = ({ eventTitle }) => (
 <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 text-white text-xs bg-gray-800 rounded-lg">
  {eventTitle}
  </div>
 );
*/
export default function Calendar_new() {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  }).map((day) => {
    // Check if the current day has a special event
     const event = specialEvents.find((event) => isSameDay(parseISO(event.date), day));
    return { date: day, hasEvent: !!event, eventTitle: event ? event.title : '' }; 
  });
  
  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  return (
    <div className="pt-16">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900">
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((dayInfo, dayIdx) => (
                <div
                  key={dayInfo.date.toString()}
                  className={classNames(dayIdx === 0 && colStartClasses[getDay(dayInfo.date)], 'py-1.5')}
                >
                  <Tooltip content={dayInfo.eventTitle} hasEvent={dayInfo.hasEvent}>
  <button
    type="button"
    onClick={() => setSelectedDay(dayInfo.date)}
    className={classNames(
      isEqual(dayInfo.date, selectedDay) && 'text-white',
      !isEqual(dayInfo.date, selectedDay) && isToday(dayInfo.date) && 'text-red-500',
      !isEqual(dayInfo.date, selectedDay) && !isToday(dayInfo.date) && isSameMonth(dayInfo.date, firstDayCurrentMonth) && 'text-gray-900',
      !isEqual(dayInfo.date, selectedDay) && !isToday(dayInfo.date) && !isSameMonth(dayInfo.date, firstDayCurrentMonth) && 'text-gray-400',
      isEqual(dayInfo.date, selectedDay) && isToday(dayInfo.date) && 'bg-red-500',
      isEqual(dayInfo.date, selectedDay) && !isToday(dayInfo.date) && 'bg-gray-900',
      !isEqual(dayInfo.date, selectedDay) && 'hover:bg-gray-200',
      (isEqual(dayInfo.date, selectedDay) || isToday(dayInfo.date)) && 'font-semibold',
      'relative mx-auto flex h-8 w-8 items-center justify-center rounded-full'
    )}
  >
    <time dateTime={format(dayInfo.date, 'yyyy-MM-dd')}>{format(dayInfo.date, 'd')}</time>
  </button>
</Tooltip>


                
                
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];
