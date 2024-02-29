import { Controller } from '@hotwired/stimulus';
import React from 'react';
import { createRoot } from 'react-dom/client';
import UserProfile from '../components/UserProfile';

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    const root = document.getElementById('userprofile');
    createRoot(root).render(<UserProfile />);
  }
}
