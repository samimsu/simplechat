const Username = ({ username, handleUsernameChange }) => {
  return (
    <div className="username">
      <p className="username-label">Username:</p>
      <input
        className="username-input"
        value={username}
        onChange={handleUsernameChange}
      ></input>
    </div>
  );
};

export default Username;
