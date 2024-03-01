import { Controller } from '@hotwired/stimulus';
import React from 'react';
import { createRoot } from 'react-dom/client';
import UserFleet from '../components/UserFleet';

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    const root = document.getElementById('rfleet');
    createRoot(root).render(<UserFleet />);
  }
}
