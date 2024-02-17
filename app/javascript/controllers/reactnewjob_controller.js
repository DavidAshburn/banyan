import { Controller } from '@hotwired/stimulus';
import React from 'react';
import { createRoot } from 'react-dom/client';
import NewJob from '../components/NewJob';

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    const root = document.getElementById('newjobform');
    createRoot(root).render(<NewJob />);
  }
}
