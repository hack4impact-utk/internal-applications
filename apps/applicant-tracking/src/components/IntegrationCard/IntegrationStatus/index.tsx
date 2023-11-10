interface IntegrationStatusProps {
  status: string;
}
export default function IntegrationStatus({ status }: IntegrationStatusProps) {
  return (
    <span>
      <div
        style={{
          display: 'inline-block',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: status === 'active' ? 'green' : 'red',
        }}
      />
      {status === 'active' ? 'Active' : 'Inactive'}
    </span>
  );
}
