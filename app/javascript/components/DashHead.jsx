import React from 'react';

export default function DashHead({ user }) {
  return (
    <div className="grid grid-cols-4">
      <p>{user.email}</p>
      <p>{user.clients} clients</p>
      <p>{user.jobs} jobs</p>
      <p>{user.trees} trees</p>
    </div>
  );
}
