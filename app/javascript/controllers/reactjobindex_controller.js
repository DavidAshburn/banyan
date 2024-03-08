import { Controller } from '@hotwired/stimulus';
import React from 'react';
import { createRoot } from 'react-dom/client';
import JobIndex from '../components/JobIndex';

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    const root = document.getElementById('showjobs');
    createRoot(root).render(<JobIndex />);
  }
}
