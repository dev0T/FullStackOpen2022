const Notification = ({ message }) => {
  return message === null ? null : message.type === "error" ? (
    <div className="error">{message.text}</div>
  ) : message.type === "success" ? (
    <div className="success">{message.text}</div>
  ) : (
    <div>{message.text}</div>
  );
};

export default Notification;
