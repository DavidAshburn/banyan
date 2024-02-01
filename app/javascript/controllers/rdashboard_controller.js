import { Controller } from '@hotwired/stimulus';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Dashboard from '../components/Dashboard';

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    const root = document.getElementById('dashboardroot');
    createRoot(root).render(<Dashboard />);
  }
}
