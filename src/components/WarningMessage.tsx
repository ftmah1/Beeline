interface WarningMessageProps {
  message: string;
}

function WarningMessage({ message }: WarningMessageProps) {
  return <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>;
}

export default WarningMessage;
