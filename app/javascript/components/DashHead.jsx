import React from 'react';

export default function DashHead({ user }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 text-center">
      <p>{user.email}</p>
      <p>{user.clients} clients</p>
      <p>{user.jobs} jobs</p>
      <p>{user.trees} trees</p>
    </div>
  );
}
