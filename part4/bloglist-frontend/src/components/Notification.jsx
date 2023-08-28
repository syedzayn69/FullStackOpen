
const Notification = ({ message, state }) => {
    const error = {
      color: "red",
      border: "2px solid red",
      backgroundColor: "silver",
      fontSize: "20px",
      width: "95%",
      padding: "10px",
      borderRadius: "10px",
    };
  
    const normal = {
      color: "green",
      border: "2px solid green",
      backgroundColor: "silver",
      fontSize: "20px",
      width: "95%",
      padding: "10px",
      borderRadius: "10px",
    };
  
    if (state === "red") {
      return <div style={error}>{message}</div>;
    } else {
      return <div style={normal}>{message}</div>;
    }
  };

export default Notification