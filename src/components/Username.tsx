type UsernameProps = {
  username: string;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Username = ({ username, handleUsernameChange }: UsernameProps) => {
  return (
    <div className="username">
      <p className="username-label">Username:</p>
      <input
        className="username-input"
        value={username}
        onChange={handleUsernameChange}
      />
    </div>
  );
};

export default Username;
