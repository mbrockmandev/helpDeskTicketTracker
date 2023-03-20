import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicketDetails, reset } from '../features/tickets/ticketSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function TicketDetail() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets,
  );

  const params = useParams();
  const ticketId = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicketDetails(ticketId));
    // eslint-disable-next-line
  }, [isError, ticketId, message]);

  if (isLoading) return <Spinner />;

  if (isError) return <h3>Something went wrong!</h3>;

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets/' />
        <h2>
          Ticket Id: {ticket._id}{' '}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>{' '}
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
    </div>
  );
}

export default TicketDetail;
