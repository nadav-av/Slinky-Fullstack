import bookingClient from "../../Services/bookingClient";

const TableBody = ({ tableData, columns, userBookings, setUserBookings }) => {
  const handleDelete = async (bookID, officeId) => {
    const res = await bookingClient.deleteBooking(bookID, officeId);
    if (res) {
      const newBookings = userBookings.filter(
        (booking) => booking.id !== bookID
      );
      setUserBookings(newBookings);
    }
  };

  const parseDate = (date) => {
    const parsedDate = new Date(date);
    return `${parsedDate.getDate()}/${
      parsedDate.getMonth() + 1
    }/${parsedDate.getFullYear()}`;
  };

  const parseTimeInDate = (date) => {
    const parsedDate = new Date(date);
    let hours = parsedDate.getHours();
    let minutes = parsedDate.getMinutes();
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return `${hours}:${minutes}`;
  };

  const parseUserBookings = (bookings) => {
    const parsedBookings = [];
    bookings.forEach((booking) => {
      booking.startDate = new Date(booking.startDate);
      booking.endDate = new Date(booking.endDate);
      console.log(booking);
      const parsedBooking = {
        id: booking.id,
        office: booking.officeId,
        reserved_place: booking.bookingPlace,
        start_date: parseDate(booking.startDate),
        start_hour: parseTimeInDate(booking.startDate),
        end_date: parseDate(booking.endDate),
        end_hour: parseTimeInDate(booking.endDate),
      };
      parsedBookings.push(parsedBooking);
    });
    return parsedBookings;
  };

  const newTableData= parseUserBookings(tableData);

  return (
    <tbody>
      {
      newTableData.map((data) => {
        const differentEndDate = data.start_date !== data.end_date;
        return (
          <tr key={data.id}>
            {columns.map(({ accessor }) => {
              const tData = data[accessor] ? data[accessor] : "——";
              if (accessor === "delete") {
                return (
                  <td key={accessor}>
                    <button
                      className="del-book-btn"
                      onClick={() => handleDelete(data.id, data.office)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                );
              }
              if (differentEndDate) {
                if (accessor === "end_hour") {
                  return (
                    <td key={accessor}>{`${tData} (${data.end_date})`}</td>
                  );
                }
              }
              return <td key={accessor}>{tData}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
