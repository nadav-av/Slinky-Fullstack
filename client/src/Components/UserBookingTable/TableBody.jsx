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

  return (
    <tbody>
      {tableData.map((data) => {
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
              return <td key={accessor}>{tData}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
